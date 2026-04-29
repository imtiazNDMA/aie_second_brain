---
title: Teacher Forcing
type: concept
tags: [seq2seq, training, sequence-modeling]
sources: [2026-04-16-deep-learning-with-pytorch-step-by-step]
created: 2026-04-16
updated: 2026-04-16
---

# Teacher Forcing

## Definition

Training strategy for autoregressive decoders where ground-truth previous tokens are fed as inputs instead of the model's own predictions.

## Why It Matters

- Speeds convergence and stabilizes early seq2seq training.
- Introduces train/inference mismatch that must be managed in evaluation.

## Related Concepts

- [[Sequence-to-Sequence Learning]]
- [[Attention Mechanism]]
- [[Transformer]]
