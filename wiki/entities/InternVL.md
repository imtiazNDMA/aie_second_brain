---
title: InternVL
type: entity
tags: [model, vlm, vision-language, multimodal, open-weights, mit-license]
sources: [2026-05-28-vision-language-models-2026]
created: 2026-05-28
updated: 2026-05-28
---

# InternVL

## Identity

A family of open-weight vision-language models from **Shanghai AI Laboratory** (OpenGVLab). InternVL3 (2025) — the third major iteration — is widely regarded as the **strongest MIT-licensed VLM**, reaching ~72.2% MMMU at 78B parameters. The series pairs a custom large-scale ViT (**InternViT**, up to 6B parameters, multilingual) with a Qwen, InternLM, or Llama trunk via a Q-Former-style projection.

## Architecture

- **Vision encoder**: **InternViT-6B** — distilled and scaled ViT, multilingual contrastive pretraining.
- **Projection**: pixel-shuffle MLP (downsamples token count by 4× for efficiency).
- **LLM trunk**: Qwen2.5 / InternLM2 / Llama3 (various sizes).
- **Multi-stage training**: vision-text contrastive → vision-language projection → multimodal instruction tuning → multimodal preference optimization.

## Capabilities

- Multilingual visual grounding (InternViT's contrastive pretraining covers many languages).
- Document AI and OCR.
- Visual chain-of-thought reasoning (InternVL3 series adds reasoning-style SFT).
- Multi-image understanding.

## Benchmarks (InternVL3-78B)

| Benchmark | Score |
|---|---|
| MMMU | ~72.2% |
| MathVista | competitive |
| OCRBench | strong |
| MMBench | strong |
| MMVet | strong |

## License

**MIT-licensed** — the strongest permissively-licensed open-weight VLM in 2026.

## Significance

- **Most permissively licensed strong VLM** in 2026 — important for commercial deployment when Qwen License is too restrictive.
- **InternViT** is itself a contribution — a 6B multilingual ViT used as a drop-in encoder by other VLMs.
- Shanghai AI Lab's broader **InternX** ecosystem (InternLM, InternViT, InternVL, InternVid) is one of the most cohesive open multimodal stacks.

## Related Pages

- [[Vision Language Models]] — model class
- [[Vision Transformer]] — InternViT is a ViT
- [[CLIP]] — encoder lineage
- [[Qwen2.5-VL]] — main open-weight competitor
- [[Multimodal Tokenization]] — pixel-shuffle projection downsamples visual tokens

## Sources

- [[2026-05-28-vision-language-models-2026]]
