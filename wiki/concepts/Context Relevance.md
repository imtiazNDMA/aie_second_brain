---
title: Context Relevance
type: concept
tags: [rag, evaluation, retrieval]
sources: [2026-04-29-vera, 2026-04-29-rag-survey]
created: 2026-04-29
updated: 2026-04-29
---

# Context Relevance

## Definition
A metric measuring the amount of information in retrieved context that is pertinent to answering the given query. Part of the VER A evaluation framework.

## Calculation
Given original context $C$ and edited context $C'$ (after removing redundant information):

$$R_{\text{retrieval}} = \frac{|C'|}{|C|}$$

- $R = 0$: Retrieved context provides no useful information
- $R = 1$: All retrieved context is relevant

## Optimization Strategies
1. **Reranking**: Reorder chunks to prioritize relevant content
2. **Compression**: Remove redundant/irrelevant passages
3. **Metadata filtering**: Use keywords and metadata to narrow scope
4. **Hybrid retrieval**: Combine sparse and dense methods

## Impact on Downstream Performance
High context relevance leads to:
- Better response adherence
- Reduced hallucinations
- More accurate answers

## VER A Results
- Mistral-7B + VER A: +17.9% context relevance
- GPT-4o + VER A: Consistent improvements across tasks

## Connections
- [[VERA]] — framework defining the metric
- [[Response Adherence]] — related metric
- [[Response Relevance]] — related metric
- [[Reranking]] — improves relevance
- [[Retrieval-Augmented Generation]] — context used here

## Sources
- [[2026-04-29-vera]]
