---
title: Gradient Clipping
type: concept
tags: [optimization, rnn, training-stability]
sources: [2026-04-16-deep-learning-with-pytorch-step-by-step]
created: 2026-04-16
updated: 2026-04-16
---

# Gradient Clipping

## Definition

Technique that bounds gradient magnitude (by value or norm) before optimizer updates to avoid unstable parameter jumps.

## Why It Matters

- Mitigates exploding-gradient behavior in deep or recurrent networks.
- Enables larger effective learning rates without catastrophic divergence.

## Related Concepts

- [[Autograd]]
- [[Learning Rate Scheduling]]
- [[Sequence-to-Sequence Learning]]
