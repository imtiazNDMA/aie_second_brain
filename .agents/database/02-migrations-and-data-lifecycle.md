# Migrations and Data Lifecycle

## Migration Rules

- Every schema change requires a migration.
- Migrations must be forward-only in shared environments.
- Do not mix unrelated schema changes in one migration.
- Include indexes in the same migration when query path is introduced.

## Backfill Policy

- For new computed fields, create explicit backfill jobs.
- Mark progress by batch with checkpoints.
- Keep read path backward compatible until backfill is complete.

## Ingest Lifecycle

1. `queued`
2. `running`
3. `completed` or `failed` or `needs_review`

Persist:

- input checksum
- model versions used
- chunk counts
- extraction validation errors
- retries and latency

## Retention and Rebuild

- Keep raw source metadata indefinitely.
- Allow full re-index and re-embed by model version.
- Support selective rebuild by source, page, or date range.

## Operational SQL Checks

- orphan chunks without parent page
- links pointing to missing pages
- embeddings with dim mismatch
- duplicate slugs in same vault
