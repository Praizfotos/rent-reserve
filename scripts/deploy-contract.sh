#!/bin/bash
set -euo pipefail

CONTRACT_NAME="rent-reserve"
NETWORK="${1:-testnet}"

if [ "$NETWORK" = "testnet" ];()
  RPC_URL="https://soroban-testnet.stellar.org"
  PASSPHRASE="Test SDF Network ; September 2015"
elif [ "$NETWORK" = "mainnet" ]; then
  RPC_URL="https://soroban-mainnet.stellar.org"
  PASSPHRASE="Public Global Stellar Network ; September 2015"
else
  echo "Usage: $0 [testnet|mainnet]"
  exit 1
fi

echo "Building contract..."
cd packages/contracts
cargo build --release

echo "Deploying to $NETWORK..."
stellar contract deploy \
  --wasm target/release/${CONTRACT_NAME}.wasm \
  --rpc-url "$RPC_URL" \
  --network-passphrase "$PASSPHRASE" \
  --source-account "${DEPLOYER_SECRET:-}"

echo "Deployment complete!"
