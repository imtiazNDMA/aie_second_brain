---
title: Speculative Decoding
type: concept
tags: [inference, optimization, decoding]
sources: [2026-04-12-llm-engineers-handbook]
created: 2026-04-30
updated: 2026-04-30
---

# Speculative Decoding

## Definition

**Speculative Decoding** (Leviathan et al. 2023; Chen et al. 2023) is an inference-time technique that accelerates autoregressive LLM generation by using a small fast **draft model** $q$ to propose multiple tokens at once, then having a large slow **target model** $p$ verify them in a single forward pass. The output is mathematically identical to sampling from $p$ alone, but throughput improves by 2–3× on most workloads.

It is the dominant technique behind production LLM serving acceleration (vLLM speculative-decoding, TGI assisted-decoding, llama.cpp speculative).

## The core trick

Naive autoregressive decoding produces one token per forward pass of the target model. If the target is 70B parameters, each token costs one full 70B forward — $L$ tokens take $L$ forwards.

Speculative decoding observes that **many tokens are easy** (predictable from context) and **a few are hard**. A small draft model (e.g., 1B parameters) can guess the easy ones correctly. The target model verifies $K$ guesses in a single forward (one pass produces logits for all $K$ positions in parallel, since transformers are fundamentally parallel over sequence length). Whenever the draft was right, you got that token "for free"; whenever it was wrong, you fall back to one target sample.

Net effect: $\sim$3 cheap draft tokens per expensive target verification, but most are accepted, so wall-clock per token drops sharply.

## Algorithm

Given target $p$ and draft $q$:

```
Repeat until end-of-sequence:
  1. Draft phase: Sample K tokens x_1, ..., x_K autoregressively from q given the prefix.
  2. Verify phase: Run target p on the prefix + draft, getting p_1, ..., p_{K+1}.
  3. For each draft token x_i, accept it with probability:
        r_i = min(1, p(x_i | prefix, x_<i) / q(x_i | prefix, x_<i))
     Stop at the first rejection.
  4. If all K were accepted, sample one extra token from p_{K+1}.
     If x_j was rejected, sample one new token from the modified residual:
        p_residual(x) = max(0, p(x) - q(x)) / Z
  5. Append accepted tokens (and the new sampled token) to prefix.
```

The acceptance rule is the key — it's the *modified rejection sampling* that makes the output distribution provably equal to $p$.

## Why the math works

**Claim:** the resulting distribution of any single token at position $i$ matches $p(x_i \mid \text{prefix})$.

For each draft token $x_i$:

$$\Pr[\text{accept } x_i] = q(x_i) \cdot \min\left(1, \frac{p(x_i)}{q(x_i)}\right) = \min(p(x_i), q(x_i))$$

If rejected, we resample from $p_{\text{residual}}(x) \propto \max(0, p(x) - q(x))$. The combined probability of emitting token $x$ is:

$$\Pr[\text{emit } x] = \min(p(x), q(x)) + \frac{\max(0, p(x) - q(x))}{Z} \cdot (1 - \mathbb{E}_{x \sim q}[\min(1, p(x)/q(x))])$$

Working through the algebra (see Leviathan 2023 Appendix A), this collapses to $p(x)$. **The output distribution is exact** — no quality loss, just speed.

## Acceptance rate

Let $\alpha$ be the average per-token acceptance rate. Expected tokens generated per target forward:

$$\mathbb{E}[\text{tokens per target step}] = \frac{1 - \alpha^{K+1}}{1 - \alpha}$$

For $K = 4$, $\alpha = 0.75$: ~3.0 tokens per target step. Wall-clock speedup is roughly:

$$\text{speedup} \approx \frac{1 - \alpha^{K+1}}{1 - \alpha} \cdot \frac{1}{1 + K \cdot c}$$

where $c$ is the draft cost ratio (draft FLOPs / target FLOPs). For a 7B draft against a 70B target, $c \approx 0.1$, $K=4$, $\alpha=0.75$: speedup $\approx 2.6\times$.

## Choosing the draft model

| Strategy | Pros | Cons |
|---|---|---|
| **Smaller from same family** (Llama-1B for Llama-70B) | High $\alpha$ (similar tokenizer + training data) | Need to train/find a small sibling |
| **Distilled draft** | Highest $\alpha$ | Training cost up-front |
| **n-gram / retrieval-based** | $c$ ≈ 0; no GPU needed for draft | Lower $\alpha$ on novel content |
| **Same model with truncated layers** (early exit) | Free draft | Tricky cache management |
| **EAGLE / Medusa** (parallel heads) | $c$ very low | Custom training; non-trivial integration |

## Variants

| Variant | Difference |
|---|---|
| **Vanilla speculative** (Leviathan/Chen 2023) | Two separate models, single draft branch |
| **Tree speculative** | Draft $K$ branches simultaneously; verify in tree |
| **EAGLE** | Draft head shares features with target — eliminates separate model |
| **Medusa** | Multiple parallel decoding heads; verify all in one pass |
| **Lookahead Decoding** | n-gram cache built from past generations |
| **PLD (Prompt Lookup Decoding)** | Draft tokens copied from prompt; effectively free for repeating outputs |

Modern serving stacks (vLLM, TGI) generally implement EAGLE or tree-speculative, not vanilla.

## When speculative decoding helps

- **Decoding-bound workloads** (long generations, low batch size).
- **Predictable text** — code, structured output, repetitive content. Acceptance rates >85%.
- **Tasks with long shared prefix** (RAG, multi-turn chat).
- **Latency-critical serving** where you have GPU headroom for draft model.

## When it doesn't

- **Compute-bound workloads** (large batch size already saturating GPU). Speculative decoding adds parallelism that's already saturated.
- **Highly creative / random generation** at high temperature — acceptance rates drop.
- **Tiny generation lengths** (1–5 tokens) — overhead dominates.
- **Memory-constrained deployments** — draft model adds VRAM cost.

## Practical knobs

| Knob | Typical range | Effect |
|---|---|---|
| $K$ (draft length) | 4–8 | Higher $K$ → bigger reward on full-accept, bigger penalty on early-reject |
| Draft size | 1–10% of target | Sweet spot; below 1% acceptance suffers |
| Temperature | matched between $p$ and $q$ | Critical for math correctness |
| Cache reuse | KV cache shared between models when possible | Big efficiency win |

## Connections

- [[Inference Optimization]] — parent topic; speculative decoding is one of several inference accelerators
- [[KV Cache]] — speculative needs careful cache management for both draft and target
- [[Continuous Batching]] — orthogonal optimization; combines well
- [[Paged Attention]] — also orthogonal; both modify how attention computes / caches
- [[FlashAttention]] — attention kernel optimization; orthogonal
- [[vLLM]] — serving framework with native speculative support
- [[TorchScript]] / [[TorchServe]] — production serving where speculative is deployed
- [[Reasoning Strategies]] — note: [[Tree-of-Thought]]'s "branch-and-evaluate" is the *node*-level analog
