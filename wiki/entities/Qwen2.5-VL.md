---
title: Qwen2.5-VL
type: entity
tags: [model, vlm, vision-language, multimodal, open-weights, qwen]
sources: [2026-05-28-vision-language-models-2026]
created: 2026-05-28
updated: 2026-05-28
---

# Qwen2.5-VL

## Identity

The 2025 vision-language flagship of Alibaba's [[Qwen]] series. Trained by the Qwen team at Alibaba Cloud. Released in three open-weight sizes — 3B, 7B, 72B — with strong performance across document understanding, OCR, video, and general visual reasoning. As of May 2026, **Qwen2.5-VL-72B leads the open-weight VLM leaderboard** at ~70.2% MMMU and ~888 OCRBench.

Technical report: [arXiv:2502.13923](https://arxiv.org/abs/2502.13923).

## Architecture

- **Vision encoder**: redesigned ViT-based encoder with **Naive Dynamic Resolution** — processes images at native size without resizing, using 2D-RoPE for position encoding.
- **Projection**: MLP connector.
- **LLM trunk**: Qwen2.5 decoder (dense; 3B / 7B / 72B variants).
- **Window attention + sparse patterns** for long videos.

The dynamic-resolution design is the headline architectural choice. Older VLMs resize to a fixed shape (336×336 typical), losing detail in high-res images. Qwen2.5-VL keeps native resolution and uses 2D-RoPE so the model handles arbitrary sizes without retraining.

## Capabilities

- **Document understanding**: PDF, tables, charts, screenshots, OCR.
- **Bounding-box generation**: outputs `<box>x1,y1,x2,y2</box>` tags for grounded referring.
- **Long video understanding**: minute-to-hour scale with adaptive frame sampling.
- **Multilingual OCR**: 20+ languages including Chinese, Japanese, Arabic.
- **Agentic UI control**: trained on screen-grounded data; can output actions for visual web/mobile agents.

## Benchmarks

| Benchmark | Qwen2.5-VL-72B |
|---|---|
| MMMU | ~70.2% |
| OCRBench | ~888 |
| MathVista | strong |
| DocVQA | SOTA-class |
| ChartQA | SOTA-class |
| MMBench | strong |
| Video-MME | competitive |

**Qwen2.5-VL-7B outperforms Llama 3.2 Vision 11B** on most benchmarks — per-parameter efficiency favors the Qwen recipe.

## License

Qwen License (permissive for commercial use under most circumstances; check Alibaba's terms).

## Significance

- **Best open-weight VLM** as of May 2026 on multiple benchmarks.
- **Dynamic-resolution encoder** is now widely copied — significant architectural contribution.
- **Strong document/OCR** capability makes it the de-facto choice for document-AI workflows.
- **Agentic visual control** (UI grounding) puts it on the path to [[Voice Agents|visual agents]].

## Related Pages

- [[Vision Language Models]] — model class
- [[Vision Transformer]] — backbone of the vision encoder
- [[CLIP]] / SigLIP — encoder lineage
- [[Multimodal Tokenization]] — dynamic-resolution patch tokenization
- [[Alibaba]] — parent organization
- [[InternVL]] — main MIT-licensed competitor
- [[Llama 4]] — multimodal competitor (closed-MoE)
- [[DeepSeek-VL2]] — MoE-VLM competitor

## Sources

- [[2026-05-28-vision-language-models-2026]]
- [arXiv:2502.13923](https://arxiv.org/abs/2502.13923) — Qwen2.5-VL Technical Report
