---
title: Transformer Architecture Anatomy
type: synthesis
tags: [transformer, attention, architecture, llm-architecture]
sources: [2026-04-12-attention-is-all-you-need, 2026-04-12-build-llm-from-scratch, 2026-04-29-hands-on-llms]
created: 2026-05-09
updated: 2026-05-09
---

# Transformer Architecture Anatomy

The [[Transformer]] is the substrate underneath every modern LLM, but the wiki's coverage is scattered across a dozen atomic pages — [[Attention Mechanism]], [[Self-Attention]], [[Scaled Dot-Product Attention]], [[Multi-Head Attention]], [[Grouped-Query Attention]], [[Positional Encoding]], [[Rotary Position Embeddings]], [[Encoder]], [[Decoder]], [[Sequence-to-Sequence Learning]], [[FlashAttention]]. This synthesis walks the architecture top-down so an engineer reading it once can place every primitive on the same diagram and know which ones the 2025 frontier models actually use.

## The block diagram

```
Input tokens → Token embeddings + Positional encoding
                        ↓
       ┌────────── Encoder block × N ──────────┐    or Decoder block × N for GPT
       │                                       │
       │  Multi-Head (Self-)Attention          │
       │     ↓                                 │
       │  Residual + LayerNorm                 │
       │     ↓                                 │
       │  Position-wise Feed-Forward (FFN)     │
       │     ↓                                 │
       │  Residual + LayerNorm                 │
       └───────────────────────────────────────┘
                        ↓
                output projection → softmax
```

Three families of model use this skeleton:

| Family | Blocks | Examples | Use case |
| --- | --- | --- | --- |
| Encoder-only | Encoder × N | BERT, RoBERTa, all sentence-embedding models | Representation, classification, embeddings |
| Decoder-only | Decoder × N (causal mask) | GPT-2/3/4, Llama, Gemma, Qwen, DeepSeek-R1 | Generation; today's LLMs |
| Encoder-decoder | Both | Original Transformer, T5, BART | Translation, structured Seq2Seq |

The 2017 paper introduced the encoder-decoder; the 2018–2020 wave settled the field on **decoder-only** for autoregressive generation. Encoder-only persists for embeddings (see [[Embeddings]]).

## Layer-by-layer

### 1. Tokenization and embeddings

[[Tokenization]] converts text → integer IDs (BPE, WordPiece, SentencePiece). Each ID maps to a learned vector via the embedding matrix. The vocabulary size × hidden-dim is typically 5–20% of total parameters.

### 2. Positional encoding (the addition that makes attention work on sequences)

[[Self-Attention]] is permutation-invariant — without position information, "dog bites man" and "man bites dog" are identical. Position encoding fixes this:

| Variant | Mechanism | Used by |
| --- | --- | --- |
| Sinusoidal ([[Positional Encoding]]) | Fixed sin/cos at each dim and position | Original Transformer (2017) |
| Learned absolute | Trainable position vectors | GPT-2, BERT |
| ALiBi | Linear bias added to attention scores | BLOOM, MPT |
| **[[Rotary Position Embeddings\|RoPE]]** | Rotate Q/K vectors by position-dependent angle | **Llama, Mistral, Gemma, Qwen, DeepSeek — modern default** |

RoPE has near-monopoly status in 2024–2026 open-weights models because it (a) extends to longer sequences than training, (b) preserves relative-position invariance, (c) plays well with [[FlashAttention]].

### 3. Self-attention (the core operation)

[[Scaled Dot-Product Attention]] computes:

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right) V$$

[[Self-Attention]] is the special case where Q, K, V all come from the same sequence. [[Multi-Head Attention]] runs this h times in parallel with different learned projections, then concatenates — letting the model attend to different aspects (syntactic vs semantic, near vs far) simultaneously.

The KV-memory cost has driven the 2023–2025 architectural variants:

| Variant | Q heads | K, V heads | KV memory | Quality |
| --- | --- | --- | --- | --- |
| MHA (original) | h | h | Baseline | Reference |
| MQA | h | 1 | h× smaller | Slight loss |
| **[[Grouped-Query Attention\|GQA]]** | h | h/g | g× smaller | Near-MHA at g≥4; **production default** |

Llama 2/3, Mistral, Qwen, Gemma 2/3 all ship with GQA. See [[LLM Inference Optimization Stack]] for why this matters at serving time.

### 4. The attention-mask difference (encoder vs decoder)

- **Encoder self-attention** — bidirectional; every token attends to every other
- **Decoder self-attention** — causal mask; token *t* attends only to positions ≤ *t*. Required for autoregressive generation.
- **Cross-attention** (encoder-decoder only) — decoder Q over encoder K/V

Decoder-only LLMs use only causal self-attention. The mask is applied by setting future-position scores to −∞ before softmax.

### 5. Position-wise feed-forward (FFN)

A simple two-layer MLP applied independently to each position:

$$\text{FFN}(x) = \text{activation}(x W_1 + b_1) W_2 + b_2$$

The FFN is where most parameters live (typically 2/3 of the model). Architectural variants:

- Original: ReLU activation
- GPT-3 era: GELU
- Modern: **SwiGLU** (gated linear unit with Swish/SiLU) — used by Llama 2/3, Gemma, Mistral, Qwen
- MoE replacement: route token to one of N "expert" FFNs, only run K experts per token (DeepSeek-R1, Mixtral)

### 6. Normalization and residuals

- **Residual connections** ([[Residual Connections]]) — each sub-layer adds its input to its output; makes training of deep stacks tractable.
- **LayerNorm** in the original; **RMSNorm** in Llama-style models (cheaper, no mean computation, slight quality loss).
- **Pre-norm** (Llama, GPT-2+) vs **post-norm** (original) — pre-norm is dramatically more stable at scale and is the default now.

### 7. Output projection

The final hidden state at each position is projected back to vocabulary dimension; softmax produces token probabilities. Modern models often **tie the input embedding and output projection weights** (saves ~10% of params).

## What changed between the 2017 Transformer and a 2026 LLM

| Component | 2017 (Vaswani et al.) | 2026 (Llama 3 / DeepSeek) |
| --- | --- | --- |
| Architecture | Encoder-decoder | **Decoder-only** |
| Position encoding | Sinusoidal | **RoPE** |
| Attention | Multi-head (MHA) | **Grouped-Query (GQA)** |
| FFN activation | ReLU | **SwiGLU** |
| Normalization | LayerNorm, post-norm | **RMSNorm, pre-norm** |
| Tie embeddings | No | Often yes |
| Attention kernel | Naive O(N²) | **[[FlashAttention]]** (still exact) |
| FFN structure | Dense | Often **MoE** (DeepSeek, Mixtral) |
| Tokenizer | BPE (small vocab) | **BPE/SentencePiece** (32K–256K vocab) |

These changes are individually modest — together they make a 100B-parameter 2025 model both train and serve at costs the 2017 architecture couldn't approach.

## Parameter budget (rule-of-thumb)

For a decoder-only model with hidden size $d$, $L$ layers, vocab $V$:

- Embedding + output projection (tied): $V \cdot d$
- Per layer: ~$12 d^2$ (attention $4d^2$ + FFN $8d^2$ for 4× FFN width)
- Total: $V \cdot d + L \cdot 12 d^2 \approx L \cdot 12 d^2$ (when $L \cdot d \gg V$)

For Llama-3-8B: $L=32, d=4096$ → ~$32 \cdot 12 \cdot 4096^2 = 6.4$ B + embeddings ≈ 8B. Useful sanity check for any spec sheet.

## What this synthesis intentionally skips

- **Computational complexity** ([[Transformer]] page covers it)
- **Training-stability tricks** (gradient clipping, learning-rate warmup) — see [[Gradient Clipping]], [[Learning Rate Scheduling]]
- **MoE specifics** — separate topic; flagged as a future synthesis ("Mixture-of-Experts Architectures")
- **Inference-side optimizations** — see [[LLM Inference Optimization Stack]]

## Related pages

- [[Transformer]], [[Vision Transformer]] — architecture entries
- [[Attention Mechanism]], [[Self-Attention]], [[Scaled Dot-Product Attention]], [[Multi-Head Attention]], [[Grouped-Query Attention]] — attention family
- [[Positional Encoding]], [[Rotary Position Embeddings]] — position family
- [[Encoder]], [[Decoder]], [[Sequence-to-Sequence Learning]] — block-level
- [[Residual Connections]], [[FlashAttention]] — supporting primitives
- [[Sequence Modeling Evolution]] — sibling synthesis (why transformers replaced RNNs)
- [[LLM Inference Optimization Stack]] — sibling synthesis (how to serve them)
- [[Reasoning Models Landscape]] — what people now train on top of this skeleton
