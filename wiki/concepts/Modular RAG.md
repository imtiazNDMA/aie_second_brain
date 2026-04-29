---
title: Modular RAG
type: concept
tags: [rag, llm, architecture]
sources: [2026-04-29-rag-survey]
created: 2026-04-29
updated: 2026-04-29
---

# Modular RAG

## Definition
The most advanced RAG paradigm featuring enhanced adaptability through module substitution, reconfiguration, and integration of new functional components beyond the fixed "Retrieve-Read" structure.

## Key Innovations

### New Modules

1. **Search Module**:
   - Adapts to specific scenarios (search engines, databases, knowledge graphs)
   - Uses LLM-generated code and query languages
   - Example: LangChain's MultiQueryRetriever

2. **RAG-Fusion**:
   - Multi-query strategy with diverse perspectives
   - Parallel vector searches + intelligent reranking
   - Uncovers both explicit and implicit knowledge

3. **Memory Module**:
   - Leverages LLM's memory to guide retrieval
   - Creates unbounded memory pool
   - Aligns text closer to data distribution via self-enhancement

4. **Adapter Module**:
   - Tailors RAG to various downstream tasks
   - Automates prompt retrieval for zero-shot inputs
   - Creates task-specific retrievers via few-shot generation

### New Patterns

1. **Rewrite-Retrieve-Read**:
   - LLM refines retrieval queries
   - Uses LM-feedback mechanism to update rewriting model

2. **Generate-Read**:
   - Replaces traditional retrieval with LLM-generated content
   - Emphasizes model's internal knowledge

3. **Recite-Read**:
   - Retrieves from model weights
   - Enhances ability to handle knowledge-intensive tasks

4. **Hybrid Retrieval**:
   - Combines keyword, semantic, and vector searches
   - Uses sub-queries and hypothetical document embeddings (HyDE)

### Flexible Orchestration
- Module substitution/reconfiguration
- Adaptive retrieval (FLARE, Self-RAG)
- Iterative and recursive flows
- Integration with fine-tuning and RL

## Comparison with Earlier Paradigms

| Aspect | Naive RAG | Advanced RAG | Modular RAG |
|--------|------------|----------------|--------------|
| Structure | Fixed | Optimized | Flexible, modular |
| Retrieval | Once | Multi-stage | Adaptive, iterative |
| Modules | Basic | Enhanced | Specialized, swappable |
| Training | None | Limited | Integrated fine-tuning |

## Connections
- [[Retrieval-Augmented Generation]] — foundation
- [[Advanced RAG]] — predecessor paradigm
- [[Self-RAG]] — adaptive retrieval example
- [[Graph RAG]] — specialized module type
- [[RAG Evaluation]] — assessment methods

## Sources
- [[2026-04-29-rag-survey]]
