---
title: Reflection Tokens
type: concept
tags: [rag, llm, self-reflection]
sources: [2026-04-29-self-rag]
created: 2026-04-29
updated: 2026-04-29
---

# Reflection Tokens

## Definition
Special tokens inserted into the vocabulary of a language model that signal self-assessment of retrieval necessity, relevance, support, and utility during generation. Introduced in Self-RAG.

## Token Types

### 1. Retrieve Tokens
Signal whether retrieval is needed:
- `yes` — retrieve documents
- `no` — generate without retrieval
- `continue` — continue current retrieval process

### 2. ISREL (Is Relevant)
Evaluates retrieved passage relevance:
- `relevant` — passage provides useful information
- `irrelevant` — passage doesn't help answer the query

### 3. ISSUP (Is Supported)
Assesses if generation is supported by passage:
- `fully supported` — all claims backed by evidence
- `partially supported` — some claims lack support
- `no support` — claims contradict or lack evidence

### 4. ISUSE (Is Useful)
Rates overall utility of response (1-5 scale):
- `5` — highly useful response
- `1` — not useful

## Training Process
1. **Critic Model**: GPT-4 generates reflection tokens for training data
2. **Distillation**: Train smaller model to predict these tokens
3. **End-to-End**: Generator learns to produce both text and reflection tokens

## Inference Customization
Adjust weights to prioritize different aspects:
- High `ISSUP` weight → ensure citation accuracy
- High `ISREL` weight → prioritize relevant context
- High `ISUSE` weight → maximize overall utility

## Benefits
- **Controllability**: Modify behavior without retraining
- **Transparency**: Explicit self-assessment
- **Quality**: Better citation accuracy and factuality

## Connections
- [[Self-RAG]] — framework using these tokens
- [[Adaptive Retrieval]] — application context
- [[Self-Attention]] — mechanism for token generation

## Sources
- [[2026-04-29-self-rag]]
