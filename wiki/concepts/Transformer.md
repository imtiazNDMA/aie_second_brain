---
title: Transformer
type: concept
tags: [deep-learning, architecture, nlp]
sources: [2026-04-12-build-llm-from-scratch, 2026-04-12-attention-is-all-you-need]
created: 2026-04-12
updated: 2026-04-12
---

# Transformer

Deep learning architecture relying entirely on attention mechanisms — no recurrence or convolution. Introduced in "Attention Is All You Need" (2017).

## Architecture

- **Encoder:** Stack of [[Self-Attention]] + feed-forward blocks with residual connections and layer norm.
- **Decoder:** [[Self-Attention]] (masked) plus encoder-decoder attention, followed by feed-forward blocks.
- **Multi-Head Attention:** Parallel scaled dot-product heads capture different subspaces.
- **Feed-Forward Networks:** Position-wise MLPs applied to each token independently.
- **Residual Connections & Layer Norm:** Applied around each sub-layer to stabilize training.
- **Positional Encodings:** Sinusoidal or learned signals added to embeddings for order awareness.

## Variants

- **Encoder-only (BERT):** Masked language modeling [[Pretraining]]
- **Decoder-only (GPT):** Autoregressive next-token prediction
- **Encoder-Decoder (T5, BART):** Seq2seq tasks

## Related Concepts

- [[Attention Mechanism]]
- [[Self-Attention]]
- [[Multi-Head Attention]]
- [[Scaled Dot-Product Attention]]
- [[Positional Encoding]]
- [[Pretraining]]
- [[Fine-Tuning]]
