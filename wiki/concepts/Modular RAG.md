---
title: Modular RAG
type: concept
tags: [rag, llm, architecture, modularity]
sources: [2026-04-12-14-types-of-rag, 2026-04-29-rag-survey]
created: 2026-04-13
updated: 2026-04-29
---

# Modular RAG

## Definition

An architectural style that decomposes retrieval-augmented generation into swappable components (retrievers, rerankers, generators, evaluators, memory stores) so teams can evolve each part independently while preserving clear interface contracts.

## Key Patterns

- **Search module**: adapts retrieval to vector DBs, knowledge graphs, and hybrid search.
- **RAG-fusion**: multiple generated queries run in parallel and are reranked.
- **Memory module**: long-term conversational memory influences retrieval and response style.
- **Adapter module**: task-specific prompt/retriever adaptation for downstream use cases.
- **Flow variants**: rewrite-retrieve-read, generate-read, recite-read, and iterative loops.

## Benefits

- Easier experimentation by swapping individual modules without rebuilding pipelines.
- Better governance and debugging through module-level observability and metrics.
- Infrastructure efficiency by scaling expensive modules independently.

## Connections

- [[Retrieval-Augmented Generation]]
- [[Advanced RAG]]
- [[Adaptive RAG]]
- [[Self-RAG]]
- [[Graph RAG]]
- [[RAG Evaluation]]

## Sources

- [[2026-04-12-14-types-of-rag]]
- [[2026-04-29-rag-survey]]
