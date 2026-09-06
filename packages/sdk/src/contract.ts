import {
  Contract,
  SorobanRpc,
  Address,
  xdr,
  scValToNative,
  nativeToScVal,
  TransactionBuilder,
  Transaction,
} from "@stellar/stellar-sdk";
import {
  RentObligation,
  RentStatus,
  CreateObligationParams,
  ContributeParams,
  ContractError,
  ErrorCode,
  ERROR_MESSAGES,
} from "./types.js";

export class RentReserveClient {
  private contractId: string;
  private server: SorobanRpc.Server;
  private networkPassphrase: string;

  constructor(
    contractId: string,
    serverUrl: string,
    networkPassphrase: string
  ) {
    this.contractId = contractId;
    this.server = new SorobanRpc.Server(serverUrl, {
      allowHttp: serverUrl.startsWith("http://"),
    });
    this.networkPassphrase = networkPassphrase;
  }

  private async invoke<T>(
    method: string,
    args: xdr.ScVal[],
    source?: string
  ): Promise<T> {
    const contract = new Contract(this.contractId);
    const op = contract.call(method, ...args);

    const account = source
      ? await this.server.getAccount(source)
      : await this.server.getAccount(
          "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
        );

    const transaction = new TransactionBuilder(account, {
      fee: "100000",
      networkPassphrase: this.networkPassphrase,
    })
      .addOperation(op)
      .setTimeout(300)
      .build();

    if (source) {
      const prepared = await this.server.prepareTransaction(transaction);
      const result = await this.server.sendTransaction(prepared);

      if (result.status === "ERROR") {
        throw this.parseSendError(result);
      }

      const txResult = await this.server.getTransaction(result.hash);
      if (txResult.status === "FAILED") {
        throw this.parseTxError(txResult);
      }

      if (
        txResult.status === "SUCCESS" &&
        "returnValue" in txResult &&
        txResult.returnValue
      ) {
        return scValToNative(txResult.returnValue) as T;
      }

      throw {
        code: 0,
        message: "Transaction did not return a value",
      } as ContractError;
    }

    const result = await this.server.simulateTransaction(transaction);

    if (SorobanRpc.Api.isSimulationError(result)) {
      throw {
        code: 0,
        message: result.error,
      } as ContractError;
    }

    if (result.result?.retval) {
      return scValToNative(result.result.retval) as T;
    }

    throw {
      code: 0,
      message: "Simulation did not return a value",
    } as ContractError;
  }

  private parseSendError(
    result: SorobanRpc.Api.SendTransactionResponse
  ): ContractError {
    const error = result.errorResult;
    if (error) {
      const match = String(error).match(/contract .* returned error (\d+)/);
      if (match) {
        const code = parseInt(match[1]) as ErrorCode;
        return {
          code,
          message: ERROR_MESSAGES[code] || `Unknown error: ${code}`,
        };
      }
    }
    return {
      code: 0,
      message: result.status,
    };
  }

  private parseTxError(
    result: SorobanRpc.Api.GetTransactionResponse
  ): ContractError {
    if (result.status === "FAILED" && "resultXdr" in result) {
      const error = result.resultXdr;
      if (error) {
        const match = String(error).match(/contract .* returned error (\d+)/);
        if (match) {
          const code = parseInt(match[1]) as ErrorCode;
          return {
            code,
            message: ERROR_MESSAGES[code] || `Unknown error: ${code}`,
          };
        }
      }
    }
    return {
      code: 0,
      message: result.status,
    };
  }

  async initialize(admin: string): Promise<void> {
    await this.invoke("initialize", [
      nativeToScVal(new Address(admin), { type: "address" }),
    ]);
  }

  async pause(source: string): Promise<void> {
    await this.invoke("pause", [], source);
  }

  async unpause(source: string): Promise<void> {
    await this.invoke("unpause", [], source);
  }

  async createObligation(
    params: CreateObligationParams,
    source: string
  ): Promise<string> {
    const result = await this.invoke<xdr.ScVal>(
      "create_obligation",
      [
        nativeToScVal(new Address(params.tenant), { type: "address" }),
        nativeToScVal(new Address(params.landlord), { type: "address" }),
        nativeToScVal(Buffer.from(params.propertyRef, "hex"), {
          type: "bytes",
        }),
        nativeToScVal(new Address(params.asset), { type: "address" }),
        nativeToScVal(params.targetAmount, { type: "i128" }),
        nativeToScVal(params.startTime, { type: "u64" }),
        nativeToScVal(params.dueTime, { type: "u64" }),
      ],
      source
    );
    return Buffer.from(result.toXDR()).toString("hex");
  }

  async acceptObligation(
    obligationId: string,
    source: string
  ): Promise<void> {
    await this.invoke(
      "accept_obligation",
      [nativeToScVal(Buffer.from(obligationId, "hex"), { type: "bytes" })],
      source
    );
  }

  async contribute(params: ContributeParams, source: string): Promise<void> {
    await this.invoke(
      "contribute",
      [
        nativeToScVal(Buffer.from(params.obligationId, "hex"), {
          type: "bytes",
        }),
        nativeToScVal(new Address(params.contributor), { type: "address" }),
        nativeToScVal(params.amount, { type: "i128" }),
      ],
      source
    );
  }

  async settle(obligationId: string, source: string): Promise<void> {
    await this.invoke(
      "settle",
      [nativeToScVal(Buffer.from(obligationId, "hex"), { type: "bytes" })],
      source
    );
  }

  async cancel(obligationId: string, source: string): Promise<void> {
    await this.invoke(
      "cancel",
      [nativeToScVal(Buffer.from(obligationId, "hex"), { type: "bytes" })],
      source
    );
  }

  async getObligation(obligationId: string): Promise<RentObligation> {
    const result = await this.invoke<xdr.ScVal>(
      "get_obligation",
      [nativeToScVal(Buffer.from(obligationId, "hex"), { type: "bytes" })]
    );
    return this.mapObligation(result);
  }

  async getContributorTotal(
    obligationId: string,
    contributor: string
  ): Promise<bigint> {
    return this.invoke<bigint>(
      "get_contributor_total",
      [
        nativeToScVal(Buffer.from(obligationId, "hex"), { type: "bytes" }),
        nativeToScVal(new Address(contributor), { type: "address" }),
      ]
    );
  }

  async getRemaining(obligationId: string): Promise<bigint> {
    return this.invoke<bigint>(
      "get_remaining",
      [nativeToScVal(Buffer.from(obligationId, "hex"), { type: "bytes" })]
    );
  }

  async getProgressPct(obligationId: string): Promise<number> {
    return this.invoke<number>(
      "get_progress_pct",
      [nativeToScVal(Buffer.from(obligationId, "hex"), { type: "bytes" })]
    );
  }

  async version(): Promise<number> {
    return this.invoke<number>("version", []);
  }

  private mapObligation(raw: xdr.ScVal): RentObligation {
    const map = scValToNative(raw) as any;
    return {
      id: Buffer.from(map.id).toString("hex"),
      tenant: map.tenant.toString(),
      landlord: map.landlord.toString(),
      propertyRef: Buffer.from(map.property_ref).toString("hex"),
      asset: map.asset.toString(),
      targetAmount: BigInt(map.target_amount),
      fundedAmount: BigInt(map.funded_amount),
      startTime: BigInt(map.start_time),
      dueTime: BigInt(map.due_time),
      status: map.status as RentStatus,
      createdAt: BigInt(map.created_at),
      updatedAt: BigInt(map.updated_at),
    };
  }
}
