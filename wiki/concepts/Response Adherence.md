---
title: Response Adherence
type: concept
tags: [rag, evaluation, metrics]
sources: [2026-04-29-vera, 2026-04-29-rag-survey]
created: 2026-04-29
updated: 2026-04-29
---

# Response Adherence

## Definition
A metric measuring the extent to which an LLM's response is grounded in and can be verified by the provided context (retrieved documents). Part of the VER A evaluation framework.

## Calculation
Given response $R$ split into atomic statements $S = \{s_1, s_2, ..., s_n\}$:

$$A_{\text{response}} = \frac{1}{n} \sum_{i=1}^{n} g(s_i)$$

where $g(s_i) = 1$ if statement is grounded/accurate, $0$ otherwise.

## Classification Levels
1. **Directly derivable**: Statement explicitly stated in context
2. **Logically inferable**: Statement can be reasoned from context
3. **Inaccurate**: Statement contradicts or lacks support in context

## Importance
- **Trustworthiness**: Users can verify claims against sources
- **Hallucination reduction**: Penalizes unsupported claims
- **Citation quality**: Encourages proper attribution

## Comparison with Related Metrics

| Metric | Focus | Calculation |
|--------|-------|-------------|
| Response Adherence | Grounding in context | Binary per statement |
| Response Relevance | Relevance to query | Binary per statement |
| Context Relevance | Relevance of retrieved docs | Ratio of useful context |

## VER A Improvements
- Mistral-7B: +18.7% adherence score
- GPT-4o: +6.5% adherence score

## Connections
- [[VERA]] — framework defining the metric
- [[Context Relevance]] — related metric
- [[Response Relevance]] — related metric
- [[FactScore]] — alternative adherence measure

## Sources
- [[2026-04-29-vera]]
