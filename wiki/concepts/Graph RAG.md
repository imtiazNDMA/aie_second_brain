---
tags: [rag, knowledge-graph, retrieval]
sources: [2026-04-12-14-types-of-rag, 2026-04-29-graph-rag-survey, 2026-04-29-building-llm-agents-rag-knowledge-graphs-reflection]
created: 2026-04-12
updated: 2026-04-29
---

# Graph RAG

## Definition

Retrieval-augmented generation pattern that overlays a knowledge graph on source data so the retriever can reason about entity relationships, not just lexical similarity.

## Characteristics

- Builds or imports a knowledge graph (people, places, topics, events) and uses it to expand queries.
- Helps uncover hidden connections and prevents scattered answers by mapping traversal paths before feeding context to the LLM.
- Suited for investigative work, market intelligence, and any domain where relationship context matters more than keyword hits.

## Trade-offs

- Requires upfront investment to curate/maintain the graph.
- Slightly slower than naïve vector search but provides richer, more explainable context.

## Practical Integration Pattern
- Use vector retrieval to gather relevant passages quickly.
- Use graph traversal for multi-hop relationship context and disambiguation.
- Fuse both contexts in generation prompts with source attribution.
- Add evaluator loops to check whether graph-derived claims are grounded.

## Related Concepts

- [[Retrieval-Augmented Generation]]
- [[Knowledge-Graph Indexing]]
- [[Knowledge Graphs]]
- [[R3A Loop]]
