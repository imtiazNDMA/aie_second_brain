---
title: Adaptive Retrieval
type: concept
tags: [rag, llm, retrieval]
sources: [2026-04-29-self-rag, 2026-04-29-rag-survey]
created: 2026-04-29
updated: 2026-04-29
---

# Adaptive Retrieval

## Definition
A retrieval strategy that enables RAG systems to autonomously determine when external knowledge retrieval is necessary and when to stop retrieval/generation, often using LLM-generated special tokens or text signals.

## Key Approaches

### Self-RAG Approach
Uses reflection tokens to control retrieval:

1. **Retrieve Token**: Model decides `yes`/`no`/`continue` for retrieval
2. **ISREL Token**: Evaluates if retrieved passage is relevant
3. **ISSUP Token**: Checks if output is supported by passage
4. **ISUSE Token**: Rates overall utility (1-5 scale)

The model generates these tokens interleaved with text, enabling self-reflection.

### FLARE Approach
- Predicts when retrieval is needed based on uncertainty
- Dynamically retrieves during generation
- Stops when confidence is high enough

### Token-Based Control
Models generate special tokens like `[RETRIEVE]`, `[END]` to signal retrieval actions (ToG, ToC).

## Benefits
- **Efficiency**: Skip retrieval for simple queries the model can answer directly
- **Quality**: Retrieve only when beneficial
- **Flexibility**: Adjust retrieval frequency via thresholds
- **Controllability**: Customize behavior at inference time

## Inference-Time Customization
Adjust weights for different reflection token types:
$$\text{Score} = w_{\text{ISREL}} \cdot p(\text{relevant}) + w_{\text{ISSUP}} \cdot p(\text{supported}) + w_{\text{ISUSE}} \cdot p(\text{useful})$$

## Connections
- [[Self-RAG]] — primary implementation
- [[Retrieval-Augmented Generation]] — context
- [[Reflection Tokens]] — mechanism used
- [[Iterative Retrieval]] — related strategy

## Sources
- [[2026-04-29-self-rag]]
- [[2026-04-29-rag-survey]]
