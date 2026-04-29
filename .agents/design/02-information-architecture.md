# Information Architecture

## Core Object Model

- Source: imported raw document.
- Page: normalized wiki artifact.
- Concept/Entity: typed knowledge nodes.
- Link: directed relationship.
- Chunk: retrievable evidence unit.
- Citation: answer-to-evidence mapping.

## Navigation Model

- Global nav: Dashboard, Search, Chat, Graph, Ingest.
- Context nav in page view: Overview, Links, Sources, Timeline.
- Cross-links should preserve context and support quick return.

## URL Strategy

- `/search?q=...&type=...`
- `/page/[slug]`
- `/chat?thread=...`
- `/graph?node=...&depth=...`
- `/ingest/runs/[id]`

## Metadata Strategy

- Always expose source provenance.
- Display updated timestamps and ingest run version.
- Distinguish generated summaries from verbatim evidence.

## IA Quality Checks

- Every page should be reachable from at least one other page.
- Orphan pages should be surfaced as lint items.
- New concepts should attach to at least one source and one related concept.
