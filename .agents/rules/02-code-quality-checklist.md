# Code Quality Checklist

Use this checklist before opening or merging any change.

## Architecture

- Change fits existing module boundaries.
- New abstractions reduce complexity instead of hiding it.
- Data model and API contracts are explicit and typed.

## Backend

- Input validation exists at API boundary.
- Errors are structured and actionable.
- Long-running operations are async or background jobs.
- Logging includes request/run identifiers.

## Database

- Migration included for schema changes.
- Index strategy justified for new query paths.
- Upserts are deterministic and idempotent.
- No N+1 query regressions.

## LLM and Ingest

- Prompt output is schema-constrained JSON.
- Invalid model output has retry and fallback behavior.
- Source-level and chunk-level citations are preserved.
- Extraction fields are versioned if schema changes.

## Frontend

- Loading, empty, error states implemented.
- Keyboard and mobile usability verified.
- No blocking API calls in render path.
- Citations are visible and navigable.

## Reliability

- Unit tests added/updated.
- Integration test covers main happy path.
- Feature flags used for risky behavior.
- Backward compatibility considered for existing data.

## Security and Safety

- No secrets in code or logs.
- Input/output sanitization for markdown rendering.
- Model prompt injection boundaries documented.
- Unsafe tool use disabled by default.
