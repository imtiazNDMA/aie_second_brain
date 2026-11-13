---
tags: [source, book, knowledge-graphs, llms, graph-rag, text-to-cypher]
sources: ["Knowledge Graphs and LLMs in Action.pdf"]
created: 2026-09-12
updated: 2026-09-12
---

# Knowledge Graphs and LLMs in Action

**Source:** Knowledge Graphs and LLMs in Action -- Alessandro Negro, Giuseppe Futia, Vlastimil Kůs, Fabio Montagna -- Manning Publications Co_ LLC -- isbn13 9781633439894
**Date ingested:** 2026-09-12
**Type:** book

## Summary

Manning "In Action" series book covering KG+LLM integration across 15 chapters and 3 appendices. KGs supply explicit, inspectable, updateable domain knowledge; LLMs supply language understanding, extraction, summarization, and probabilistic handling of ambiguity. Their combination addresses hallucination, stale knowledge, difficult graph querying, and inaccessible results.

## Key Claims

- KGs and LLMs should be treated as complementary components, not competing knowledge stores
- KG development should begin with a business question, not wholesale data ingestion
- LLM extraction does not remove the need for normalization, provenance, evaluation, and entity resolution
- Graph structure enables retrieval that vector similarity alone cannot reliably provide (multihop evidence, aggregate questions)
- Graph analytics must account for domain semantics; generic centralities can miss domain-specific patterns
- Graph RAG agent combines KG retrieval, KG-guided document retrieval, and vector search as fallback

## Entities Mentioned

- [[Alessandro Negro]] — co-author
- [[Giuseppe Futia]] — co-author
- [[Vlastimil Kůs]] — co-author
- [[Fabio Montagna]] — co-author
- [[Neo4j]] — graph database platform
- [[LangChain]] — framework for LLM orchestration
- [[LangGraph]] — state management for KG+LLM agents
- [[Streamlit]] — UI for knowledge graph applications
- [[PyTorch Geometric]] — GNN library
- [[NetworkX]] — graph analytics
- [[scispaCy]] — NLP for biomedical text
- [[UMLS]] — biomedical ontology
- [[SNOMED CT]] — clinical terminology
- [[Human Phenotype Ontology]] — medical ontology
- [[Hetionet]] — biomedical knowledge graph
- [[Clinical Knowledge Graph]] — clinical KG
- [[Rockefeller Archive Center]] — case study

## Concepts Covered

- [[Knowledge Graphs]] — RDF vs LPG distinction, business-first development
- [[Graph RAG]] — KG retrieval + KG-guided document retrieval + vector search fallback
- [[Text-to-Cypher]] — intent detection, query generation, error retry, result summarization
- [[Entity Resolution]] — LLM-assisted extraction with normalization and deduplication
- [[Named Entity Recognition]] — LLM-based entity extraction with prompt schemas
- [[Relation Extraction]] — structured extraction from unstructured text
- [[Metagraph]] — raw LLM mentions and relations layer
- [[Metapath]] — degree-weighted path count for domain-aware analytics
- [[Graph Neural Network]] — message passing for node classification and link prediction
- [[Provenance]] — source document/page attribution through metagraph layer

## Related Sources

- [[2026-04-29-graph-rag-survey]] — Graph RAG survey
- [[2026-09-12-building-knowledge-graphs-practitioners-guide]] — KG construction
