---
tags: [machine-learning, attention, transformer]
sources: [NIPS-2017-attention-is-all-you-need-Paper.md]
created: 2026-04-29
updated: 2026-04-29
---
# Attention Is All You Need

**Source:** NIPS-2017-attention-is-all-you-need-Paper.pdf
**Date ingested:** 2026-04-29
**Type:** academic-paper

## Summary

The paper introduces the Transformer architecture, proposing a model that entirely replaces recurrent neural networks (RNNs) and convolutional neural networks (CNNs) with attention mechanisms. This radical shift allows for massive parallelization, which is essential for modern deep learning training on GPUs. The core innovation lies in the self-attention mechanism, which computes relationships between all parts of a sequence simultaneously, giving it the ability to weigh context non-linearly.

## Key Claims

- The Transformer relies solely on attention, making it non-recurrent and fully parallelizable.
- **Self-Attention** allows the model to weigh the importance of every other token in the input sequence relative to the current token, capturing long-range dependencies effectively.
- The architecture consists of stacked encoder and decoder blocks, each containing multi-head self-attention and a simple feed-forward network.
- **Positional Encoding** is critical because attention mechanisms are inherently permutation-invariant; this encoding injects information about the absolute and relative position of tokens into the input embeddings.
- The model's performance on machine translation tasks matched or exceeded existing state-of-the-art models while dramatically improving training efficiency.

## Entities Mentioned

- [[Transformer]] — The new neural network architecture introduced in the paper, relying entirely on attention.
- [[Encoder]] — The part of the Transformer architecture responsible for processing the input sequence.
- [[Decoder]] — The part of the Transformer architecture that generates the output sequence.
- [[Self-Attention]] — The core mechanism allowing the model to weigh the relationships between all tokens in a sequence.

## Concepts Covered

- [[Attention Mechanism]] — A general concept of calculating weighted relationships between elements in a sequence.
- [[Parallelization]] — The ability to process sequence elements simultaneously, enabling faster training than recurrent methods.
- [[Positional Encoding]] — A mechanism used to inject sequential order information into the embedding vector, necessary because attention is permutation-invariant.
- [[Machine Translation]] — The benchmark task used to validate the performance superiority of the Transformer model.