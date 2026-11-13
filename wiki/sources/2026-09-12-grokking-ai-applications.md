---
tags: [source, book, ai-applications, rag, agents, langflow]
sources: ["Grokking AI Applications.pdf"]
created: 2026-09-12
updated: 2026-09-12
---

# Grokking AI Applications: An Illustrated Guide for Programmers and Other Curious People

**Source:** Grokking AI Applications -- Andrea De Mauro -- 1, 2026 -- Manning Publications -- isbn13 978-1-63343-587-2
**Date ingested:** 2026-09-12
**Type:** book

## Summary

Illustrated, design-first technical guide covering AI application engineering from prompt design through RAG, agents, integration with KNIME data pipelines, and observability. Central thesis: AI application engineering is primarily systems engineering around an LLM — adding state, retrieval, tools, workflows, and observation.

## Key Claims

- AI application engineering is primarily systems engineering around an LLM
- Prompt design is an application primitive — Role/Task/Features/Examples template as composable workflow component
- RAG consists of distinct ingestion and runtime stages; chunking, overlap, metadata materially affect quality
- Agents combine probabilistic planning with deterministic capabilities; narrow, well-described toolsets preferred
- Production value comes from integration, reuse, and observation
- Langflow's LLM flows connect to KNIME data pipelines; flows exposed through APIs and MCP

## Entities Mentioned

- [[Andrea De Mauro]] — author
- [[LangChain]] — LLM orchestration framework
- [[ChromaDB]] — vector database
- [[Faiss]] — vector similarity search
- [[FastAPI]] — API framework
- [[Hugging Face Hub]] — model hosting
- [[LangSmith]] — LLM observability
- [[Langfuse]] — LLM observability
- [[LangWatch]] — LLM observability
- [[Composio]] — tool integration
- [[SerpApi]] — search API
- [[KNIME]] — data pipeline platform

## Concepts Covered

- [[Prompt Engineering]] — Role/Task/Features/Examples template, composable workflow components
- [[Retrieval-Augmented Generation]] — distinct ingestion and runtime stages, chunking strategies
- [[Agent Components]] — tools, tool descriptions, tool-calling loop
- [[Multi-Agent Systems]] — sequential, hierarchical, supervisor agent structures
- [[Model Context Protocol]] — MCP for tool reuse and API integration
- [[Observability]] — traces exposing tool ordering, latency, token use, failures
- [[Embeddings]] — semantic search foundation for RAG
- [[Query Rewriting]] — improving retrieval quality through query transformation
- [[HyDE]] — hypothetical document embedding for retrieval enhancement
