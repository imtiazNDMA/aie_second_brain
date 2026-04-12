---
title: Positional Encoding
type: concept
tags: [deep-learning, transformer, nlp]
sources: [2026-04-12-build-llm-from-scratch, 2026-04-12-attention-is-all-you-need]
created: 2026-04-12
updated: 2026-04-12
---

# Positional Encoding

Injects sequence position information into token embeddings since attention has no inherent order understanding.

## Methods

- **Sinusoidal:** Fixed embeddings using sin/cos at different frequencies ([[Transformer]] uses wavelengths forming a geometric progression, enabling extrapolation to longer sequences).
- **Learned:** Trainable position embeddings added to token embeddings during training.
- **RoPE (Rotary Position Embedding):** Applies rotations in query/key space — used in LLaMA, Mistral.
- **Absolute vs Relative encodings:** Later [[Transformer]] variants incorporate relative positions to improve generalization.

## Related Concepts

- [[Transformer]]
- [[Attention Mechanism]]
