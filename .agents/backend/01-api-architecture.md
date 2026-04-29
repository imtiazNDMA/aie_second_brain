# Backend API Architecture

Backend should expose a stable, versioned API that supports ingest, browse, search, chat, and graph workflows.

## Service Boundaries

- `ingest`: parse and extract data from `raw/` sources.
- `content`: page read/list, backlinks, metadata.
- `search`: hybrid retrieval and ranking.
- `chat`: grounded responses with citations.
- `graph`: relationship traversal and neighborhood expansion.

## API Conventions

- Prefix routes with `/v1`.
- Use request/response DTOs with strict validation.
- Return machine-readable error payloads:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human readable message",
    "details": {}
  }
}
```

- Include `request_id` and optional `run_id` in headers/logs.

## Recommended Endpoint Set (MVP)

- `POST /v1/ingest/run`
- `GET /v1/ingest/runs`
- `GET /v1/pages`
- `GET /v1/pages/{slug}`
- `GET /v1/pages/{slug}/neighbors`
- `GET /v1/search`
- `POST /v1/chat/stream`
- `GET /v1/graph/subgraph`

## Streaming Chat Contract

- Use Server-Sent Events (SSE).
- Stream text chunks and citation events on separate event types.
- Do not require parsing citations from generated text.

Event example:

```text
event: citation
data: {"source_slug":"2026-04-12-ai-engineering","chunk_id":"...","score":0.82}
```

## Cross-Cutting Concerns

- Retry policy for model calls with bounded attempts.
- Timeout and cancellation support for long requests.
- Consistent telemetry for request duration, retrieval count, token usage.
- Feature flags for experimental ranking or prompts.
