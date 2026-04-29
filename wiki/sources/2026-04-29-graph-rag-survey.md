---
title: Graph Retrieval-Augmented Generation Survey
type: source
authors: [Boci Peng, Yun Zhu, Yongchao Liu, Xiaohe Bo, Haizhou Shi, Chuntao Hong, Yan Zhang, Siliang Tang]
tags: [graph-rag, knowledge-graph, gnn]
created: 2026-04-29
updated: 2026-04-29
---

# Graph Retrieval-Augmented Generation: A Survey

## Summary
First comprehensive survey of GraphRAG methodologies covering graph-based indexing, graph-guided retrieval, and graph-enhanced generation. Covers Knowledge Graphs, GNNs, and evaluation methods.

## Key Takeaways

### GraphRAG vs. Traditional RAG
**Limitations of Traditional RAG**:
- Neglects relationships between entities
- Redundant information from text snippets
- Lacks global information (can't do query-focused summarization)

**GraphRAG Advantages**:
- Captures relational knowledge via graph structures
- Abstracts and summarizes text (shorter context)
- Retrieves subgraphs for comprehensive information

### Graph Data Sources

#### Open Knowledge Graphs
- **General**: Wikidata, Freebase, DBpedia, YAGO
- **Commonsense**: ConceptNet, ATOMIC (causal relationships)

#### Domain Knowledge Graphs
- **Biomedical**: CMeKG, PubMed-KG
- **Movie**: Wiki-Movies
- **Legal, Financial**: Specialized KGs

#### Self-Constructed Graphs
- **Document graphs**: Co-citation, co-topic relationships
- **Entity graphs**: Extract entities/relations via NER + LLMs
- **Task-specific**: Patent-phrase graphs, customer service KGs

### Retrieval Granularities
1. **Nodes**: Individual entities (precise, targeted)
2. **Triplets**: Subject-predicate-object (structured relations)
3. **Paths**: Sequences of relationships (reasoning chains)
4. **Subgraphs**: Connected graph portions (comprehensive context)
5. **Hybrid**: Multiple granularities (balance detail and breadth)

### Retrieval Paradigms
- **Once retrieval**: Single query for all relevant info
- **Iterative retrieval**: Multiple steps (adaptive/non-adaptive stopping)
- **Multi-stage**: Different retrievers at each stage

### Retriever Types
1. **Non-parametric**: Heuristic rules, PCST algorithm
2. **LM-based**: RoBERTa, GPT models as retrievers
3. **GNN-based**: Graph Neural Networks for structure understanding
4. **Hybrid**: Combine multiple approaches

### Graph-Enhanced Generation
Converts retrieved graph elements into LLM-compatible formats:
- Natural language from triplets
- Summaries of subgraphs/communities
- Code generation for structured output

## Taxonomy of GraphRAG Methods
Survey covers 100+ GraphRAG studies with detailed taxonomy of:
- Indexing methods (graph, text, vector, hybrid)
- Retrieval strategies (paradigm, granularity, retriever type)
- Generation approaches (format conversion, augmentation)

## Connections
- [[Boci Peng]] — lead author, Peking University
- [[Siliang Tang]] — co-author, Zhejiang University professor
- [[Graph RAG]] — survey topic (see [[Graph RAG]] page)
- [[Knowledge Graphs]] — core data structure

## Related Concepts
- [[Graph RAG]] (enhanced with survey coverage)
- [[Knowledge Graphs]] (detailed types)
- [[Graph Neural Network]] (retriever type)
- [[Retrieval-Augmented Generation]] (GraphRAG is a branch)
- [[Advanced RAG]] (GraphRAG fits here)
