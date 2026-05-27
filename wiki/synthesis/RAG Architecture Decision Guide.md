---
title: RAG Architecture Decision Guide
type: synthesis
tags: [rag, architecture, decision]
sources: [2026-04-12-14-types-of-rag, 2026-04-12-rag-driven-generative-ai, 2026-05-09-cache-augmented-generation]
created: 2026-04-12
updated: 2026-05-09
---

# RAG Architecture Decision Guide

Chooses the right retrieval-augmented generation (RAG) flavor by matching business constraints (latency, depth, safety) to the 14 patterns cataloged in [[2026-04-12-14-types-of-rag]] and the pipelines in [[2026-04-12-rag-driven-generative-ai]].

## Decision Factors

| Constraint | Questions to Ask | Recommended Variants |
| --- | --- | --- |
| Latency budget | Do responses need sub-second turnaround? | **Simple/Naïve RAG**, **Speculative RAG** with prefetch, lightweight [[Dynamic RAG Collections]] |
| Query ambiguity | Are user prompts sparse or multi-intent? | **Self-RAG**, **Branched RAG**, **Corrective RAG** |
| Context depth | Do you need relational reasoning or cross-document synthesis? | **[[Graph RAG]]**, **Agentic RAG**, **Modular RAG** |
| Modalities | Are images/video/audio part of the corpus? | **Multimodal RAG** pipelines (vector DBs + modality-specific encoders) |
| Governance & audit | Need explainability/traceability? | **Graph RAG** + [[Knowledge-Graph Indexing]] visualizations, **Advanced RAG** with evaluator loops |

## Architecture Cheat Sheet

| Variant | When to Use | Trade-offs |
| --- | --- | --- |
| Simple RAG | FAQs, deterministic flows, POCs | Fast but brittle when questions require context switching |
| Simple RAG + Memory | Conversational agents, personalization | Higher cost/storage + privacy considerations |
| Agentic RAG | Research workflows, legal/finance digests | More expensive + needs planning logic ([[Agent Components]]) |
| Graph RAG | Investigations, knowledge ops | Requires graph curation; slower lookups |
| Speculative RAG | Chat UX needing zero perceived latency | Can waste compute if next intents are mispredicted |
| Corrective/HyDE | Safety-critical, high-accuracy Q&A | Adds second pass; best paired with [[RAG Evaluation]] audits |
| Modular/Advanced | Enterprises with evolving tool stacks | Demands strong engineering ownership to orchestrate components |

## Implementation Tips

1. **Prototype with LangChain** – start with simple retriever chains, then swap components as you move toward the target variant ([[LangChain Mini RAG Pipeline]]).
2. **Instrument everything** – apply the [[RAG Evaluation Playbook]] metrics (retriever/generator/evaluator/HF) regardless of architecture.
3. **Hot-swap components** – keep embeddings, rerankers, and prompt templates versioned so you can move between Naïve ↔ Advanced RAG without rewriting the pipeline.
4. **Blend variants** – it’s common to start with Simple RAG serving a subset of intents and route ambiguous queries to Self/Agentic branches.

## Decision criterion: corpus size threshold (RAG vs CAG)

Per [[2026-05-09-cache-augmented-generation]] (Chan et al., WWW 2025), [[Cache-Augmented Generation]] is the right choice when the entire corpus fits in a [[Long Context Models|long-context model]]'s window:

| Corpus property | Choose RAG | Choose CAG | Choose hybrid |
|---|---|---|---|
| Size | exceeds context window | fits in context window (≤2M tokens) | mostly stable + tail dynamic |
| Stability | dynamic, frequent updates | stable, batch-rebuildable | mixed |
| Query volume | low to moderate | high (amortizes prefill cost) | high |
| Tenancy | multi-tenant, varied scopes | single-tenant or shared scope | mixed |
| Sensitivity to retrieval errors | acceptable | low (CAG eliminates them) | depends |

Hybrid: preload core docs into [[KV Cache]] (CAG); fall back to RAG for tail topics. This is increasingly the production default for medium-scale knowledge bases.

## Related pages

- [[Cache-Augmented Generation]] — paradigm-level alternative for bounded corpora
- [[KV Cache]] — substrate for CAG
- [[Long Context Models]] — enabling assumption
