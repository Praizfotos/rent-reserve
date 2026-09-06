import * as StellarSdk from "@stellar/stellar-sdk";
import { prisma } from "../database/client.js";

const SERVER_URL = process.env.STELLAR_RPC_URL || "https://soroban-testnet.stellar.org";
const NETWORK_PASSPHRASE =
  process.env.STELLAR_NETWORK_PASSPHRASE || "Test SDF Network ; September 2015";
const CONTRACT_ID = process.env.CONTRACT_ID || "";
const POLL_INTERVAL_MS = parseInt(process.env.INDEXER_POLL_INTERVAL || "15000");

const server = new StellarSdk.SorobanRpc.Server(SERVER_URL, {
  allowHttp: SERVER_URL.startsWith("http://"),
});

const eventTypes = [
  "RENT/CREATED",
  "RENT/ACCEPTED",
  "RENT/CONTRIB",
  "RENT/FUNDED",
  "RENT/SETTLED",
  "RENT/CANCEL",
] as const;

type EventType = (typeof eventTypes)[number];

interface IndexerState {
  running: boolean;
  lastLedger: bigint;
}

const state: IndexerState = {
  running: false,
  lastLedger: BigInt(0),
};

async function getCursor(): Promise<bigint> {
  const cursor = await prisma.indexerCursor.findUnique({
    where: { name: "rent_reserve_indexer" },
  });

  if (cursor) {
    return cursor.lastLedger;
  }

  return BigInt(0);
}

async function saveCursor(ledger: bigint): Promise<void> {
  await prisma.indexerCursor.upsert({
    where: { name: "rent_reserve_indexer" },
    update: { lastLedger: ledger, updatedAt: new Date() },
    create: { name: "rent_reserve_indexer", lastLedger: ledger },
  });
}

function decodeEvent(event: any): {
  type: EventType | null;
  obligationId: string | null;
  data: Record<string, unknown>;
} {
  try {
    const topic = event.topic;
    if (!topic || topic.length < 2) {
      return { type: null, obligationId: null, data: {} };
    }

    const eventType = StellarSdk.scValToNative(topic[0]) as string;
    const obligationId = topic[1]
      ? Buffer.from(StellarSdk.scValToNative(topic[1]) as Buffer).toString("hex")
      : null;

    const data = event.data
      ? (StellarSdk.scValToNative(event.data) as Record<string, unknown>)
      : {};

    if (eventTypes.includes(eventType as EventType)) {
      return {
        type: eventType as EventType,
        obligationId,
        data,
      };
    }

    return { type: null, obligationId: null, data: {} };
  } catch (error) {
    console.error("Error decoding event:", error);
    return { type: null, obligationId: null, data: {} };
  }
}

async function processEvent(event: any): Promise<void> {
  const { type, obligationId, data } = decodeEvent(event);

  if (!type) {
    return;
  }

  const txHash = event.transactionHash || "unknown";
  const ledger = typeof event.ledger === "number" ? event.ledger : parseInt(event.ledger) || 0;

  const exists = await prisma.contractEvent.findUnique({
    where: {
      transactionHash_eventType: {
        transactionHash: txHash,
        eventType: type,
      },
    },
  });

  if (exists) {
    return;
  }

  await prisma.contractEvent.create({
    data: {
      eventType: type,
      obligationId,
      contractId: CONTRACT_ID,
      ledger: BigInt(ledger),
      transactionHash: txHash,
      data: data as any,
    },
  });

  console.log(`Processed event: ${type} for obligation: ${obligationId}`);

  if (obligationId) {
    await syncObligationFromEvents(obligationId);
  }
}

async function syncObligationFromEvents(obligationId: string): Promise<void> {
  const events = await prisma.contractEvent.findMany({
    where: { obligationId },
    orderBy: { ledger: "asc" },
  });

  if (events.length === 0) {
    return;
  }

  const obligation = await prisma.rentObligation.findFirst({
    where: { chainObligationId: obligationId },
  });

  if (!obligation) {
    return;
  }

  let fundedAmount = BigInt(0);
  let status = obligation.status;

  for (const event of events) {
    switch (event.eventType) {
      case "RENT/CREATED":
        status = "ACTIVE";
        break;
      case "RENT/ACCEPTED":
        status = "FUNDING";
        break;
      case "RENT/CONTRIB": {
        const amount = (event.data as any)?.amount;
        if (typeof amount === "bigint" || typeof amount === "number") {
          fundedAmount += BigInt(amount);
        }
        break;
      }
      case "RENT/FUNDED":
        status = "FULLY_FUNDED";
        break;
      case "RENT/SETTLED":
        status = "SETTLED";
        break;
      case "RENT/CANCEL":
        status = "CANCELLED";
        break;
    }
  }

  await prisma.rentObligation.update({
    where: { id: obligation.id },
    data: {
      fundedAmount,
      status: status as any,
    },
  });
}

async function fetchAndProcessEvents(fromLedger: bigint): Promise<bigint> {
  let latestLedger = fromLedger;

  try {
    const response = await server.getEvents({
      startLedger: Number(fromLedger),
      filters: [
        {
          type: "contract",
          contractIds: [CONTRACT_ID],
        },
      ],
      limit: 100,
    });

    for (const event of response.events) {
      await processEvent(event);
      const eventLedger = BigInt(event.ledger);
      if (eventLedger > latestLedger) {
        latestLedger = eventLedger;
      }
    }

    if (response.events.length > 0) {
      await saveCursor(latestLedger);
    }
  } catch (error) {
    console.error("Error fetching events:", error);
  }

  return latestLedger;
}

export async function startIndexer(): Promise<void> {
  if (state.running) {
    console.log("Indexer already running");
    return;
  }

  state.running = true;
  state.lastLedger = await getCursor();

  console.log(`Starting indexer from ledger: ${state.lastLedger}`);

  while (state.running) {
    try {
      state.lastLedger = await fetchAndProcessEvents(state.lastLedger);
    } catch (error) {
      console.error("Indexer loop error:", error);
    }

    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
  }
}

export function stopIndexer(): void {
  state.running = false;
  console.log("Indexer stopped");
}

export function getIndexerState(): IndexerState {
  return { ...state };
}
