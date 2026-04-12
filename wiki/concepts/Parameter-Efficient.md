---
tags: [fine-tuning, efficiency, peft]
sources: [2026-04-12-ultimate-guide-fine-tuning, 2026-04-12-llm-engineers-handbook]
created: 2026-04-12
updated: 2026-04-12
---

# Parameter-Efficient

## Definition

Strategies that adapt large models by updating only a small subset of parameters (e.g., adapters, LoRA/[[QLoRA]], DoRA, Half Fine-Tuning) rather than all weights. Reduces VRAM needs, speeds training, and preserves base-model knowledge.

## Techniques

- **[[Low-Rank Adaptation]] / [[QLoRA]]** — Inject low-rank matrices or quantized adapters into transformer layers.
- **[[Half Fine-Tuning]]** — Alternating which layers update per round to keep footprint small.
- **[[Mixture of Agents]] / MoE** — Route requests to specialized experts so each fine-tune stays lightweight.

## When to Use

- Limited GPU memory or desire to fine-tune on consumer hardware.
- Need to maintain multiple domain variants without storing full copies.
- Rapid iteration scenarios where full fine-tunes are cost-prohibitive.

## Related Concepts

- [[Seven-Stage Fine-Tuning Pipeline]]
- [[Direct Preference Optimization]]
