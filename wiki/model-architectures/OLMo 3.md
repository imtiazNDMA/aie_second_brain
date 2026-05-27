---
title: OLMo 3
type: model-architecture
tags: [llm, olmo, dense, allen-ai, open-data, qk-norm, sliding-window]
sources: [2026-05-28-raschka-llm-architecture-gallery]
created: 2026-05-28
updated: 2026-05-28
---

# OLMo 3 — Architecture

## Identity

OLMo 3 (Allen Institute for AI, **November 20, 2025**) is the successor to [[OLMo 2]]. Two sizes — 7B (MHA) and 32B (GQA) — both incorporating **sliding-window attention** alternated 3:1 with global attention, retaining OLMo 2's [[QK-Norm]] and **post-norm** choices.

| Spec | OLMo 3 7B | OLMo 3 32B |
|---|---|---|
| Released | 2025-11-20 |
| Organization | Allen Institute for AI (AI2) |
| Parameters | 7B | 32B |
| Attention | [[Multi-Head Attention\|MHA]] | [[Grouped-Query Attention\|GQA]] |
| Norm | RMSNorm + [[QK-Norm]] |
| Norm placement | **Post-norm** |
| Attention pattern | **3 SWA : 1 Global** |
| Position | RoPE |
| FFN | SwiGLU |
| License | Apache 2.0 (full open data + code) |

## Block diagram

```mermaid
flowchart TD
    Input(["Input tokens"])
    Embed["Token Embedding"]
    BlockHeader["× N blocks: alternating SWA / Global at 3:1"]

    L1["Layer 1: SWA (window ~4K)"]
    L2["Layer 2: SWA"]
    L3["Layer 3: SWA"]
    L4["Layer 4: GLOBAL (full attention)"]
    LMore["... repeating 3:1"]

    X["Each layer's block: x"]
    Attn["Attn (QK-Norm + RoPE)<br/>(SWA mask 3/4, global 1/4)"]
    Add1((⊕))
    RMS1["RMSNorm (POST-norm)"]
    FFN["SwiGLU FFN"]
    Add2((⊕))
    RMS2["RMSNorm (POST-norm)"]

    LMHead["LM Head"]
    Output(["Output logits"])

    Input --> Embed
    Embed --> BlockHeader
    BlockHeader --> L1
    L1 --> L2
    L2 --> L3
    L3 --> L4
    L4 --> LMore
    LMore --> X
    X --> Attn
    Attn --> Add1
    X -.residual.-> Add1
    Add1 --> RMS1
    RMS1 --> FFN
    FFN --> Add2
    Add1 -.residual.-> Add2
    Add2 --> RMS2
    RMS2 --> LMHead
    LMHead --> Output
```

## Recipe diff vs OLMo 2

| Component | OLMo 2 (7B) | OLMo 3 (7B / 32B) |
|---|---|---|
| Attention pattern | All global | **3 SWA : 1 Global** (mixed) |
| 32B uses GQA | n/a | Yes (32B variant) |
| Norm | RMSNorm + QK-Norm post-norm | Same |
| FFN | SwiGLU | SwiGLU |
| Position | RoPE | RoPE |

OLMo 3's main architectural update: adopt **[[Sliding Window Attention]]** as the local-attention block, alternated with global layers. This trims KV cache and follows the broader 2025 trend (Gemma 3/4, GPT-OSS, Tiny Aya).

## Connections

- [[OLMo 2]] — predecessor
- [[Sliding Window Attention]] — newly adopted in OLMo 3
- [[QK-Norm]], [[RMSNorm]], [[SwiGLU]], [[Rotary Position Embeddings]]
- [[Grouped-Query Attention]] (32B variant)
- [[LLM Architecture]] — hub
- [[LLM Architecture Landscape 2026]] — comparative synthesis
- [[2026-05-28-raschka-llm-architecture-gallery]] — source

## Open Questions

- Why 3:1 instead of 5:1 (Gemma 3) — what's optimal?
- Does the 32B's GQA + SWA combination match dense Llama 70B?
