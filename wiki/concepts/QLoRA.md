---
tags: [fine-tuning, quantization, peft]
sources: [2026-04-12-ultimate-guide-fine-tuning]
created: 2026-04-12
updated: 2026-04-12
---

# QLoRA

## Definition

Quantized Low-Rank Adaptation that combines 4-bit quantization with low-rank adapters, enabling [[Fine-Tuning]] of large models on commodity GPUs while preserving accuracy.

## Key Points

- Stores base model weights in low-bit precision, training only adapter parameters in higher precision.
- Recommended for constrained hardware scenarios before escalating to full fine-tunes.

## Related Concepts

- [[Low-Rank Adaptation]]
- [[Fine-Tuning]]
