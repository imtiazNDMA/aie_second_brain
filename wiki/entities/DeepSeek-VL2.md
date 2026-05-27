---
title: DeepSeek-VL2
type: entity
tags: [model, vlm, vision-language, moe, multimodal, open-weights, deepseek, mit-license]
sources: [2026-05-28-vision-language-models-2026, 2026-05-28-mixture-of-experts-2026]
created: 2026-05-28
updated: 2026-05-28
---

# DeepSeek-VL2

## Identity

A **Mixture-of-Experts vision-language model** from [[DeepSeek-AI]] (2024–2025). DeepSeek-VL2 applies the [[Mixture of Experts|MoE]] recipe perfected in [[DeepSeek-V3]] to the VLM stack — making it one of the first widely-used **MoE VLMs**. Released in Tiny / Small / Large sizes with very small active parameter counts relative to total capacity.

## Architecture

- **Vision encoder**: SigLIP / Dynamic Tiling encoder — supports high-resolution inputs by tiling into overlapping patches.
- **Projection**: MLP connector.
- **LLM trunk**: **DeepSeekMoE** — fine-grained experts (smaller than typical) + shared experts + top-k routing (DeepSeek-V3 lineage but at smaller scale).
- **Variants**:
  - DeepSeek-VL2-Tiny: 3B total / 0.6B active
  - DeepSeek-VL2-Small: 16B total / 2.8B active
  - DeepSeek-VL2: 27B total / 4.5B active

## Capabilities

- Document AI, OCR, charts, screen understanding.
- Visual grounding with bounding boxes.
- Long-context multimodal reasoning (tiled high-resolution support).

## License

MIT.

## Significance

- **First successful MoE VLM** at meaningful scale — proof that sparsity transfers from text-only LLMs to multimodal trunks.
- **Tiny active parameter counts** make serving cheap relative to dense competitors.
- **Dynamic Tiling** encoder is independently useful for high-resolution VLM input.

## Related Pages

- [[Vision Language Models]] — model class
- [[Mixture of Experts]] — architectural pattern
- [[DeepSeek-AI]] — organization
- [[DeepSeek-V3]] — sibling text-only flagship
- [[Multimodal Tokenization]] — tiling encoder for high-res

## Sources

- [[2026-05-28-vision-language-models-2026]]
- [[2026-05-28-mixture-of-experts-2026]]
