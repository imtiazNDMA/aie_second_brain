---
title: Decoder
type: concept
tags: [transformer, deep-learning, generation]
sources: [nips-2017-attention-is-all-you-need-Paper.md, 2026-04-29-hands-on-llms.md]
created: 2026-04-29
updated: 2026-04-29
---

# Decoder

A component of sequence-to-sequence architectures that generates output sequences autoregressively, using encoder representations and previously generated tokens.

## Definition

In the Transformer architecture, the decoder also consists of a stack of identical layers, but with an additional encoder-decoder attention sub-layer. It generates output tokens one at a time, attending to encoder outputs and previous decoder states.

## Key Concepts

- **Masked Self-Attention**: Prevents attending to future positions during training
- **Encoder-Decoder Attention**: Allows decoder to focus on relevant encoder representations
- **Autoregressive Generation**: Generates one token at a time, feeding back previous outputs
- **Decoder Stack**: Typically 6 identical layers in the original Transformer
- **Output Linear + Softmax**: Converts decoder outputs to vocabulary probabilities

## Related Concepts

- [[Transformer]] — Architecture containing the decoder stack
- [[Encoder]] — Provides representations that decoder attends to
- [[Self-Attention]] — Used with masking in decoder self-attention
- [[Multi-Head Attention]] — Both self-attention and encoder-decoder attention
- [[Machine Translation]] — Primary application for encoder-decoder Transformers

## Sources

- [[nips-2017-attention-is-all-you-need-Paper.md]]: Detailed decoder architecture in Attention Is All You Need
- [[2026-04-29-hands-on-llms.md]]: Discussed in context of LLM Architecture

## Open Questions

- How do decoder-only architectures (like GPT) differ from encoder-decoder?
- What techniques improve decoding speed and quality?
