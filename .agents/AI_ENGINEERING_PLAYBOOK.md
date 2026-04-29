# Full Stack AI Engineering Playbook

This is the execution playbook for delivering AI features end to end in this repository.

## Scope

- Input: raw sources in `raw/`
- Knowledge layer: wiki pages and links in `wiki/`
- Product surfaces: ingest, search, page browse, chat, graph
- Runtime: Ollama-first local stack with Gemma for extraction/generation

## Standard Delivery Flow

1. Define user outcome and acceptance criteria.
2. Design data and API contracts.
3. Implement database migration/index changes.
4. Implement backend logic and telemetry.
5. Implement frontend states and explainability UX.
6. Run evaluation gates and regression checks.
7. Document operational runbook updates.

## Playbook A: Build an AI Feature

Use this flow for new AI capabilities (for example, "compare sources" or "suggest missing links").

1. Product spec
   - Define user story and measurable success metric.
2. Contract design
   - Request/response DTOs and model output schema.
3. Data shape
   - Add or update tables and indexes.
4. Backend implementation
   - Retrieval, prompt assembly, schema validation, fallbacks.
5. Frontend implementation
   - Loading/empty/error/success states and citation visibility.
6. Eval
   - Run gold set checks and latency checks.
7. Ship
   - Feature flag, canary, and monitor.

## Playbook B: Ingest Source to Knowledge Graph

1. Discover changed or new files in `raw/`.
2. Parse and chunk with deterministic boundaries.
3. Extract structured knowledge with `gemma4:latest`.
4. Validate schema, retry once, fallback if needed.
5. Upsert pages, links, chunks, embeddings.
6. Recompute backlinks and graph stats.
7. Persist run report (`completed`, `failed`, `needs_review`).

## Playbook C: Grounded Chat Answer

1. Classify intent and filters.
2. Run hybrid retrieval and reranking.
3. Build constrained prompt with evidence context.
4. Stream answer and citations as separate events.
5. Save telemetry and feedback labels.

## Operational SLO Targets (Starting Point)

- Search p95: <= 1200 ms
- Chat first token p95: <= 2500 ms
- Ingest extraction parse failure: < 2%
- Citation precision on gold set: >= 90%

Tune these as real traffic and hardware constraints become clear.

## Definition of Ready

- Problem statement clear
- Data/API contract drafted
- Eval plan drafted
- Rollback strategy defined

## Definition of Done

- Code + tests merged
- Eval gates passed
- Monitoring updated
- Relevant docs in `.agents/` updated
