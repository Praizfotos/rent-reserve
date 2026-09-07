# Stellar / Soroban Integration

This document describes how RentReserve uses Stellar and Soroban as the programmable settlement layer.

## Overview

RentReserve uses Soroban smart contracts to manage rent obligation state on-chain. The contract handles the full lifecycle: creation, acceptance, contributions, settlement, and cancellation.

The API layer coordinates between the PostgreSQL database and the Soroban contract, while the event indexer synchronizes on-chain state back to the database.

## Smart contract

The contract is implemented in `packages/contracts/src/lib.rs` (407 lines).

### Contract address

```
Testnet: CDCIUAVJWNXRR6BTULG4SWFQQQTKAGUYTHMCUDDWTYRNH46YBGPFFWMI
```

Network: Stellar Testnet

Explorer: [Stellar Expert](https://stellar.expert/explorer/testnet/contract/CDCIUAVJWNXRR6BTULG4SWFQQQTKAGUYTHMCUDDWTYRNH46YBGPFFWMI) | [Stellar Lab](https://lab.stellar.org/r/testnet/contract/CDCIUAVJWNXRR6BTULG4SWFQQQTKAGUYTHMCUDDWTYRNH46YBGPFFWMI)

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
  contractId: 'CDCIUAVJWNXRR6BTULG4SWFQQQTKAGUYTHMCUDDWTYRNH46YBGPFFWMI',
});

// Create an obligation
await client.createObligation({
  tenant: '<tenant-address>',
  landlord: '<landlord-address>',
  targetAmount: BigInt(1200000),
  dueDate: BigInt(Math.floor(Date.now() / 1000) + 365 * 86400),
});
```

## Why Soroban is meaningful to RentReserve

RentReserve is not using Stellar merely as a payment rail.

The rent obligation itself has programmable state.

A Soroban contract can enforce:

1. Who created the obligation
2. Who must accept it
3. Who is authorized to contribute
4. How much can be contributed
5. When the obligation expires
6. When it becomes fully funded
7. When settlement is permitted
8. When cancellation is permitted
9. How the obligation's state changes over time

This makes the rent obligation independently verifiable rather than relying entirely on the application's database to determine whether an obligation was funded or settled correctly.

## On-chain vs application layer

### On-chain — Soroban

The Soroban contract is responsible for:

- Rent obligation state
- Participant authorization
- Contribution validation
- Funding limits
- Settlement eligibility
- Cancellation rules
- State transitions
- Contract-level invariants

### Off-chain — Application

The API and PostgreSQL layer are responsible for:

- User accounts
- Property metadata
- Dashboard aggregation
- Contribution planning
- Readiness calculations
- Notification scheduling
- Indexed event storage
- Application-level history

### Current integration boundary

The Soroban contract is implemented, tested, and deployed to Stellar Testnet.

The current frontend uses realistic mock wallet and settlement flows while Freighter wallet authorization and production transaction submission are being completed.

## Event indexer

The event indexer is implemented and designed to synchronize on-chain contract events into PostgreSQL. It is ready for use with the deployed Soroban contract.

The indexer (`apps/api/src/stellar/indexer.ts`):

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
  --wasm target/wasm32v1-none/release/rent_reserve.wasm \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015" \
  --source <deployer-key>
```

### Environment variables

```env
STELLAR_RPC_URL=https://soroban-testnet.stellar.org
STELLAR_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
SOROBAN_CONTRACT_ID=CDCIUAVJWNXRR6BTULG4SWFQQQTKAGUYTHMCUDDWTYRNH46YBGPFFWMI
```

## Current status

- **Smart contract**: Implemented, tested (24 tests), deployed to [Stellar Testnet](https://stellar.expert/explorer/testnet/contract/CDCIUAVJWNXRR6BTULG4SWFQQQTKAGUYTHMCUDDWTYRNH46YBGPFFWMI)
- **SDK**: Implemented, typechecks clean
- **Event indexer**: Implemented and ready for use with the deployed contract
- **Wallet connection**: Mock data (Freighter integration planned)
- **Settlement transactions**: UI shows hashes but does not submit real transactions yet

The smart contract is the most mature Stellar component — it is deployed and verifiable on-chain. The frontend demonstrates the intended experience with realistic mock data while wallet and settlement integration are completed.
