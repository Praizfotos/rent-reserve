# Architecture

RentReserve uses a layered monorepo architecture with clear separation between frontend, API, smart contract, and shared packages.

## High-level architecture

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                           │
│                                                         │
│   Next.js 16 (landing page + app routes)                │
│   ├── /                    → editorial landing page     │
│   ├── /app/dashboard       → rent readiness dashboard   │
│   ├── /app/obligations     → obligation list            │
│   ├── /app/obligations/[id]→ detail + simulator         │
│   ├── /app/timeline        → activity timeline          │
│   └── /app/settings        → wallet + settlement        │
│                                                         │
└──────────────────────┬──────────────────────────────────┘
                       │ REST API
                       ▼
┌─────────────────────────────────────────────────────────┐
│                    API LAYER                             │
│                                                         │
│   Express + TypeScript                                  │
│   ├── routes/obligations   → CRUD + lifecycle           │
│   ├── middleware/           → validation, rate limiting  │
│   ├── jobs/notifications   → reminder scheduling        │
│   └── stellar/indexer      → Horizon event polling      │
│                                                         │
└──────────┬──────────────────────────┬───────────────────┘
           │                          │
           ▼                          ▼
    ┌─────────────┐          ┌──────────────────┐
    │  PostgreSQL  │          │  Stellar/Soroban  │
    │  (Prisma)    │          │  (Testnet)        │
    │              │          │                   │
    │  14 models   │          │  rent_reserve.wasm│
    └─────────────┘          └──────────────────┘
```

## Monorepo structure

The project uses npm workspaces:

```json
{
  "workspaces": ["packages/*", "apps/*"]
}
```

### packages/contracts

Rust/Soroban smart contract implementing the rent obligation lifecycle.

- `src/lib.rs` — contract implementation (407 lines)
- `src/tests.rs` — 24 tests covering all state transitions
- Dependencies: `soroban-sdk 28.0.0-rc.1`

### packages/sdk

TypeScript client for interacting with the deployed contract.

- `src/contract.ts` — `RentReserveClient` class
- Handles RPC connection, contract invocation, error mapping

### packages/types

Shared TypeScript type definitions used by SDK and API.

### apps/api

Express REST API with PostgreSQL persistence.

- Prisma schema with 14 models
- Obligation routes with Zod validation
- Stellar event indexer (Horizon polling)
- Notification scheduling engine

### rentreserve

Next.js 16 frontend — both the landing page and application routes.

- 17-section editorial landing page
- 5 application routes (dashboard, obligations, detail, timeline, settings)
- 7 motion primitives with reduced-motion support
- Product UI component library (12 components)
- Centralized design and motion tokens

## Data flow

1. **User creates obligation** → API stores in PostgreSQL → Soroban contract created
2. **User contributes** → API records contribution → Soroban contribution recorded
3. **Notification engine** → checks obligation status → sends reminders
4. **Indexer** → polls Horizon → syncs on-chain events to PostgreSQL
5. **User settles** → Soroban settlement → transaction verified on Stellar

## Design principles

- **Blockchain supports the product, not the other way around** — users interact with familiar UX, blockchain handles settlement
- **Non-custodial** — users authorize all transactions through their wallet
- **Gradual funding** — multiple contributions belong to the same obligation
- **Transparent progress** — users always know their readiness status
