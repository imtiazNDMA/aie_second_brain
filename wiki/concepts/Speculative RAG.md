---
title: Speculative RAG
type: concept
tags: [rag, optimization, planning]
sources: [2026-04-12-14-types-of-rag]
created: 2026-04-13
updated: 2026-04-13
---

# Speculative RAG

## Definition

Speculative RAG prefetches likely follow-up contexts or questions so that an agent can answer faster when users deepen the conversation. Instead of waiting for every clarifying question, the system predicts adjacent intents, collects evidence for them, and keeps the materials cached.

## Implementation Patterns

- Train intent classifiers or next-question models to anticipate what users may ask after the current response.
- Retrieve extra passages that satisfy those intents and store them in short-lived caches.
- When the user confirms one of the predicted directions, stitch the cached context into the new answer, skipping another round-trip to the retriever.

## Use Cases

- Analyst copilots where users explore a dataset iteratively.
- Support agents handling troubleshooting flows with predictable step-by-step paths.
- Research agents that branch into multiple subtopics (e.g., summarizing each chapter of a report).

## Related Concepts

- [[Branched RAG]]
- [[Memory-Augmented RAG]]
- [[Retrieval-Augmented Generation]]
