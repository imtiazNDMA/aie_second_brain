# AI Engineering Rules

Use these rules for all AI-related product work across backend, database, and frontend.

## Product Rules

- Every AI feature must have a measurable user outcome (speed, accuracy, trust, or effort saved).
- Prefer deterministic systems where possible; use model inference only where it adds clear value.
- Build for graceful degradation when models are unavailable.

## LLM System Rules

- Keep a provider abstraction (`mock`, `ollama`, optional cloud providers).
- Separate responsibilities:
  - extraction model for ingest
  - generation model for chat
  - embedding model for retrieval
- Version prompts, schemas, and model settings together.

## Data and Retrieval Rules

- Preserve provenance from `raw/` file to chunk to answer citation.
- Never answer source-grounded questions without retrieval.
- Keep chunking deterministic and reproducible.
- Store confidence and retrieval scores for diagnostics.

## Full Stack Rules

- Backend returns structured metadata the frontend can explain.
- Frontend must show evidence and uncertainty, not only final text.
- Database schema must support re-indexing and model swaps.
- Operational logs must support debugging by run id and request id.

## Quality Gates

AI changes are production-ready only when:

1. Retrieval metrics improve or stay stable.
2. Citation coverage meets threshold for factual answers.
3. Latency remains within agreed budget.
4. Failure paths are tested and user-visible.
