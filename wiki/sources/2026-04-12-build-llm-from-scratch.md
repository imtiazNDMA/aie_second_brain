title: Build a Large Language Model (From Scratch)
type: source
tags: [book, llm, deep-learning, from-scratch]
sources: [build-llm-from-scratch.pdf]
created: 2026-04-12
updated: 2026-04-12
---

# Build a Large Language Model (From Scratch)

**Author:** [[Sebastian Raschka]]  
**Published:** 2024  
**Source:** build-llm-from-scratch.pdf  
**Date ingested:** 2026-04-12  
**Type:** book

## Summary

This book provides a deep, implementation-focused guide to building LLMs from the ground up. Unlike high-level library tutorials, Raschka walks through every layer: [[Tokenization]], attention mechanisms, positional encodings, [[Transformer]] architectures, and [[Pretraining]] objectives. The focus is on understanding the internals — how attention masks work, rotary position embeddings, grouped-query attention, and the mathematical foundations of next-token prediction.

## Key Claims

- Understanding each component (tokenizer, attention, optimizer) demystifies LLM performance.
- Small-scale implementations are essential teaching tools before scaling to billions of parameters.
- Training data quality and deduplication drive downstream generalization.
- Sampling strategies (temperature, top-k, nucleus) materially change user-perceived quality.

## Structure

- **[[Tokenization]]** — Byte Pair Encoding, sentencepiece, vocabulary building
- **Model Architecture** — Attention mechanisms, multi-head attention, causal masking
- **Positioning** — Positional encodings, rotary position embeddings
- **[[Pretraining]]** — Next token prediction, gradient descent at scale
- **Finetuning** — Instruction finetuning, RLHF, preference alignment
- **Inference** — Sampling strategies, temperature, top-k, nucleus sampling

## Entities Mentioned

- [[Sebastian Raschka]] — Author and educator guiding readers through full-stack LLM builds

## Concepts Covered

- [[Tokenization]] — Byte pair encoding, vocabulary building
- [[Attention Mechanism]] — Scaled dot-product, masking
- [[Transformer]] — Encoder/decoder stacks powering LLMs
- [[Positional Encoding]] — Sinusoidal and rotary embeddings
- [[Pretraining]] — Next-token prediction and optimization
- [[Fine-Tuning]] — Instruction tuning and RLHF loops
- [[RLHF]] — Preference modeling for alignment
- [[Inference Optimization]] — Sampling controls and efficiency tricks
