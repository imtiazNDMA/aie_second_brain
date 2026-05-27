---
title: Llama 4
type: entity
tags: [model, llm, vlm, moe, multimodal, open-weights, meta, llama]
sources: [2026-05-28-vision-language-models-2026, 2026-05-28-mixture-of-experts-2026]
created: 2026-05-28
updated: 2026-05-28
---

# Llama 4

## Identity

Meta's **2025 flagship open-weight model family** — the first Llama generation to use [[Mixture of Experts|MoE]] and to be **natively multimodal** (early-fusion text + image tokens). Released as **Llama 4 Scout** (smaller, edge-focused) and **Llama 4 Maverick** (frontier, beats GPT-4o on many multimodal benchmarks).

## Variants

| Variant | Total | Active | Experts | Notes |
|---|---|---|---|---|
| **Llama 4 Scout** | ~110B | ~17B | 16 (top-1) | 10M-context capable; edge-friendly active size |
| **Llama 4 Maverick** | ~400B | ~17B | 128 (top-1) | 1M context; beats GPT-4o & Gemini 2.0 Flash on multimodal |
| **Llama 4 Behemoth** | ~2T | ~288B (16-expert top-1 of 128 active in research) | research preview | Frontier scale, used as a teacher for Scout/Maverick |

## Architecture

- **MoE**: top-1 routing (Switch-Transformer-style) over 16 (Scout) or 128 (Maverick) experts.
- **Native multimodal**: image tokens from a visual front-end interleaved with text tokens, processed by a single transformer trunk (early fusion).
- **Long context**: Scout reaches 10M-token context via interleaved attention + RoPE scaling tricks.
- **iRoPE** (interleaved RoPE) — alternates RoPE-rotated and non-rotated attention layers; helps generalization to long contexts.

## Capabilities

- Frontier multimodal reasoning at open weights.
- Long-document and long-video understanding (10M context in Scout).
- Strong tool use and agentic workflows.

## Benchmarks

- Maverick achieves ELO ~1417 on LMArena.
- Beats GPT-4o and Gemini 2.0 Flash on multiple multimodal benchmarks (per Meta's release claims).

## License

**Llama 4 Community License** — commercial use permitted with some restrictions (similar to prior Llama licenses).

## Significance

- **Meta's adoption of MoE** marks the architecture's full mainstream acceptance.
- **Natively multimodal Llama** — earlier Llamas (3.2 Vision) used adapter-style bolt-on; Llama 4 is early-fusion.
- **10M context** is a notable scaling achievement at open weights.
- Sets the **open multimodal MoE benchmark** that Qwen, DeepSeek, and Mistral now compete against.

## Related Pages

- [[Mixture of Experts]] — architectural pattern
- [[Vision Language Models]] — multimodal capability
- [[Meta AI]] — parent org
- [[Llama]] — prior generation (dense)
- [[DeepSeek-V3]] — competing MoE
- [[Modality-as-Tokens]] — synthesis

## Sources

- [[2026-05-28-vision-language-models-2026]]
- [[2026-05-28-mixture-of-experts-2026]]
