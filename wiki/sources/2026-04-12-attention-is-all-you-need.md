---
title: Attention Is All You Need
type: source
tags: [transformer, attention, nlp]
sources: [attention-is-all-you-need.pdf]
created: 2026-04-12
updated: 2026-04-12
---

# Attention Is All You Need

**Authors:** Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin  
**Venue:** NeurIPS 2017  
**Date ingested:** 2026-04-12  
**Type:** research paper

## Summary

Introduces the [[Transformer]], the first sequence-to-sequence architecture built entirely on attention rather than recurrence or convolutions. The paper defines scaled dot-product attention, multi-head attention, position-wise feed-forward networks, residual + layer-norm stacks, and sinusoidal positional encodings. Experiments on WMT14 English→German and English→French show higher BLEU with dramatically lower training time (12 hours on 8×P100 GPUs) compared to state-of-the-art RNN/CNN models, establishing attention-only models as the new baseline for translation and, by extension, modern LLMs.

## Key Claims

- [[Self-Attention]] layers can replace recurrent/convolutional stacks while reducing sequential operations to O(1) and improving path lengths between tokens.
- Scaled dot-product attention avoids gradient saturation for large key dimensions, and multi-head attention lets the model capture information from multiple subspaces simultaneously.
- Positional encodings (sin/cos) enable order awareness without recurrence and allow extrapolation beyond training lengths.
- [[Transformer]] models achieve 28.4 BLEU on WMT14 En→De and 41.0 BLEU on En→Fr with fewer resources than prior systems.
- Reduced computation plus superior accuracy makes attention-only architectures preferable for large-scale sequence modeling.

## Structure

- **Abstract & Introduction:** Motivates replacing RNN/CNN seq2seq models with attention-only [[Transformer]] architecture.
- **Background:** Reviews prior efforts (Extended Neural GPU, ByteNet, ConvS2S) and sets design desiderata.
- **Model Architecture:** Details encoder/decoder stacks, residual connections, and position-wise feed-forward layers.
- **Attention:** Defines scaled dot-product attention, multi-head extensions, encoder-decoder/cross/[[Self-Attention]] roles, and masking for autoregression.
- **[[Positional Encoding]]:** Presents sinusoidal encoding scheme and rationale for extrapolation.
- **Why [[Self-Attention]]:** Compares complexity, parallelism, and path length against recurrent/convolutional layers.
- **Training:** Describes optimizer (Adam), learning-rate schedule with warmup, label smoothing, dropout, and hyperparameters.
- **Results:** Reports BLEU scores, speedups, and ablations (number of heads, layer depth, positional embeddings).
- **Conclusion & Future Work:** Highlights broader applicability and outlines potential restrictions (localized attention) for long sequences.

## Entities Mentioned

- [[Transformer]] — Architecture introduced in the paper.
- Google Brain/Research authors (Ashish Vaswani et al.) — architects of the [[Transformer]] (see paper for attribution).

## Concepts Covered

- [[Attention Mechanism]] — Formalized as scaled dot-product attention.
- [[Self-Attention]] — Core mechanism for encoder/decoder layers.
- [[Multi-Head Attention]] — Parallel attention heads capturing multiple subspaces.
- [[Scaled Dot-Product Attention]] — Defines Q/K/V computation and scaling factor.
- [[Transformer]] — Encoder-decoder stack using attention only.
- [[Positional Encoding]] — Sinusoidal scheme for injecting order.
