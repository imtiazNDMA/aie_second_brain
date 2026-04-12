---
tags: [fine-tuning, peft, efficiency]
sources: [2026-04-12-ultimate-guide-fine-tuning]
created: 2026-04-12
updated: 2026-04-12
---

# Low-Rank Adaptation

## Definition

[[Parameter-Efficient]] [[Fine-Tuning]] (PEFT) method that injects trainable low-rank matrices into [[Transformer]] weight updates, drastically reducing the number of adjusted parameters.

## Highlights

- Supports rapid domain adaptation without full-model retraining.
- Compatible with quantized backbones and routing strategies (DoRA, LoRA+, etc.).

## Related Concepts

- [[QLoRA]]
- [[Half Fine-Tuning]]
