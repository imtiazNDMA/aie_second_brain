---
title: Rotary Position Embeddings
type: concept
tags: [transformer, positional-encoding]
sources: [2026-04-12-build-llm-from-scratch]
created: 2026-04-13
updated: 2026-04-13
---

# Rotary Position Embeddings

## Definition

Rotary Position Embeddings (RoPE) encode token positions by applying complex-valued rotations directly to query/key vectors before attention. Instead of adding sinusoidal vectors, RoPE multiplies each Q/K pair by rotation matrices derived from base frequencies so the relative angle between tokens carries positional information.

## Mechanics

- Split each head dimension into 2D pairs $(x_{2i}, x_{2i+1})$.
- Rotate the pair by angle $\theta_i * p$ where $p$ is the token index and $\theta_i$ is frequency $10000^{-2i/d}$.
- Apply the same rotation to queries and keys so their dot products implicitly encode relative offsets; longer contexts extrapolate smoothly because rotations compose linearly.

## Benefits

- Relative positioning: attention depends on positional differences, improving generalization to sequences longer than training windows.
- Efficient extrapolation: no need to learn extra parameters—frequencies are deterministic like classic sinusoids.
- Compatible with GPT-NeoX/LLama-style decoders and grouped-query attention.

## Related Concepts

- [[Positional Encoding]]
- [[Transformer]]
- [[Grouped-Query Attention]]
