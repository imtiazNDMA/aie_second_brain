---
tags: [attention, transformer, nlp]
sources: [2026-04-12-attention-is-all-you-need]
created: 2026-04-12
updated: 2026-04-12
---

# Multi-Head Attention

## Definition

Extension of scaled dot-product attention where queries, keys, and values are linearly projected into multiple subspaces (“heads”). Each head performs attention independently; their outputs are concatenated and projected back to the model dimension.

## Benefits

- Allows the model to capture relationships from different representation subspaces simultaneously.
- Mitigates averaging effects of single-head attention by letting heads focus on distinct positions or features.
- Keeps computation comparable to single-head attention by reducing per-head dimensionality (e.g., d_model/h).

## Usage

- Encoder [[Self-Attention]], decoder self-attention, and encoder-decoder cross-attention each use multi-head layers.
- Masking can be applied per head to enforce causality in decoders.

## Related Concepts

- [[Scaled Dot-Product Attention]]
- [[Self-Attention]]
- [[Transformer]]
