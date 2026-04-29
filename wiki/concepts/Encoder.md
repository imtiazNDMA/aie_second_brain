---
title: Encoder
type: concept
tags: [transformer, deep-learning, representation]
sources: [nips-2017-attention-is-all-you-need-Paper.md, 2026-04-29-hands-on-llms.md]
created: 2026-04-29
updated: 2026-04-29
---

# Encoder

A component of sequence-to-sequence architectures that processes input sequences into continuous representations, capturing semantic meaning in a format usable by a decoder.

## Definition

In the Transformer architecture, the encoder consists of a stack of identical layers, each with multi-head self-attention and feed-forward networks. It transforms an input sequence of embeddings into a sequence of continuous representations.

## Key Concepts

- **Encoder Stack**: Typically 6 identical layers in the original Transformer
- **Self-Attention**: Each position can attend to all positions in the previous layer
- **Feed-Forward Networks**: Applied identically to each position independently
- **Residual Connections**: Add & normalize after each sub-layer
- **Input Embeddings + Positional Encoding**: Combined to represent token order

## Related Concepts

- [[Transformer]] — Architecture containing the encoder stack
- [[Decoder]] — Generates output from encoder representations
- [[Self-Attention]] — Core mechanism within encoder layers
- [[Multi-Head Attention]] — Allows attending to different representation subspaces
- [[Positional Encoding]] — Adds sequence order information to embeddings

## Sources

- [[nips-2017-attention-is-all-you-need-Paper.md]]: Detailed encoder architecture in Attention Is All You Need
- [[2026-04-29-hands-on-llms.md]]: Discussed in context of LLM Architecture

## Open Questions

- How deep should encoder stacks be for different task complexities?
- What modifications help encoders handle very long sequences?
