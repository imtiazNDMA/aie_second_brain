---
title: LLM Architecture
type: concept
tags: [llm, transformer, architecture]
sources: [2026-04-29-hands-on-llms]
created: 2026-04-29
updated: 2026-04-29
---

# LLM Architecture

## Definition
The structural design of Large Language Models, typically based on the Transformer architecture with billions of parameters trained on vast text corpora.

## Core Components

### 1. Tokenizer
Converts text into tokens (subword units):
- BPE (Byte Pair Encoding)
- WordPiece
- SentencePiece

Example: "good morning dearest friend" → 5 tokens with cl100k tokenizer

### 2. Embedding Layer
Converts token IDs to dense vectors:
$$\text{Embedding}(token\_id) = \mathbf{v} \in \mathbb{R}^d$$

### 3. Transformer Blocks
Stack of $N$ identical layers, each containing:
- **Multi-Head Attention** (see [[Multi-Head Attention]])
- **Feed-Forward Network** (two linear layers with activation)
- **Layer Normalization** (see [[Positional Encoding]])
- **Residual Connections**

### 4. Output Head
Linear layer + softmax to produce next token probabilities:
$$P(\text{next token} | \text{context}) = \text{softmax}(W \cdot h_{\text{final}})$$

## Popular Architectures

| Model | Parameters | Architecture | Use Case |
|-------|-------------|--------------|----------|
| GPT-3 | 175B | Decoder-only | Text generation |
| GPT-4 | Unknown | Decoder-only | Advanced reasoning |
| LLaMA | 7B-70B | Decoder-only | Open-source LLM |
| BERT | 110M-340M | Encoder-only | Understanding tasks |

## Training Paradigms

### Pretraining
- **Next token prediction**: $\mathcal{L} = -\sum \log P(x_t | x_{<t})$
- **Masked language modeling** (BERT): Predict masked tokens

### Instruction Tuning
Fine-tuning on (instruction, response) pairs

### RLHF
See [[RLHF]] — Reinforcement Learning from Human Feedback

## Connections
- [[Transformer]] — foundational architecture
- [[Tokenization]] — input processing
- [[Embeddings]] — token representations
- [[Multi-Head Attention]] — core mechanism
- [[Pretraining]] — initial training
- [[RLHF]] — alignment training

## Sources
- [[2026-04-29-hands-on-llms]]
