---
title: HyDE (Hypothetical Document Embeddings)
type: concept
tags: [rag, query-rewriting, embeddings]
sources: [2026-04-12-14-types-of-rag]
created: 2026-04-13
updated: 2026-04-13
---

# HyDE (Hypothetical Document Embeddings)

## Definition

HyDE augments retrieval by asking an LLM to draft a “hypothetical” answer or document for the user query, embedding that synthetic text, and using it to search the corpus. The imagined document acts as a semantic proxy that pulls in passages aligned with the desired answer—even when the original query lacks the right vocabulary.

## Workflow

1. Generate a short hypothetical response using the base model.
2. Embed the hypothetical response and use it as the retriever query (alone or alongside the user query embedding).
3. Retrieve real documents whose embeddings are closest to the hypothetical vector.
4. Feed the retrieved passages plus the original question back into the generator for the final grounded answer.

## Benefits & Trade-offs

- Improves recall on underspecified or domain-mismatched prompts.
- Adds latency and cost because each question triggers an extra generation + embedding pass.
- Requires guardrails to ensure the hypothetical document does not insert biases that override the user’s true intent.

## Related Concepts

- [[Corrective RAG]]
- [[Adaptive RAG]]
- [[Retrieval-Augmented Generation]]
