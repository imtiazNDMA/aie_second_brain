---
title: Response Relevance
type: concept
tags: [rag, evaluation, metrics]
sources: [2026-04-29-vera, 2026-04-29-rag-survey]
created: 2026-04-29
updated: 2026-04-29
---

# Response Relevance

## Definition
A metric measuring the amount of information in an LLM's response that is relevant to helping answer the given query. Part of the VER A evaluation framework.

## Calculation
Given response $R$ split into atomic statements $S = \{s_1, s_2, ..., s_n\}$:

$$R_{\text{response}} = \frac{1}{n} \sum_{i=1}^{n} r(s_i)$$

where $r(s_i) = 1$ if statement is relevant to query, $0$ otherwise.

## Optimization Strategies
1. **Query rewriting**: Clarify ambiguous queries
2. **Context curation**: Select most relevant retrieved passages
3. **Response filtering**: Remove irrelevant statements (VER A approach)
4. **Few-shot examples**: Guide model to stay on-topic

## Relationship to Other Metrics
- **Response Adherence**: Are claims grounded in context?
- **Context Relevance**: Is retrieved context pertinent?
- **Response Relevance**: Is response helpful for the query?

All three must be high for optimal RAG performance.

## VER A Improvements
- Mistral-7B: Significant gains in relevance scores
- GPT-4o: Near-perfect relevance (>0.95)

## Connections
- [[VERA]] — framework defining the metric
- [[Response Adherence]] — related metric
- [[Context Relevance]] — related metric
- [[Prompt Engineering]] — can improve relevance

## Sources
- [[2026-04-29-vera]]
