---
title: Sequence Modeling Evolution
type: synthesis
tags: [sequence-modeling, rnn, lstm, transformer, history, deep-learning]
sources: [2026-04-12-attention-is-all-you-need, 2026-04-12-deep-learning-with-pytorch, 2026-04-29-hands-on-llms]
created: 2026-05-09
updated: 2026-05-09
---

# Sequence Modeling Evolution

A 2017 ML engineer was a sequence-modeling specialist with a tool kit of [[Recurrent Neural Network|RNN]] / [[Long Short-Term Memory|LSTM]] / [[Gated Recurrent Unit|GRU]] / [[Sequence-to-Sequence Learning]] variants. A 2026 ML engineer is a transformer specialist who reads about RNNs in textbooks. The transition wasn't gradual — it happened fast and for specific reasons, and *understanding why* informs which architectures get revived (Mamba, RWKV, state-space models). This synthesis tells the why-each-replaced-the-last story, the residual cases where the old architectures still win, and the recurrent-revival landscape circa 2026.

## The arc

```
[Bag-of-words / n-grams]
        ↓
   [[Recurrent Neural Network]] (1986–) — token-by-token state propagation
        ↓
   [[Long Short-Term Memory]] (1997, Hochreiter & Schmidhuber) — gated state, fixes vanishing-gradient
        ↓
   [[Gated Recurrent Unit]] (2014, Cho et al.) — simpler LSTM, fewer params
        ↓
   [[Sequence-to-Sequence Learning]] + Attention (2014–2015) — encoder-decoder with attention over hidden states
        ↓
   [[Transformer]] (2017, Vaswani et al.) — attention only; no recurrence; parallel training
        ↓
   Modern decoder-only LLMs (2020+) — same Transformer, scaled
        ↓
   Recurrent revival (2023+) — Mamba, RWKV, RetNet revisit recurrence with modern math
```

## What each step fixed

| Architecture | Problem with predecessor | Mechanism |
| --- | --- | --- |
| RNN | Bag-of-words can't handle order | Hidden state $h_t = f(h_{t-1}, x_t)$ |
| LSTM | RNNs vanish gradients past ~10 steps | Gated cell state preserves long-range info |
| GRU | LSTM has more parameters than necessary | Combine forget/input gates into update gate |
| Seq2Seq + attention | Encoder hidden state is a bottleneck for translation | Decoder attends to all encoder hidden states |
| Transformer | RNN/LSTM can't parallelize across sequence (each step depends on the last) | Self-attention; all positions computed in parallel |
| Mamba/RWKV (2023+) | Transformer has O(N²) attention; inference KV cache scales linearly | Recurrent / linear-attention with selective state |

Each transition fixed a *specific* problem that became dominant once the previous bottleneck was relieved.

## Why transformers won (and stayed won)

Three reasons in order of importance:

1. **Parallelism during training** — RNN/LSTM steps are sequential; on TPUs/GPUs you waste 90%+ of the compute waiting. Transformers compute every position in parallel.
2. **Scaling laws cooperate** — accuracy improves smoothly with parameters, data, and compute on transformers. RNNs don't show the same clean log-linear curves.
3. **Attention is the right inductive bias for language** — long-range dependencies (anaphora, reference, code structure) are first-class; not crammed through a fixed-size hidden state.

Plus a few seconds of practical win: stable training (with pre-norm + RMSNorm), composable building blocks, hardware-friendly compute graphs.

## Where the older architectures still earn their keep

| Architecture | Still wins for | Why |
| --- | --- | --- |
| RNN/GRU | Tiny embedded ML on microcontrollers | Few params; sequential is fine when you only have one core |
| LSTM | Streaming time-series with strict latency constraint and small N | No KV cache; constant per-step compute |
| Conv 1D | Some audio / sensor stacks | Local receptive fields; sub-quadratic |

These niches keep shrinking. For new projects in 2026, default to a transformer unless the deployment constraint genuinely rules it out.

## The recurrent revival (2023–2026)

Transformers' weakness is inference: O(N²) attention compute on long context, and KV cache that grows linearly. The recurrent-revival architectures attack exactly this:

| Model | Mechanism | Trade-off |
| --- | --- | --- |
| RetNet (2023) | Multi-scale retention; chunked recurrent + parallel | Linear-time inference; needs careful training |
| **Mamba** (2023, S6 / state-space) | Selective state-space model; recurrent during inference, parallel during training | Linear inference, transformer-quality on language |
| RWKV (2022–2024, evolving) | RNN-shaped with attention-like reformulation | Pure recurrent inference; competitive on language tasks |
| Linear Attention variants | Approximate softmax attention with linear ops | Mixed quality results |

These are *not* yet replacing transformers in production LLMs — frontier open-weights are still transformers (Llama 3, DeepSeek V3, Qwen 2.5). But Mamba-2 and hybrid Mamba-transformer architectures (Jamba) are real production options for very-long-context workloads.

**The 2026 prediction:** transformers stay dominant for general-purpose LLMs; state-space models capture the long-context (>1M tokens) niche; the boundary moves over the next few years.

## Vision and other modalities

[[Vision Transformer]] (Dosovitskiy et al., 2020) showed that transformers work on images by treating patches as tokens. Same skeleton, different tokenizer. The pattern repeated for audio (AST, Whisper), video (ViViT), and time-series (PatchTST). What used to be CNN territory is now mostly transformer territory.

[[Convolution]] (and the CNN family — AlexNet, VGG, Inception, ResNet) still wins for very small / very fast vision deployments — phone cameras, edge inference. The wiki has [[AlexNet]], [[VGG]], [[Inception]], [[ResNet]] for this lineage.

## What to internalize

1. **Architecture choice is downstream of the bottleneck.** Each transition resolved a specific compute or signal bottleneck. New architectures emerge when a new bottleneck dominates.
2. **Inductive biases matter at small scale; data and compute matter at large scale.** RNNs vs transformers is a wash on small tabular sequence problems. At scale, parallel-trainable architectures dominate.
3. **The "best" architecture is contingent on what hardware you're running on.** TPUs/GPUs reward parallelism. Microcontrollers reward sequentiality. Cloud inference rewards low KV cache.
4. **Don't reach for the historically-cool architecture because it's cool.** RNNs were elegant; transformers were brutalist. Brutalism won.

## What this synthesis intentionally skips

- Detailed math derivations — see [[Self-Attention]], [[Long Short-Term Memory]], etc. for those
- Pretraining-recipe specifics — see [[LLM Architecture]], [[Transformer Architecture Anatomy]]
- Diffusion models, GANs, autoregressive image models — different lineage

## Related pages

- [[Recurrent Neural Network]], [[Long Short-Term Memory]], [[Gated Recurrent Unit]] — RNN family
- [[Sequence-to-Sequence Learning]], [[Encoder]], [[Decoder]] — seq2seq scaffold
- [[Transformer]], [[Attention Mechanism]], [[Self-Attention]], [[Multi-Head Attention]] — transformer family
- [[Vision Transformer]] — modality transfer
- [[Convolution]], [[AlexNet]], [[VGG]], [[Inception]], [[ResNet]] — CNN lineage for context
- [[Transformer Architecture Anatomy]] — sibling synthesis (modern transformer specifics)
- [[LLM Inference Optimization Stack]] — what the inference bottleneck looks like today
- [[Reasoning Models Landscape]] — what's being trained on top of transformers now
- [[Long Context Models]] — where state-space models compete most directly
