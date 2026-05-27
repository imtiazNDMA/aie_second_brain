---
title: Mixture of Experts
type: concept
tags: [moe, mixture-of-experts, sparse-models, llm-architecture, scaling]
sources: [2026-05-28-mixture-of-experts-2026]
created: 2026-05-28
updated: 2026-05-28
---

# Mixture of Experts

## Definition

A **Mixture of Experts (MoE)** transformer replaces the standard feed-forward (FFN) block in each layer with:

1. A bank of $N$ parallel FFN modules — the **experts**.
2. A small **router / gate** network that scores which experts to use per token.
3. Optionally a **shared expert** that processes every token regardless of routing.

Only **top-k** experts (typically $k \in \{1, 2, 8\}$ out of $N \in \{8, 64, 256\}$) activate per token. So:

- **Total parameters** grow with $N$ (large capacity).
- **Active parameters per token** stay roughly constant (cheap compute).

The total/active parameter gap is the entire economic argument for MoE. [[DeepSeek-V3]] has 671B total / 37B active (~5.5% active) — 18× capacity at the FLOPs cost of a 37B dense model.

Not to be confused with [[Mixture of Agents]] (an ensemble-of-LLMs *system* pattern at inference time, not an architecture).

## The MoE layer

For each input token $x$:

1. Router scores: $g = W_g x \in \mathbb{R}^N$.
2. Pick top-$k$ experts: $\mathcal{T} = \text{top-}k(g)$.
3. Compute softmax-normalized gating values over $\mathcal{T}$: $\hat{g}_i = \frac{\exp(g_i)}{\sum_{j \in \mathcal{T}} \exp(g_j)}$.
4. Combine expert outputs: $y = \sum_{i \in \mathcal{T}} \hat{g}_i \cdot \text{Expert}_i(x)$.

When a **shared expert** $E_s$ is added: $y = E_s(x) + \sum_{i \in \mathcal{T}} \hat{g}_i \cdot \text{Expert}_i(x)$.

```python
def moe_forward(x, experts, router, shared_expert=None, k=2):
    # x: (B, T, D)
    scores = router(x)                             # (B, T, N)
    topk_scores, topk_idx = scores.topk(k, dim=-1) # (B, T, k)
    gates = topk_scores.softmax(dim=-1)            # normalize over selected

    y = torch.zeros_like(x)
    for i in range(k):
        idx_i = topk_idx[..., i]                   # (B, T)
        # gather expert outputs for chosen experts (sketch)
        for e in range(len(experts)):
            mask = (idx_i == e)
            if mask.any():
                y[mask] += gates[..., i][mask].unsqueeze(-1) * experts[e](x[mask])

    if shared_expert is not None:
        y = y + shared_expert(x)
    return y
```

(Production MoE uses efficient kernels and all-to-all communication; this is illustrative.)

## Why MoE now

MoE has existed since Jacobs et al. (1991). The modern wave:

- **GShard** (Google, 2020) and **Switch Transformer** (Fedus et al., 2021) — first practical large-scale MoE; top-1 routing.
- **Mixtral 8x7B / 8x22B** ([[Mistral AI]], 2023–2024) — first popular open MoE; top-2 of 8 experts.
- **DeepSeekMoE** ([[DeepSeek-AI]], 2024) — **fine-grained experts + shared experts**.
- **[[DeepSeek-V3]] / V3.2 / V4** (2024–2026) — current SOTA recipe.
- **[[Llama 4]] Maverick / Scout** ([[Meta AI]], 2025) — Meta adopts MoE.

The 2024–2026 trend is **fine-grained experts**: instead of 8 big experts, use 256 small ones with top-8 routing. Argument: finer specialization, smoother load distribution, more recombinable computation.

## Fine-grained experts

Split each "macro-expert" into $m$ smaller experts; increase top-$k$ correspondingly. Total active FLOPs constant; total parameters scale with $m$.

Intuition: smaller experts specialize on finer-grained features. The combinatorial routing over 256 small experts (selecting 8) is far richer than over 8 large experts (selecting 2): $\binom{256}{8} \approx 4.1 \times 10^{14}$ vs $\binom{8}{2} = 28$.

## Shared experts

Add one (or more) **always-active** expert. Captures features universal across tokens (syntax, common patterns), freeing routed experts to specialize on rare or domain-specific patterns. [[DeepSeek-V3]] uses one shared expert + 256 routed.

## Load balancing

Without intervention, MoE collapses to a few "winning" experts (the router learns to route everything to a small set). Three approaches:

### Auxiliary balance loss (classic)

Add a loss $\mathcal{L}_{\text{aux}} = \alpha \cdot N \cdot \sum_i f_i P_i$ where $f_i$ is the fraction of tokens routed to expert $i$ and $P_i$ is the average gate score for expert $i$. Penalizes uneven utilization. Used in Switch, Mixtral.

Drawbacks: balance loss conflicts with quality loss; tuning $\alpha$ is delicate; aggressive balancing hurts quality.

### Auxiliary-loss-free balancing (DeepSeek-V3)

Maintain a learnable bias $b_i$ for each expert. Router uses $s_i + b_i$ for top-$k$ *selection* (not for gating value). After each training step, update biases:

- If expert $i$ was used more than average → decrease $b_i$ slightly.
- If expert $i$ was used less than average → increase $b_i$ slightly.

Step size ≈ 0.001. No auxiliary gradient term. Empirically better quality at the same balance level. This is the de-facto modern approach.

### Expert Choice routing

Reverse the selection: each expert picks its top-$N$ tokens (instead of each token picking experts). Naturally balanced — every expert gets the same load. Downside: some tokens may be dropped (chosen by no expert), requiring token-dropping policies.

## Routing strategies compared

| Strategy | Models | Tradeoff |
|---|---|---|
| **Top-1** | Switch Transformer | Maximally sparse; hard to balance; quality cliff at imbalance |
| **Top-2** | GShard, Mixtral | Standard for years; balance via aux loss |
| **Top-8 (of 256)** | [[DeepSeek-V3]] | Fine-grained; bias-based balance; current best |
| **Expert Choice** | research | Naturally balanced; token-dropping |
| **Soft MoE** | research | Weighted average over all experts; defeats sparsity |
| **Hash routing** | baselines | Non-learned; cheap; quality ceiling |

## Auxiliary innovations (DeepSeek-V3 stack)

DeepSeek-V3 ships several innovations alongside MoE:

- **Multi-head Latent Attention (MLA)** — compresses [[KV Cache]] via a learned latent projection; ~10× smaller KV cache.
- **Node-limited routing** — limits the number of cluster nodes each token's experts can span; reduces all-to-all communication.
- **FP8 training** — first major open MoE trained natively in FP8.
- **Multi-token prediction (MTP)** — auxiliary loss predicting future tokens; improves training signal density.

## Scaling laws

MoE follows different scaling laws than dense models (Krajewski et al. 2024):

- At **fixed FLOPs**, MoE achieves lower loss than dense → MoE wins on compute-budget.
- At **fixed parameter count**, dense wins → MoE is *less* parameter-efficient in absolute terms.
- The right comparison is **FLOPs-matched**.

Conceptually: MoE buys you capacity (parameters that exist somewhere) cheaply, but you pay for memory to keep them all resident.

## 2025–2026 open MoE landscape

| Model | Total | Active | Experts | License |
|---|---|---|---|---|
| **Mixtral 8x7B** | 47B | 12.9B | 8 (top-2) | Apache 2.0 |
| **Mixtral 8x22B** | 141B | 39B | 8 (top-2) | Apache 2.0 |
| **[[DeepSeek-V3]]** | 671B | 37B | 256 + 1 shared (top-8) | MIT |
| **DeepSeek-V3.2** | 671B | 37B | 256 + 1 shared (top-8) | MIT |
| **DeepSeek-V4-Pro** | 1.6T | 49B | larger (top-8) | MIT |
| **DeepSeek-V4-Flash** | 284B | 13B | fewer (top-4) | MIT |
| **[[Llama 4]] Maverick** | ~400B | ~17B | 128 (top-1) | Llama Community |
| **[[Llama 4]] Scout** | ~110B | ~17B | 16 (top-1) | Llama Community |
| **Qwen2.5-MoE 14B** | 14B | 2.7B | 64 (top-8) | Apache 2.0 |
| **[[DeepSeek-VL2]]** | varies | varies | fine-grained MoE | MIT |

**DeepSeek-V3.2** is widely considered the best open LLM in 2026 (94.2% MMLU, MIT-licensed).

## When MoE wins

- **Capacity-bound tasks** — knowledge breadth, multilingual coverage, rare-pattern recall.
- **Compute-bound serving** — per-token FLOPs are what you pay for.
- **Heterogeneous workloads** — experts specialize on domains/languages.

## When MoE loses

- **Memory-bound serving** — entire model must be resident; can't run a 671B model on a single GPU.
- **Latency-critical small models** — routing overhead dominates at small $N$.
- **Fine-tuning** — expert imbalance during LoRA/SFT; some experts may never see gradient.
- **Edge / on-device** — total memory footprint kills.
- **Predictable latency** — token-level routing variance affects p99 latency.

## Pitfalls

- **Expert collapse** without balancing.
- **Token dropping** under load (when expert capacity exceeded).
- **Communication bottleneck** at scale — all-to-all between GPUs.
- **Fine-tuning brittleness** — pretrained routing is delicate.
- **Quantization sensitivity** — experts at INT4 may diverge in quality more than dense INT4.

## Connections

- [[DeepSeek-V3]] — canonical 2024–2026 MoE
- [[DeepSeek-AI]] — origin of fine-grained MoE + aux-loss-free balancing
- [[DeepSeek-R1]] — uses DeepSeek-V3-Base MoE as backbone
- [[Mixtral]] — first popular open MoE
- [[Mistral AI]] — Mixtral origin
- [[Llama 4]] — Meta's MoE flagship
- [[DeepSeek-VL2]] — MoE applied to vision-language
- [[LLM Architecture]] — supplies the dense baseline this replaces
- [[Multi-head Latent Attention]] — paired innovation in DeepSeek-V3
- [[Modality-as-Tokens]] — synthesis: MoE is the scaling answer that lets multimodal trunks keep growing
- [[2026-05-28-mixture-of-experts-2026]] — source summary

## Open Questions

- Optimal expert count and granularity at frontier scale — is 256 the new norm, or does it keep growing?
- Best fine-tuning recipe that preserves expert specialization.
- Hardware co-design — TPUs/GPUs specifically optimized for MoE all-to-all.
- MoE in non-LLM domains — diffusion, audio, recommender systems.
