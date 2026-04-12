---
title: Pretraining
type: concept
tags: [training, llm, foundation-model]
sources: [2026-04-12-build-llm-from-scratch]
created: 2026-04-12
updated: 2026-04-12
---

# Pretraining

Training a language model on large text corpora to learn general language representations before any specific task.

## Objectives

- **Next Token Prediction:** Given preceding tokens, predict next token
- **Masked Language Modeling (MLM):** Predict masked tokens (BERT-style)

## Scale

Modern LLMs pretrain on trillions of tokens. Scale of data and compute drives capabilities.

## Related Concepts

- [[Transformer]]
- [[Fine-Tuning]]
- [[RLHF]]