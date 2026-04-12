---
tags: [knowledge-graph, rag, retrieval]
sources: [2026-04-12-rag-driven-generative-ai]
created: 2026-04-12
updated: 2026-04-12
---

# Knowledge-Graph Indexing

## Definition

Technique of converting corpora (e.g., Wikipedia) into graph structures where nodes capture entities/topics and edges encode relations, enabling semantic queries and reranking.

## In Practice

- [[LlamaIndex]] graph indices overlay vector stores ([[Deep Lake]]) with relationship traversals.
- Supports hybrid search: combine graph walks with embedding similarity for precise answers and visual explainability.

## Related Concepts

- [[Adaptive RAG]]
- [[Agent Memory]]
