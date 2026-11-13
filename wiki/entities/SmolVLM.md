---
tags: [entity, model, vision-language-model, hugging-face]
sources: ["2026-09-12-vision-language-models-building-vlms"]
created: 2026-09-12
updated: 2026-09-12
---

# SmolVLM

Compact vision-language model from Hugging Face designed for efficient multimodal understanding. Uses unified-sequence architecture where visual tokens are projected into the LLM's token space and processed alongside text tokens.

## Architecture

- **Vision encoder** — extracts visual features from images
- **Projection layer** — maps visual features to LLM embedding space
- **LLM backbone** — processes combined visual and text tokens
- **Unified sequence** — all modalities processed in a single transformer

## Variants

- **SmolVLM** — standard variant for general visual question answering
- **SmolVLM2** — improved variant with better video understanding

## Key Properties

- Compact size suitable for edge deployment
- Unified-sequence architecture simplifies code and reduces parameters
- Competitive with larger models when backbones are adapted

## Related

- [[Vision Language Models]] — architecture context
- [[Idefics 2]] — related VLM with cross-attention and unified-sequence variants
- [[Hugging Face Transformers]] — model library
- [[Modality-as-Tokens]] — architectural pattern
