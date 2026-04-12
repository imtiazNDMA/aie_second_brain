---
title: Parameter-Efficient Fine-Tuning
type: synthesis
tags: [fine-tuning, peft, comparison]
sources: [2026-04-12-ultimate-guide-fine-tuning, 2026-04-12-llm-engineers-handbook]
created: 2026-04-12
updated: 2026-04-12
---

# [[Parameter-Efficient]] Fine-Tuning

Modern stacks rarely run full-model updates; instead they combine adapter-style methods from [[2026-04-12-ultimate-guide-fine-tuning]] with the pragmatic workflows described in [[2026-04-12-llm-engineers-handbook]]. The table below summarizes the main strategies surfaced across the wiki.

| Approach | Mechanics | Best For | Notes |
| --- | --- | --- | --- |
| [[Low-Rank Adaptation]] (LoRA/DoRA) | Inject rank-decomposed matrices into attention/FFN weights; only adapters train | Domain pivots where base model must stay intact | Easy to layer on top of Hugging Face trainers and [[ZenML]] stacks; combine with quantization for latency gains |
| [[QLoRA]] | Quantize base model to 4-bit, train LoRA adapters in higher precision | Commodity GPUs or laptops, rapid experiments | Handbook’s Llama 3.1 8B run uses [[QLoRA]] + DPO to ship the [[LLM Twin]] quickly |
| [[Half Fine-Tuning]] | Alternate which layers update per round to cap GPU memory | Teams that need more control than adapters provide | Works well when paired with routing/[[Mixture of Agents]] to isolate specialist layers |
| Routing/MoA | Maintain several lightweight experts and dispatch via controllers | Multi-skill assistants (summaries, coding, safety) | Mentioned in Ultimate Guide as an alternative to giant single checkpoints |

## Implementation Stack

- **Pipelines:** [[ZenML]] orchestrates dataset prep → PEFT training → evaluation, while [[Comet ML]] logs adapter weights, hyperparameters, and metrics.
- **Alignment:** Run [[Direct Preference Optimization]] over adapter outputs (as in the [[LLM Twin]] project) to preserve tone without full retrains.
- **Lifecycle fit:** Stage 4 of the [[Seven-Stage Fine-Tuning Pipeline]] explicitly calls for choosing PEFT vs full runs; adapters make rollback, A/B testing, and model registry promotion trivial.

## Recommendations

1. **Start with LoRA/[[QLoRA]]**, collect offline benchmarks, then graduate to Half Fine-Tuning only if quality plateaus.
2. **Snapshot adapters separately** from base weights to reduce storage and enable mix-and-match deployments across environments.
3. **Instrument evaluation early** using the handbook’s tooling combo (Comet + [[Opik]]) so regressions are caught before deployment.
