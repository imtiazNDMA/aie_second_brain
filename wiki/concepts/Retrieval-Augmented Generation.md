---
tags: [llm, retrieval, augmentation, rag]
sources: [Building LLMs for Production.pdf, AI Agents in Action.pdf, 2026-04-12-rag-driven-generative-ai, 2026-04-12-14-types-of-rag, 2026-04-29-llmops-managing-large-language-models-in-production]
created: 2026-04-12
updated: 2026-04-29
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

## RAG Paradigm Evolution
From [[RAG Survey for Large Language Models]]:

### 1. Naive RAG
**Components**: Indexing → Retrieval → Generation ("Retrieve-Read")
**Limitations**:
- Retrieval: Poor precision/recall, missing crucial info
- Generation: Hallucinations, irrelevance, toxicity
- Augmentation: Redundancy, disjointed outputs

### 2. Advanced RAG
**Pre-retrieval optimizations**:
- Query rewriting, expansion, step-back prompting
- Indexing: Sliding window, metadata enhancement

**Post-retrieval optimizations**:
- Reranking (Cohere, bge-reranker)
- Context compression (LLMLingua, PRCA, RECOMP)

### 3. Modular RAG
**New modules**:
- **Search Module**: Adapts to search engines, databases, KGs (LangChain's MultiQueryRetriever)
- **RAG-Fusion**: Multi-query with parallel searches
- **Memory Module**: Unbounded memory pool from LLM outputs
- **Adapter Module**: Task-specific prompt retrieval

**New patterns**:
- Rewrite-Retrieve-Read, Generate-Read, Recite-Read
- Hybrid retrieval (keyword + semantic + vector)

## Architecture Variants
Per [[2026-04-12-14-types-of-rag]] and surveys:
- **Simple/Naïve** – Single-pass retrieval for FAQs.
- **Memory/Branched** – Conversational context windows and multi-interpretation trees.
- **Agentic/Adaptive** – Planner-style systems that iterate until answers satisfy the goal (see [[Adaptive Retrieval]]).
- **[[Graph RAG]]** – Knowledge-graph traversals for relationship-heavy domains (see [[Graph RAG Survey]]).
- **[[Self-RAG]]** – Self-reflective loops with [[Reflection Tokens]] that rewrite queries or validate answers (see [[Self-RAG Paper]]).
- **Corrective RAG / HyDE** – Validation loops before showing answers.
- **Speculative/Multimodal** – Prefetch likely follow-ups or blend text + images/video.
- **Modular/Advanced** – Swappable retrievers, rerankers, generators; layered reranking and critique stacks (see [[Modular RAG]]).

## Specialized RAG Systems
- **[[VERA]]**: Validation and Enhancement system with [[Response Adherence]], [[Context Relevance]], [[Response Relevance]] metrics
- **RAG-Fusion**: Multiple query perspectives with intelligent reranking
- **HyDE**: Hypothetical document embeddings for improved retrieval
- **FLARE**: Adaptive retrieval with uncertainty estimation

## LLMOps Considerations

From [[LLMOps]]:
- RAG is a critical technique for reducing hallucinations and improving factual accuracy in LLM applications
- Data engineering for RAG involves specialized pipelines for data preprocessing, vectorization, and maintaining fresh data
- Evaluation of RAG systems requires specialized metrics beyond traditional ML metrics
- RAG pipelines benefit from observability and monitoring to track retrieval quality and relevance
- Knowledge freshness and maintenance are ongoing operational concerns in RAG systems
- Hybrid and adaptive RAG approaches can improve performance over static implementations

## Related Concepts

- [[Prompt Engineering]] — Using retrieved context in prompts
- [[Inference Optimization]] — Optimizing the retrieval + generation pipeline
- [[Data Pipeline]] — Infrastructure for managing knowledge bases
- [[LLMOps]] — Operational framework for managing RAG systems in production
- [[Embeddings]] — Core technology enabling semantic retrieval
- [[Reranking]] — Two-stage retrieval process for improved precision
- [[LLMSecOps]] — Security considerations for RAG systems (data poisoning, prompt injection via retrieved content)

## Sources

- [[2026-04-12-building-llms-for-production]] — Covers RAG as foundational pattern for production LLM apps
- [[2026-04-12-ai-agents-in-action]] — Adds LangChain loaders, [[Chroma]] storage, and Nexus knowledge integration
- [[2026-04-12-rag-driven-generative-ai]] — Provides end-to-end pipelines with Deep Lake, [[Pinecone]], [[Chroma]], adaptive feedback, and domain case studies
- [[2026-04-12-14-types-of-rag]] — Taxonomy of 14 architectures plus tooling recommendations
- [[2026-04-29-llmops-managing-large-language-models-in-production]] — Covers RAG in context of data engineering and evaluation for production LLMs

## Open Questions

- How to measure retrieval quality vs generation quality?
- What are optimal chunking strategies for different knowledge bases?
- How to balance retrieval latency with generation quality in production systems?
