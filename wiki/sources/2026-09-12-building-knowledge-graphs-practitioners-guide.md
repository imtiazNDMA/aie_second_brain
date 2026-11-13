---
tags: [source, book, knowledge-graphs, neo4j, cypher]
sources: ["Building Knowledge Graphs - A Practitioner's Guide.pdf"]
created: 2026-09-12
updated: 2026-09-12
---

# Building Knowledge Graphs: A Practitioner's Guide

**Source:** Building Knowledge Graphs- A Practitioner's Guide -- Jesus Barrasa, Jim Webber -- 1, 2023 -- O'Reilly Media, Incorporated -- isbn13 9781098127114
**Date ingested:** 2026-09-12
**Type:** book

## Summary

Neo4j-focused practitioner guide covering knowledge graph construction, entity resolution, data quality, vector search, and LLM+KG integration. Central thesis: small, purpose-built KGs with evolving schemas deliver more practical value than large-scale single-ontology KGs. 35 Cypher listings, zero SPARQL.

## Key Claims

- Small, purpose-built KGs beat monolithic ontologies; schema flexibility is a feature
- Entity resolution on graphs follows a 6-step pattern: filtering → blocking → similarity scoring → correcting factor → threshold pruning → merge
- Data quality rules are graph patterns expressed in Cypher constraints and validation queries
- Vector index on Neo4j achieves 10ms semantic search vs 1.38s brute-force cosine similarity on 13k nodes
- LLM + KG integration is a 7-step grounding pipeline; KGs serve as answer validation layer catching hallucinated claims

## Entities Mentioned

- [[Neo4j]] — primary graph database platform
- [[Cypher]] — query language used throughout
- [[spaCy]] — NLP preprocessing for KG construction
- [[WordNet]] — lexical database for semantic similarity
- [[Apache Hop]] — ETL tool for KG integration
- [[Jim Webber]] — co-author, Neo4j
- [[Jesus Barrasa]] — co-author, Neo4j

## Concepts Covered

- [[Knowledge Graphs]] — purpose-built KGs with evolving schemas, LPG model
- [[Entity Resolution]] — 6-step graph-native pattern with blocking and similarity scoring
- [[Data Quality Rules as Graph Patterns]] — constraint-based and query-based validation
- [[Semantic Search]] — Neo4j vector index, cosine similarity, salience-weighted document similarity
- [[Graph RAG]] — 7-step LLM+KG grounding pipeline with text-to-Cypher
- [[Knowledge Lakes]] — FlockDB pattern, open network of graphs
- [[Neo4j Graph Data Science]] — projections, algorithm catalog, ML pipelines
- [[Cypher Query Language]] — MATCH, MERGE, WHERE, OPTIONAL MATCH patterns
- [[Dependency Modeling]] — qualified, redundant, recursive, temporal dependencies
- [[Graph Algorithms]] — PageRank, Louvain, node similarity, WCC in GDS context
