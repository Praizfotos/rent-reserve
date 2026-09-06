#!/bin/bash

# Database Setup Script for RentReserve API
# Requires: PostgreSQL running locally

set -e

echo "Setting up RentReserve database..."

# Check if PostgreSQL is running
if ! pg_isready -q 2>/dev/null; then
  echo "Error: PostgreSQL is not running."
  echo "Start PostgreSQL and try again."
  exit 1
fi

# Create database if it doesn't exist
DB_NAME="rentreserve"
if ! psql -lqt | cut -d \| -f 1 | grep -qw "$DB_NAME"; then
  echo "Creating database: $DB_NAME"
  createdb "$DB_NAME"
else
  echo "Database $DB_NAME already exists."
fi

# Run Prisma migration
echo "Running Prisma migration..."
cd "$(dirname "$0")/../apps/api"
npx prisma migrate dev

echo "Database setup complete!"
