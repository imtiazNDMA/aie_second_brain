# Vision Language Models — 2026 Survey Compilation

**Compiled:** 2026-05-28
**Type:** Multi-source web research compilation
**Topic:** Vision Language Models (VLMs)
**Primary sources:**
- *A Survey of State of the Art Large Vision Language Models: Alignment, Benchmark, Evaluations and Challenges* — arXiv:2501.02189 (v6, 2026)
- *Best Open-Weight Vision-Language Models 2026* — presenc.ai
- *Vision Encoders in Vision-Language Models: A Survey* — Han Xiao, Jina AI
- *Qwen2.5-VL Technical Report* — arXiv:2502.13923
- *VLM: How Vision-Language Models Work (2026 Guide)* — labelyourdata.com

---

## What a VLM Is

A **Vision Language Model (VLM)** ingests one or more images (and optionally video) plus text, and emits text. The canonical 2024–2025 recipe:

1. **Vision encoder** — CLIP-ViT, SigLIP, or InternViT — converts image patches to visual tokens.
2. **Projection / bridge** — MLP, Q-Former (BLIP-2), Resampler (Flamingo), or learned linear map — projects visual tokens into the LLM's embedding space.
3. **LLM trunk** — pretrained decoder (Qwen, Llama, GPT-style) — consumes concatenated `[visual_tokens, text_tokens]` and decodes text autoregressively.

This is sometimes called the **"bolt-on" recipe**: pretrained LLM + pretrained vision encoder + small bridge trained on image-caption pairs.

## 2025–2026 Architecture Shift: Native Multimodal Trunks

The 2025–2026 frontier moves away from the bolt-on recipe toward **early-fusion native multimodal models**: a single transformer trained from scratch on interleaved text + image tokens, sometimes with a vision-specific patch-embedding head but no separate encoder. Examples include Gemini, Llama 4 multimodal, GPT-4o, and Chameleon.

Why the shift:
- Bolt-on models are bounded by the vision encoder's representation (CLIP was trained for retrieval, not for grounded reasoning).
- Late projection causes "modality cliff" — visual tokens occupy a thin slice of the LLM's embedding space.
- Native multimodal training scales better — same recipe, more modalities.

## Open-Weight Leaderboard (as of May 2026)

| Model | Params | License | MMMU | OCRBench | Notes |
|---|---|---|---|---|---|
| **Qwen2.5-VL-72B** | 72B | Qwen License | ~70.2% | ~888 | SOTA open weights |
| **InternVL3-78B** | 78B | MIT | ~72.2% | strong | Strongest MIT-licensed VLM |
| **Llama 4 Maverick** | MoE | Llama Community | strong | strong | Beats GPT-4o on many multimodal benchmarks |
| **DeepSeek-VL2** | MoE | MIT | strong | strong | Sparse MoE VLM; small active params |
| **Pixtral 12B** | 12B | Apache 2.0 | competitive | competitive | Mistral's flagship VLM |
| **Phi-4 Multimodal** | 5.6B | MIT | competitive | strong | Best small VLM |
| **Molmo 72B** | 72B | Apache 2.0 | strong | strong | Allen AI; image grounding focus |
| **NVLM-D 72B** | 72B | CC-BY-NC | strong | strong | NVIDIA |

**Qwen2.5-VL-7B outperforms Llama 3.2 Vision 11B** across several benchmarks — better per-parameter efficiency.

## Vision Encoder Survey (Jina AI, 2026)

Vision encoders are now a distinct research stream:
- **CLIP-style** (OpenAI CLIP, OpenCLIP) — contrastive image-text pre-training; canonical, but limited for fine-grained tasks.
- **SigLIP** (Google) — sigmoid loss instead of softmax; more sample-efficient at the same scale.
- **InternViT** — Shanghai AI Lab; scaled to 6B params, multilingual.
- **SAM-encoder** — segmentation pretraining; strong spatial understanding.
- **Dynamic resolution encoders** (Qwen2-VL's "Naive Dynamic Resolution") — process images at native resolution without resize, using 2D-RoPE.

## Training Pipeline (Multi-Stage Alignment)

Modern VLMs use 3–4 stages:

1. **Pretrain vision-language projection** — freeze encoder + LLM; train only the bridge on image-caption pairs (LAION, COYO, etc.).
2. **Pretrain multimodal LLM** — unfreeze LLM; train on image-text interleaved corpus and OCR/document data.
3. **Instruction fine-tuning** — multimodal instructions (LLaVA-Instruct, ShareGPT4V).
4. **Multimodal RLHF / DPO** — preference optimization on visual reasoning, hallucination reduction.

## Open Research Problems

| Problem | Description |
|---|---|
| **Visual hallucination** | Model ignores pixels, relies on LLM priors. Major safety/correctness issue. |
| **Grounded reasoning** | Models can describe but struggle to point, count, locate. |
| **Long video** | Token budget explosion; need temporal compression. |
| **Document / OCR** | Reading dense text in images at scale. |
| **Fairness** | Inherited demographic biases from web-scraped pairs. |
| **Multilingual grounding** | Most encoders are English-heavy. |

## Notable Benchmarks

- **MMMU** — multi-discipline reasoning (college-level questions across 30+ subjects).
- **MMBench** — fine-grained vision-language capability eval.
- **MMVet** — capability disentanglement (OCR, math, knowledge, recognition).
- **ChartQA** — chart understanding.
- **DocVQA / OCRBench** — document and OCR.
- **VQAv2** — classic visual question answering.
- **POPE** — hallucination evaluation (existence questions).
- **MathVista** — visual math reasoning.

## Notable Entities

- **Qwen team (Alibaba)** — Qwen2.5-VL family
- **Shanghai AI Lab** — InternVL family, InternViT encoder
- **DeepSeek-AI** — DeepSeek-VL2 (MoE VLM)
- **Meta AI** — Llama 4 multimodal, Chameleon (early-fusion)
- **Mistral AI** — Pixtral
- **Allen Institute for AI (AI2)** — Molmo
- **Microsoft** — Phi-4 multimodal
- **NVIDIA** — NVLM family
- **OpenAI** — GPT-4V, GPT-4o (closed)
- **Anthropic** — Claude 3.5/4 Sonnet vision (closed)
- **Google DeepMind** — Gemini family (closed)

## URLs

- https://arxiv.org/abs/2501.02189 — primary survey
- https://arxiv.org/pdf/2502.13923 — Qwen2.5-VL technical report
- https://presenc.ai/research/best-open-weight-vision-language-models-2026
- https://jina.ai/vision-encoder-survey.pdf
- https://labelyourdata.com/articles/machine-learning/vision-language-models
- https://github.com/zli12321/Vision-Language-Models-Overview
