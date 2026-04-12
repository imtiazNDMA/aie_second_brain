---
tags: [rag, reflection, evaluation]
sources: [2026-04-12-14-types-of-rag]
created: 2026-04-12
updated: 2026-04-12
---

# Self-RAG

## Definition

Self-reflective retrieval-augmented generation technique where the model rewrites queries, critiques its own answers, and iterates until the response is well supported by sources.

## Workflow

1. Generate an initial answer from retrieved context.
2. Use evaluator modules to rate accuracy/support.
3. Rewrite the query (adding missing details inferred from conversation history) and rerun retrieval if needed.
4. Produce a final answer only when confidence passes a threshold.

## Benefits & Costs

- **Pros:** Handles vague inputs, catches mistakes before users see them, increases reliability for high-stakes workloads.
- **Cons:** Higher latency and compute cost; may become overly cautious or refuse answers when uncertain.

## Related Concepts

- [[Adaptive RAG]]
- [[RAG Evaluation]]
