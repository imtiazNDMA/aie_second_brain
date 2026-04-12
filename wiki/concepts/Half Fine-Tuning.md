---
tags: [fine-tuning, strategies]
sources: [2026-04-12-ultimate-guide-fine-tuning]
created: 2026-04-12
updated: 2026-04-12
---

# Half [[Fine-Tuning]]

## Definition

Strategy where only half of a model’s layers (or parameters) are updated in a given run, alternating subsets to balance retention of pretrained knowledge with domain adaptation.

## Benefits

- Cuts compute cost versus full fine-tunes while avoiding some accuracy loss seen in purely adapter-based methods.
- Works alongside routing policies that decide which layers to update per task.

## Related Concepts

- [[Low-Rank Adaptation]]
- [[Mixture of Agents]]
