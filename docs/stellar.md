# Stellar / Soroban Integration

This document describes how RentReserve uses Stellar and Soroban as the programmable settlement layer.

## Overview

RentReserve uses Soroban smart contracts to manage rent obligation state on-chain. The contract handles the full lifecycle: creation, acceptance, contributions, settlement, and cancellation.

The API layer coordinates between the PostgreSQL database and the Soroban contract, while the event indexer synchronizes on-chain state back to the database.

## Smart contract

The contract is implemented in `packages/contracts/src/lib.rs` (407 lines).

### Contract address

```
Testnet: <deployed after stellar contract deploy>
```

### Obligation lifecycle

```
PendingAcceptance → Active → PartiallyFunded → FullyFunded → Settled
                  ↘ Cancelled              ↘ Expired
```

### Contract methods

| Method | Description | Authorization |
|---|---|---|
| `create_obligation` | Define a new rent obligation | Tenant |
| `accept_obligation` | Landlord accepts the obligation | Landlord |
| `contribute` | Add funds toward the obligation | Contributor |
| `settle` | Mark obligation as settled (requires full funding) | Tenant |
| `cancel` | Cancel obligation (refunds contributors) | Tenant |
| `get_obligation` | Read obligation state | Any |

### Error codes

| Code | Name | Description |
|---|---|---|
| 1 | `Unauthorized` | Caller not authorized for this action |
| 2 | `ObligationNotFound` | Obligation ID not found |
| 3 | `InvalidStateTransition` | State machine violation |
| 4 | `InvalidAmount` | Amount is zero or negative |
| 5 | `WouldExceedTarget` | Contribution would exceed target |
| 6 | `AlreadySettled` | Cannot act on settled obligation |
| 7 | `AlreadyCancelled` | Cannot act on cancelled obligation |
| 8 | `Expired` | Obligation past deadline |
| 9 | `NotFullyFunded` | Cannot settle before full funding |
| 10 | `InvalidDueDate` | Due date is in the past |
| 11 | `InvalidTarget` | Target amount too low |
| 12 | `ContractPaused` | Contract is paused |
| 13 | `ObligationNotActive` | Obligation not in active state |
| 14 | `InvalidTimeRange` | Time range is invalid |

### Security model

- Every state-changing function requires explicit authorization from the appropriate participant
- Soroban's built-in replay protection is used throughout
- No admin key can move user funds
- Invariant: `funded_amount <= target_amount` always holds

## SDK

The TypeScript SDK (`packages/sdk/src/contract.ts`) provides a client abstraction for contract interactions.

```typescript
import { RentReserveClient } from '@rent-reserve/sdk';

const client = new RentReserveClient({
  rpcUrl: 'https://soroban-testnet.stellar.org',
  contractId: '<contract-id>',
});

// Create an obligation
await client.createObligation({
  tenant: '<tenant-address>',
  landlord: '<landlord-address>',
  targetAmount: BigInt(1200000),
  dueDate: BigInt(Math.floor(Date.now() / 1000) + 365 * 86400),
});
```

## Event indexer

The API includes a Stellar Horizon event indexer (`apps/api/src/stellar/indexer.ts`) that:

- Polls Horizon for contract events
- Maintains a cursor for resume-on-restart
- Processes events idempotently
- Stores events in PostgreSQL via Prisma

### Event types

| Event | Description |
|---|---|
| `obligation_created` | New obligation defined |
| `obligation_accepted` | Landlord accepted |
| `contribution_made` | Funds contributed |
| `settlement_completed` | Obligation settled |
| `obligation_cancelled` | Obligation cancelled |

## Deployment

### Build the contract

```bash
cd packages/contracts
stellar contract build
```

### Deploy to testnet

```bash
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/rent_reserve.wasm \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015"
```

### Environment variables

```env
STELLAR_RPC_URL=https://soroban-testnet.stellar.org
STELLAR_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
SOROBAN_CONTRACT_ID=<deployed-contract-id>
```

## Current status

- **Smart contract**: Implemented and tested (24 tests passing)
- **SDK**: Implemented, typechecks clean
- **Event indexer**: Implemented with Horizon polling
- **Wallet connection**: Mock data (Freighter integration planned)
- **Settlement transactions**: UI shows hashes but does not submit real transactions yet

The smart contract is the most mature Stellar component. The frontend demonstrates the intended experience with realistic mock data while wallet and settlement integration are completed.
