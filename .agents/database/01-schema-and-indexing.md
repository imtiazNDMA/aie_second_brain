# Schema and Indexing Guide

Database is the retrieval and application state layer, not the editorial source of truth.

## Core Tables

- `vaults`: logical container for content.
- `sources`: raw files and metadata.
- `pages`: normalized wiki pages.
- `page_links`: directed edges from wikilinks.
- `chunks`: retrievable text fragments with offsets.
- `embeddings`: vector payload for chunks/pages.
- `ingest_runs`: job tracking and diagnostics.
- `chat_threads`, `chat_messages`, `message_citations`.

## Minimal Column Guidance

- `pages`: `id`, `vault_id`, `slug`, `title`, `type`, `frontmatter_json`, `markdown`, `checksum`, `created_at`, `updated_at`
- `chunks`: `id`, `page_id`, `ordinal`, `text`, `start_offset`, `end_offset`, `token_count`
- `embeddings`: `id`, `chunk_id`, `model`, `dim`, `vector`, `created_at`

## Indexing Strategy

- Unique:
  - `(vault_id, slug)` on `pages`
  - `(page_id, ordinal)` on `chunks`
- Search:
  - `GIN`/`pg_trgm` on `pages.title`, `pages.slug`, and optional `chunks.text`
  - `tsvector` index for full-text fallback
- Vector:
  - `HNSW` (or IVFFlat where needed) on `embeddings.vector`

## Data Integrity

- Foreign keys with `ON DELETE CASCADE` for dependent rows.
- Soft-delete optional for user-facing recovery.
- Track `checksum` to make ingest idempotent.

## Query Patterns to Optimize

- page lookup by slug
- backlinks and neighbors by slug
- hybrid retrieval by query text + vector
- ingest status by run id and time window
