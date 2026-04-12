---
tags: [ai, agent, memory, context]
sources: [Building AI Coding Agents for the Terminal.pdf, AI Agents in Action.pdf, 2026-04-12-rag-driven-generative-ai]
created: 2026-04-12
updated: 2026-04-12
---

# Agent Memory

## Definition

The capability of AI agents to retain context across sessions and maintain stateful conversations. Enables agents to build on previous interactions, remember user preferences, and ground reasoning in external knowledge stores.

## Architectures

- **Short-term context** — Conversation history windows, scratchpads, and tool outputs passed back to the LLM.
- **Long-term knowledge** — RAG pipelines that chunk documents, embed them (OpenAI/HF), and store vectors in databases like [[Deep Lake]], [[Pinecone]], or [[Chroma]] for retrieval.
- **Semantic/Episodic/Procedural stores** — Nexus platform exposes specialized stores; semantic memory summarizes facts, episodic memory records session transcripts, procedural memory captures how-tos.
- **Compression** — Periodic k-means clustering or summarizers keep vector stores small while preserving coverage.

## Related Concepts

- [[AI Coding Agent]] — Context for memory capability
- [[Tool Use]] — Memory stores results of tool execution
- [[Retrieval-Augmented Generation]] — Primary technique for long-term knowledge
- [[Agent Components]] — Memory is one of the five pillars described in *AI Agents in Action*

- [[2026-04-12-building-ai-coding-agents-terminal]] — Primary source
- [[2026-04-12-ai-agents-in-action]] — Extends memory design to RAG, Nexus stores, and compression pipelines
- [[2026-04-12-rag-driven-generative-ai]] — Demonstrates multimodal stores, adaptive feedback, and dynamic collections
