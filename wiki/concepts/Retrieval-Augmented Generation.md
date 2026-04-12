---
tags: [llm, retrieval, augmentation, rag]
sources: [Building LLMs for Production.pdf, AI Agents in Action.pdf, 2026-04-12-rag-driven-generative-ai, 2026-04-12-14-types-of-rag]
created: 2026-04-12
updated: 2026-04-12
---

# Retrieval-Augmented Generation

## Definition

A pattern for grounding LLM responses in external knowledge sources. RAG combines retrieval of relevant documents with language model generation, allowing LLMs to access up-to-date or domain-specific information beyond their training data.

## Implementation Notes

- Use LangChain or [[LlamaIndex]] loaders to read PDFs/markdown, then split content by tokens with overlap.
- Generate embeddings via OpenAI/Hugging Face or local models and store them in vector databases such as [[Deep Lake]], [[Pinecone]], or [[Chroma]].
- Query similarity search results (self-query, rerankers) at runtime and inject them into prompts as citations or context paragraphs.
- Combine with agent runtimes (Nexus, [[LangGraph]]) to expose knowledge stores directly to assistants.
- Apply [[Adaptive RAG]] loops where human/expert feedback tunes retrievers, prompts, and generators continuously.

## Architecture Variants

Per [[2026-04-12-14-types-of-rag]], teams can mix and match:

- **Simple/Naïve** – Single-pass retrieval for FAQs.
- **Memory/Branched** – Conversational context windows and multi-interpretation trees.
- **Agentic/Adaptive** – Planner-style systems that iterate until answers satisfy the goal.
- **[[Graph RAG]]** – Knowledge-graph traversals for relationship-heavy domains.
- **[[Self-RAG]] / Corrective / HyDE** – Self-reflective loops that rewrite queries or validate answers before showing them.
- **Speculative/Multimodal** – Prefetch likely follow-ups or blend text + images/video.
- **Modular/Advanced** – Swappable retrievers, rerankers, generators; layered reranking and critique stacks.

## Related Concepts

- [[Prompt Engineering]] — Using retrieved context in prompts
- [[Inference Optimization]] — Optimizing the retrieval + generation pipeline
- [[Data Pipeline]] — Infrastructure for managing knowledge bases

## Sources

- [[2026-04-12-building-llms-for-production]] — Covers RAG as foundational pattern for production LLM apps
- [[2026-04-12-ai-agents-in-action]] — Adds LangChain loaders, [[Chroma]] storage, and Nexus knowledge integration
- [[2026-04-12-rag-driven-generative-ai]] — Provides end-to-end pipelines with Deep Lake, [[Pinecone]], [[Chroma]], adaptive feedback, and domain case studies
- [[2026-04-12-14-types-of-rag]] — Taxonomy of 14 architectures plus tooling recommendations

## Open Questions

- How to measure retrieval quality vs generation quality?
- What are optimal chunking strategies for different knowledge bases?
