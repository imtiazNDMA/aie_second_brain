---
tags: [rag, feedback, evaluation]
sources: [2026-04-12-rag-driven-generative-ai]
created: 2026-04-12
updated: 2026-04-12
---

# Adaptive RAG

## Definition

Retrieval-augmented generation pipelines that loop human/expert feedback into retriever, generator, and evaluator components to continually improve relevance and factuality.

## Mechanisms

- Collect judges’ ratings on context relevance, answer quality, and latency.
- Use ratings to adjust chunking, rerankers, prompt templates, or even fine-tune models (GPT-4o-mini, custom LLMs).

## Related Concepts

- [[Retrieval-Augmented Generation]]
- [[Agent Memory]]
- [[RAG Evaluation]]
