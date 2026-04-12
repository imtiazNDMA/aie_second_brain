---
tags: [rag, vector-db, operations]
sources: [2026-04-12-rag-driven-generative-ai]
created: 2026-04-12
updated: 2026-04-12
---

# Dynamic RAG Collections

## Definition

Short-lived vector databases spun up for time-bound contexts (e.g., daily meetings) and discarded afterward to control costs and retain only relevant embeddings.

## Workflow

- Use [[Chroma]] or similar lightweight stores to create collections per event.
- Verify existence, deduplicate inputs, and delete once reports are delivered.

## Related Concepts

- [[Retrieval-Augmented Generation]]
- [[Agent Memory]]
