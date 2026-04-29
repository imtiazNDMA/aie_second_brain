---
title: Knowledge Graphs
type: concept
tags: [knowledge-representation, graph, rag, graph-rag]
sources: [2026-04-29-graph-rag-survey.md, 2026-04-12-rag-driven-generative-ai.md]
created: 2026-04-29
updated: 2026-04-29
---

# Knowledge Graphs

Structured representations of facts and relationships between entities, organized as nodes (entities) and edges (relationships) in a graph format.

## Definition

Knowledge graphs store information as triples: (subject, predicate, object), enabling rich semantic queries and reasoning. They provide structured world knowledge that can enhance retrieval-augmented generation by offering explicit relationship traversal.

## Key Concepts

- **Entities and Relations**: Nodes represent entities, edges represent relationships
- **Triple Storage**: Facts stored as (subject, predicate, object) triples
- **SPARQL**: Query language for retrieving data from knowledge graphs
- **Entity Linking**: Mapping text mentions to knowledge graph entities
- **Graph Traversal**: Following relationships to gather multi-hop context

## Related Concepts

- [[Graph RAG]] — Uses knowledge graphs for enhanced retrieval
- [[Retrieval-Augmented Generation]] — Traditional RAG vs. graph-enhanced approaches
- [[Knowledge-Graph Indexing]] — Technique to build indexes from knowledge graphs
- [[Graph Neural Network]] — Can learn representations from knowledge graphs

## Sources

- [[2026-04-29-graph-rag-survey.md]]: Discussed as foundation for Graph RAG approaches
- [[2026-04-12-rag-driven-generative-ai.md]]: Mentioned in context of Knowledge-Graph Indexing

## Open Questions

- How to automatically construct knowledge graphs from unstructured text?
- What are the scalability challenges of large-scale knowledge graphs?
