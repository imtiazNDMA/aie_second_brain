---
title: Vision Language Models
type: concept
tags: [vision-language, multimodal, vlm, foundation-models, generative-ai]
sources: [2026-05-28-vision-language-models-2026]
created: 2026-05-28
updated: 2026-05-28
---

# Vision Language Models

## Definition

**Vision Language Models (VLMs)** are foundation models that ingest one or more images (and optionally video) plus text, and emit text. A VLM is **not** an image generator (that's [[Diffusion Models]]) and not just an image encoder (that's [[CLIP]] or [[Vision Transformer]]). It's a multimodal LLM whose attention can read pixels.

The canonical 2024–2025 recipe is:
1. **Vision encoder** (CLIP-ViT, SigLIP, InternViT, …) converts image patches → visual tokens.
2. **Projection / bridge** (MLP, Q-Former, Resampler) maps visual tokens into the [[LLM Architecture|LLM]]'s embedding space.
3. **LLM trunk** (Qwen, Llama, GPT-style decoder) consumes `[visual_tokens, text_tokens]` and decodes text autoregressively.

The 2025–2026 frontier moves toward **early-fusion native multimodal models**: a single transformer trained from scratch on interleaved text+image tokens (Gemini, Llama 4, GPT-4o, Chameleon).

## Why VLMs matter

- They generalize the LLM interface to "anything you can take a picture of": documents, charts, screenshots, X-rays, satellite imagery, UI screens.
- They unify image classification, captioning, OCR, VQA, and visual reasoning under one model and one prompting interface.
- They're the substrate for **multimodal agents** — agents that browse the web, read screens, read documents.

## Architecture variants

### Adapter / bridge VLMs (LLaVA family, the 2023–2025 mainstream)

```
image → [Vision Encoder, frozen] → visual tokens
                                       ↓
                                  [Projection]
                                       ↓
                       text tokens ─┬─► [Pretrained LLM trunk] ─► output text
                                    │
                              concatenate
```

- **LLaVA** (Liu et al. 2023) — MLP projection, simple, opened the floodgates.
- **BLIP-2** — Q-Former projector with learned query tokens, more compute-efficient.
- **Flamingo** (DeepMind) — Perceiver Resampler + cross-attention layers; supports interleaved image-text input.
- **Qwen-VL / Qwen2-VL / Qwen2.5-VL** — Naive Dynamic Resolution + 2D-RoPE; processes images at native resolution.

### Early-fusion native multimodal models

```
[image patches] + [text tokens] → [Single multimodal transformer, trained from scratch] → output tokens (text or image)
```

- **Chameleon** (Meta, 2024) — token-based early fusion, image tokens from a VQ-VAE.
- **GPT-4o** (OpenAI, 2024) — natively multimodal in/out.
- **Gemini family** (Google) — natively multimodal from inception.
- **Llama 4** (Meta, 2025) — multimodal MoE, early-fusion.

### Vision-encoder variants

| Encoder | Origin | Key property |
|---|---|---|
| **[[CLIP]]-ViT** | OpenAI, 2021 | Contrastive image-text; canonical |
| **OpenCLIP** | LAION, 2022– | Open-weight CLIP reproductions |
| **SigLIP** | Google, 2023 | Sigmoid loss; more sample-efficient |
| **InternViT** | Shanghai AI Lab | Scaled to 6B, multilingual |
| **SAM encoder** | Meta | Segmentation pretraining; strong spatial |
| **Dynamic-resolution** | Qwen2-VL | Native-resolution patches via 2D-RoPE |

## Open-weight leaderboard (May 2026)

| Model | Params | License | MMMU | OCRBench |
|---|---|---|---|---|
| [[Qwen2.5-VL]]-72B | 72B | Qwen License | ~70.2% | ~888 |
| [[InternVL]]3-78B | 78B | MIT | ~72.2% | strong |
| [[Llama 4]] Maverick | MoE | Llama Community | strong | strong |
| [[DeepSeek-VL2]] | MoE | MIT | strong | strong |
| Pixtral 12B ([[Mistral AI]]) | 12B | Apache 2.0 | competitive | competitive |
| Phi-4 multimodal ([[Microsoft]]) | 5.6B | MIT | competitive | strong |
| Molmo 72B (Allen AI) | 72B | Apache 2.0 | strong | strong |
| NVLM-D 72B ([[NVIDIA]]) | 72B | CC-BY-NC | strong | strong |

Notable: **Qwen2.5-VL-7B outperforms Llama 3.2 Vision 11B** on most multimodal benchmarks — per-parameter efficiency favors the Qwen architecture.

## Training pipeline (three- or four-stage)

1. **Stage 1 — vision-language projection pretrain**: freeze vision encoder and LLM; train only the projection on image-caption pairs (LAION, COYO, DataComp).
2. **Stage 2 — multimodal LLM pretrain**: unfreeze LLM; train on image-text interleaved web corpora, OCR data, document images.
3. **Stage 3 — instruction fine-tuning**: multimodal instruction data (LLaVA-Instruct, ShareGPT4V, in-house mixes).
4. **Stage 4 — multimodal RLHF / DPO**: preference optimization for visual reasoning and hallucination reduction.

For early-fusion natives, stages 1–2 collapse into a single pretraining run.

## Benchmarks

| Benchmark | What it measures |
|---|---|
| **MMMU** | Multi-discipline reasoning across 30+ college subjects |
| **MMBench** | Fine-grained vision-language capabilities |
| **MMVet** | Capability disentanglement (OCR, math, knowledge, recognition) |
| **ChartQA** | Chart understanding |
| **DocVQA / OCRBench** | Document and OCR |
| **VQAv2** | Classic visual question answering |
| **POPE** | Hallucination evaluation (existence questions) |
| **MathVista** | Visual math reasoning |
| **MMVP** | Visual probing (CLIP blind spots) |

## Failure modes

- **Visual hallucination** — VLM ignores pixels, generates plausible-sounding answers from LLM priors. The single biggest correctness problem.
- **Grounded reasoning weakness** — describing is much easier than pointing, counting, locating.
- **Long-video token budget** — minute-long video at 1 fps × 200 tokens/frame = 12k tokens; hours of video are infeasible without temporal compression.
- **Document at scale** — OCR is solved; multi-page document reasoning still hard.
- **Demographic bias** — inherited from web-scraped image-caption pairs.
- **Multilingual visual grounding** — encoders are English-heavy.

## When VLMs win

- Document understanding, OCR-heavy workflows.
- Multimodal RAG (retrieve images by content, reason about them).
- Visual agents (read screens, interact with UIs).
- Chart and table analysis.
- Visual content moderation.
- Medical imaging support (with clinical guardrails).

## When they don't

- Pure image classification — task-specific classifiers still cheaper and more accurate.
- Image generation — that's [[Diffusion Models]] territory.
- Fine-grained perception (counting, segmentation) — specialized models (SAM, YOLO) outperform.
- Latency-critical (sub-100ms) — VLMs are heavy; per-image inference is 100ms+.

## Connections

- [[CLIP]] — canonical vision encoder; the embedding backbone for most VLMs
- [[Vision Transformer]] — image-encoder architecture
- [[Multimodal Tokenization]] — how pixels become tokens
- [[Diffusion Models]] — image-generation counterpart (text-out vs image-out)
- [[Mixture of Experts]] — used in DeepSeek-VL2, Llama 4
- [[LLM Architecture]] — the trunk
- [[Voice Agents]] — adjacent multimodal pattern (audio-in/out instead of vision-in)
- [[Modality-as-Tokens]] — synthesis covering the architectural arc
- [[2026-05-28-vision-language-models-2026]] — source summary

## Open Questions

- Will early-fusion natives definitively beat bolt-on VLMs at every scale, or only at frontier scale?
- Can vision-language tokens share the same vocab as text, or do they need separate codebooks?
- What's the right way to evaluate "grounded" reasoning vs LLM-prior reasoning?
- Best open-weights VLM for **embedded / edge** deployment (under 5B params)?
