#!/bin/sh
set -eu

if [ -z "${DATABASE_PRIVATE_URL:-${DATABASE_URL:-}}" ]; then
  echo 'Production requires DATABASE_PRIVATE_URL or DATABASE_URL. For local PGlite use pnpm dev.' >&2
  exit 1
fi

schema="${DATABASE_SCHEMA:-${RAILWAY_DEPLOYMENT_ID:-}}"
if [ -z "$schema" ] && [ -f .build-id ]; then schema="$(cat .build-id)"; fi
if [ -z "$schema" ]; then
  echo 'Set DATABASE_SCHEMA to a fixed, unique deployment schema (the Docker image supplies its own build ID).' >&2
  exit 1
fi
views="${PONDER_VIEWS_SCHEMA:-plea}"
port="${PORT:-42069}"
case "$schema" in *[!a-zA-Z0-9_-]*) echo 'Invalid DATABASE_SCHEMA' >&2; exit 1;; esac
case "$views" in *[!a-zA-Z0-9_-]*) echo 'Invalid PONDER_VIEWS_SCHEMA' >&2; exit 1;; esac
case "$port" in ''|*[!0-9]*) echo 'PORT must be an integer' >&2; exit 1;; esac

# Read-only RPC checks. No historical state is required for normal startup.
node scripts/verify-rpc.mjs

if [ "$views" = off ] || [ "$views" = "$schema" ]; then
  exec pnpm exec ponder start --schema "$schema" --port "$port" --hostname 0.0.0.0
fi
exec pnpm exec ponder start --schema "$schema" --views-schema "$views" --port "$port" --hostname 0.0.0.0
