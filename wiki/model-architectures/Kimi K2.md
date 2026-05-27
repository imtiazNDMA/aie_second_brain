---
title: Kimi K2
type: model-architecture
tags: [llm, kimi, moonshot, moe, mla, trillion-scale]
sources: [2026-05-28-raschka-llm-architecture-gallery]
created: 2026-05-28
updated: 2026-05-28
---

# Kimi K2 — Architecture

## Identity

Kimi K2 (**Moonshot AI, July 10, 2025**) is a **1-trillion-parameter [[Mixture of Experts|MoE]] model** with [[Multi-head Latent Attention|MLA]], from Beijing-based Moonshot. Notable for being the **first open-weight 1T-scale MoE** and for **adopting DeepSeek's MLA + fine-grained MoE recipe** at larger total scale. Updated to **Kimi K2.5** (Jan 2026, 256K context) and **Kimi K2.6** (1M context).

| Spec | Kimi K2 | Kimi K2.5 | Kimi K2.6 |
|---|---|---|---|
| Released | 2025-07-10 | 2026-01-27 | 2026 |
| Total params | 1T | 1T | 1T |
| Active params | ~32B (3.2% active) |
| Attention | [[Multi-head Latent Attention\|MLA]] |
| FFN | Sparse [[Mixture of Experts\|MoE]] |
| Context | 128K | 256K | 1M |
| License | MIT (or near-permissive) |
| Organization | Moonshot AI |

## Block diagram (Kimi K2)

```mermaid
flowchart TD
    Input(["Input tokens"])
    Embed["Token Embedding"]
    BlockHeader["× N transformer blocks"]

    X["x"]
    RMS1["RMSNorm (pre-norm)"]
    MLA["MLA (with decoupled RoPE)<br/>compressed c-KV latent<br/>separate RoPE-rotated key path<br/>per-head up-projections to K, V<br/>attention over Q, full-K (with k-R), V"]
    Add1((⊕))
    RMS2["RMSNorm (pre-norm)"]
    MoE["MoE FFN<br/>Router → top-k experts (likely 8)<br/>each expert: SwiGLU<br/>with shared expert (DeepSeek-style)"]
    Add2((⊕))

    FinalRMS["Final RMSNorm"]
    LMHead["LM Head"]
    Output(["Output logits"])

    Input --> Embed
    Embed --> BlockHeader
    BlockHeader --> X
    X --> RMS1
    RMS1 --> MLA
    MLA --> Add1
    X -.residual.-> Add1
    Add1 --> RMS2
    RMS2 --> MoE
    MoE --> Add2
    Add1 -.residual.-> Add2
    Add2 -.repeat × N.-> X
    Add2 --> FinalRMS
    FinalRMS --> LMHead
    LMHead --> Output
```

## Architectural distinctives

- **First open-weight 1T-scale MoE** — beats DeepSeek-V3 total parameter count.
- **3.2% active ratio** — even sparser than DeepSeek-V3's 5.5%, more aggressive sparsity bet.
- **MLA at this scale** — validates DeepSeek's KV-cache-compression innovation outside DeepSeek.
- **Long context** — K2.5 at 256K, K2.6 at 1M (without sliding window).

## Kimi Linear (sibling hybrid)

Moonshot also released **Kimi Linear (48B-A3B)** in Oct 2025 — a hybrid combining **[[Linear Attention]] + MLA** with 1M context. Same lab, different architectural bet (linear attention rather than full MLA at all layers).

## Recipe diff vs DeepSeek-V3

| Component | DeepSeek-V3 | Kimi K2 |
|---|---|---|
| Total / Active | 671B / 37B | 1T / ~32B |
| Active % | 5.5% | 3.2% |
| Attention | MLA | MLA |
| MoE recipe | 256 + 1 shared, top-8 | similar (details less public) |
| Aux-loss-free balancing | Yes | likely |
| MTP | Yes | not disclosed |
| Context | 128K (V3) | 1M (K2.6) |

## Connections

- [[Multi-head Latent Attention]]
- [[Mixture of Experts]]
- [[DeepSeek-V3]] — recipe ancestor
- [[Linear Attention]] — sibling Kimi Linear bet
- [[Mamba]] — adjacent linear-time family
- [[LLM Architecture]] — hub
- [[LLM Architecture Landscape 2026]] — comparative synthesis
- [[2026-05-28-raschka-llm-architecture-gallery]] — source

## Open Questions

- Public MoE configuration details (expert count, top-k, shared expert) — partially disclosed.
- How Kimi K2.6 reaches 1M context architecturally — pure MLA + RoPE scaling, or additional techniques?
