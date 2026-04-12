---
title: Agent Memory Architectures
type: synthesis
tags: [agents, memory, rag]
sources: [2026-04-12-ai-agents-in-action, 2026-04-12-building-agentic-ai-systems, 2026-04-12-rag-driven-generative-ai]
created: 2026-04-12
updated: 2026-04-12
---

# [[Agent Memory]] Architectures

Agents described across *Building Agentic AI Systems*, *AI Agents in Action*, and *RAG-Driven Generative AI* share a common blueprint: combine fast conversational context, durable knowledge stores, and retrieval/evaluation layers so assistants stay grounded.

## Memory Layers

| Layer | Description | Typical Tech | Sources |
| --- | --- | --- | --- |
| **Short-term / Working** | Conversation windows, scratchpads, tool outputs fed back into prompts | LLM chat history, [[Prompt Flow]] variables | [[2026-04-12-ai-agents-in-action]] |
| **Semantic (facts)** | Summaries of user/company knowledge for quick lookup | Vector DBs (Deep Lake, Pinecone, [[Chroma]]), Nexus semantic store | [[2026-04-12-rag-driven-generative-ai]], [[Agent Memory]] |
| **Episodic** | Session transcripts for personalization and auditing | Nexus episodic logs, document stores | [[2026-04-12-ai-agents-in-action]] |
| **Procedural** | Instructions for tool invocation, workflows, approvals | Nexus procedural memory, LangGraph node state | [[2026-04-12-building-agentic-ai-systems]] |
| **Dynamic Collections** | Time-bound embeddings spun up for meetings/projects | Chroma temp collections, LangChain in-memory stores | [[Dynamic RAG Collections]] |

## Retrieval Patterns

- **RAG backbone:** Chunk + embed reference materials into Deep Lake/Pinecone per [[2026-04-12-rag-driven-generative-ai]]; link to agents via [[Adaptive RAG]] loops to refresh low-scoring chunks.
- **Graph context:** When relationships matter (investigations, BI), build [[Graph RAG]] indices to traverse entity links before answering.
- **Memory-aware planning:** In coordinator/worker architectures, central planners access shared stores while workers keep task-specific caches.

## Best Practices

1. **Version memories** — Tag embeddings and summaries with timestamps + source IDs to avoid stale answers.
2. **Compress proactively** — Use k-means clustering or summarization (per [[Agent Memory]]) to keep vector stores lean without losing coverage.
3. **Permission boundaries** — Restrict which agents write to which stores (e.g., critics append notes, workers cannot overwrite policies).
4. **Observability hooks** — Log reads/writes via Nexus managers or AgentOps so trust/safety reviews can trace decisions.

## Reference Architectures

- **Nexus Agent Platform** bundles semantic/episodic/procedural stores with Streamlit UI, making it a turnkey option for app-focused teams.
- **LangGraph + RAG**: Build deterministic flows (e.g., plan → retrieve → critique) where each node reads from short-term context and long-term RAG stores.
