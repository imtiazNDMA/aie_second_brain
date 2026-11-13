---
tags: [source, book, digital-twin, iot, knowledge-graphs]
sources: ["Digital Twins in Action.pdf"]
created: 2026-09-12
updated: 2026-09-12
---

# Digital Twins in Action

**Source:** Digital Twins in Action -- Greg Biegel -- 1, 2026 aug 25 -- Manning Publications Co_ LLC -- isbn13 9781633434653
**Date ingested:** 2026-09-12
**Type:** book

## Summary

Hands-on practitioner guide to building digital twins with AWS services. Covers the full lifecycle from data ingestion (OCR, computer vision, sensor streams) through knowledge-graph-backed semantic modeling, visualization, and simulation. Central thesis: digital twins are defined by bidirectional data synchronization, not visual fidelity.

## Key Claims

- Digital twin defined as bidirectional data flow between physical and virtual systems; digital model (static), digital shadow (one-way), digital twin (bidirectional)
- Five maturity levels: Descriptive → Informative → Predictive → Comprehensive → Autonomous
- Knowledge graphs are the semantic backbone enabling context-aware queries without knowing sensor IDs
- Data integration is the hardest challenge: fragmented data in PDFs, photos, videos, legacy systems
- Simulation is distinct from digital twins; continuous synchronization is the differentiator
- Asset Administration Shell (AAS) provides Industry 4.0 standard for digital asset representation

## Entities Mentioned

- [[Greg Biegel]] — author, AWS Solution Architect
- [[Amazon DynamoDB]] — used for time-series storage
- [[Apache Kafka]] — streaming ingestion
- [[Streamlit]] — visualization dashboards
- [[Neo4j]] — knowledge graph storage (Memgraph used in examples)
- [[OpenModelica]] — acausal modeling language for simulation
- [[OPC UA]] — industrial communication protocol for sensor data

## Concepts Covered

- [[Knowledge Graphs]] — semantic backbone for digital twins, RealEstateCore ontology
- [[Digital Twin]] — bidirectional data synchronization with physical systems
- [[Asset Administration Shell]] — Industry 4.0 standard for digital asset representation
- [[Data Pipeline]] — sensor/time-series data ingestion and processing
- [[GraphQL Schema]] — API pattern for serving twin data
- [[Reduced-Order Models]] — lightweight simulation technique
- [[Functional Mock-up Interface]] — standard for exchanging simulation models
- [[Data Engineering for AI]] — sensor/time-series data complementing feature-store focus
