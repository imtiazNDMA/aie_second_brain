---
tags: [attention, transformer, nlp]
sources: [2026-04-12-attention-is-all-you-need]
created: 2026-04-12
updated: 2026-04-12
---

# Self-Attention

## Definition

Mechanism that relates different positions within the same sequence to compute contextualized representations. Queries, keys, and values all originate from the same sequence, enabling each token to attend to every other token (or a masked subset) in constant sequential depth.

## Properties

- Reduces path length between distant tokens to O(1), improving long-range dependency modeling compared to RNN/CNN layers.
- Parallelizable across sequence positions, enabling efficient GPU utilization.
- Forms the basis of [[Transformer]] encoder layers and masked decoder layers.

## Variants

- **Bidirectional self-attention:** Used in encoders; each position attends to all positions.
- **Masked/causal self-attention:** Used in decoders to prevent access to future tokens.
- **Restricted/local self-attention:** Limits receptive field to neighborhood size *r* for long sequences.

## Related Concepts

- [[Attention Mechanism]]
- [[Multi-Head Attention]]
- [[Transformer]]
