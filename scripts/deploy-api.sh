#!/bin/bash
set -euo pipefail

echo "Building API..."
cd apps/api
npm run build

echo "Starting API server..."
npm start
