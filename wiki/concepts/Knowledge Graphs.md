---

title: Knowledge Graphs
type: concept
tags: [knowledge-representation, graph, rag, graph-rag, cluster/knowledge-graphs]
sources: [2026-04-29-graph-rag-survey.md, 2026-04-12-rag-driven-generative-ai.md, 2026-04-29-building-llm-agents-rag-knowledge-graphs-reflection, 2026-07-07-building-ai-agents-with-llms-rag-knowledge-graphs, 2026-09-12-building-knowledge-graphs-practitioners-guide, 2026-09-12-knowledge-graphs-and-llms-in-action, 2026-09-12-digital-twins-in-action]
created: 2026-04-29
updated: 2026-09-12
---


# Knowledge Graphs

Structured representations of facts and relationships between entities, organized as nodes (entities) and edges (relationships) in a graph format.

## Definition

Knowledge graphs store information as triples: (subject, predicate, object), enabling rich semantic queries and reasoning. They provide structured world knowledge that can enhance retrieval-augmented generation by offering explicit relationship traversal.

## RDF vs. Labeled Property Graphs

| Aspect | RDF | LPG |
|---|---|---|
| **Data model** | Triples (subject, predicate, object) | Nodes with properties + typed relationships |
| **Schema** | RDFS/OWL ontologies | Constraints (uniqueness, existence, type) |
| **Query** | SPARQL | Cypher, Gremlin |
| **Flexibility** | Fixed vocabulary | Evolving schema |
| **Properties** | Reified or via named graphs | Native on nodes and relationships |

[[Building Knowledge Graphs: A Practitioner's Guide]] favors LPGs for practical projects due to schema flexibility and Cypher's expressiveness. [[Knowledge Graphs and LLMs in Action]] notes that the triple framing is accurate for RDF but too narrow for LPGs.

## Purpose-Driven Development

Rather than wholesale data ingestion, KG development should begin with a business question. [[Knowledge Graphs and LLMs in Action]] adapts CRISP-DM: business understanding → relevant-data selection → preparation → incremental KG modeling → evaluation and deployment.

## Key Concepts

- **Entities and Relations**: Nodes represent entities, edges represent relationships
- **Triple Storage**: Facts stored as (subject, predicate, object) triples (RDF) or property-bearing nodes/relationships (LPG)
- **SPARQL**: Query language for retrieving data from RDF knowledge graphs
- **Cypher**: Query language for LPGs (see [[Cypher Query Language]])
- **Entity Linking**: Mapping text mentions to knowledge graph entities
- **Graph Traversal**: Following relationships to gather multi-hop context
- **Hybrid Retrieval**: Combining graph traversal with vector retrieval to fuse structural and semantic relevance
- **Provenance**: Source document attribution through metagraph layers
- **Knowledge Lakes**: Federated pattern connecting multiple KGs without unified ontology

## LLM-Assisted Construction

[[2026-07-07-building-ai-agents-with-llms-rag-knowledge-graphs]] presents LLM-assisted KG construction as a pipeline:

- define the ontology and graph purpose before extraction
- use NER to identify entities and relation extraction to identify edges
- prompt an LLM to emit triples or graph queries when labels are scarce
- assess and clean extracted facts before using them for retrieval
- enrich the graph by merging external sources or inferring missing relationships
- deploy the graph through a graph database such as Neo4j or as a component inside [[Graph RAG]]

## KG + LLM Integration

[[Knowledge Graphs and LLMs in Action]] establishes that KGs and LLMs are complementary, not competing:
- KGs supply explicit, inspectable, updateable domain knowledge
- LLMs supply language understanding, extraction, summarization, and probabilistic handling of ambiguity
- Their combination addresses hallucination, stale knowledge, difficult graph querying, and inaccessible results

The 7-step grounding pipeline: LLM extracts question features → match to semantic schema → build Cypher → validate/repair → retrieve authoritative data → generate grounded answer → fallback with explanation.

## Knowledge Graphs for Digital Twins

[[Digital Twins in Action]] demonstrates KGs as the semantic backbone for digital twins:
- Ontologies provide formal semantic definitions of models of reality
- Knowledge graphs enable context-aware queries without knowing specific sensor IDs
- RealEstateCore ontology + GraphQL APIs serve twin data

## Related Concepts

- [[Graph RAG]] — Uses knowledge graphs for enhanced retrieval
- [[Retrieval-Augmented Generation]] — Traditional RAG vs. graph-enhanced approaches
- [[Knowledge-Graph Indexing]] — Technique to build indexes from knowledge graphs
- [[Graph Neural Network]] — Can learn representations from knowledge graphs
- [[Cypher Query Language]] — Query language for LPGs
- [[Entity Resolution]] — 6-step graph-native pattern
- [[Knowledge Lakes]] — Federated pattern for multiple KGs
- [[Text-to-Cypher]] — NL-to-Cypher translation pipeline

## Sources

- [[2026-04-29-graph-rag-survey]]: Discussed as foundation for Graph RAG approaches
- [[2026-04-12-rag-driven-generative-ai]]: Mentioned in context of Knowledge-Graph Indexing
- [[2026-09-12-building-knowledge-graphs-practitioners-guide]]: Neo4j-focused practitioner guide with Cypher examples
- [[2026-09-12-knowledge-graphs-and-llms-in-action]]: KG+LLM integration across 15 chapters
- [[2026-09-12-digital-twins-in-action]]: KGs as semantic backbone for digital twins

## Open Questions

- How to automatically construct knowledge graphs from unstructured text?
- What are the scalability challenges of large-scale knowledge graphs?
- When to prefer LPG over RDF for new projects?
- How to handle schema evolution in production KGs?
