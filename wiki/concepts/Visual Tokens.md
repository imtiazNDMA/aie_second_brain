# Visual Tokens
---
tags: [concept, cluster/vision-multimodal]
created: 2026-09-12
updated: 2026-09-12
sources: [2026-09-12-vision-language-models-building-vlms]
---

Visual tokens are the discrete or continuous representations that vision-language models use to encode visual information from images. They bridge the gap between visual inputs and language model processing.

## Overview

In VLMs, images are processed by a vision encoder (e.g., ViT, SigLIP) and projected into a token space that the language model can process. These visual tokens compete with text tokens for attention and KV-cache budget.

## Key Concepts

- **Token persistence**: Visual tokens occupy KV-cache slots for the entire sequence, unlike text tokens that are consumed during generation
- **Token compression**: Strategies to reduce visual token count (e.g., pooling, learned compression) to improve efficiency
- **Packing efficiency**: The ratio of useful visual information to total tokens consumed
- **Resolution scaling**: Higher resolution images produce more visual tokens, increasing compute cost

## Challenges

- High token count for high-resolution images (e.g., 1000+ tokens per image)
- KV-cache pressure when processing multiple images
- Trade-off between visual detail and computational cost

## Related
- [[Vision Language Models]]
- [[Vision Transformer]]
- [[KV Cache]]
- [[Multimodal Tokenization]]

## Sources
- [[2026-09-12-vision-language-models-building-vlms]]
