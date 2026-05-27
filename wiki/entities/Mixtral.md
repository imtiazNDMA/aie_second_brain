---
title: Mixtral
type: entity
tags: [model, llm, moe, open-weights, mistral, apache-2]
sources: [2026-05-28-mixture-of-experts-2026]
created: 2026-05-28
updated: 2026-05-28
---

# Mixtral

## Identity

The MoE family from [[Mistral AI]] — **Mixtral 8x7B** (Dec 2023) and **Mixtral 8x22B** (Apr 2024). The first widely-used open-weight [[Mixture of Experts]] models, demonstrating that sparse activation could deliver near-frontier quality at open weights with permissive licensing.

## Architecture

- **8 experts per layer**, top-2 routing.
- **Dense attention** + **sparse FFN** (only the FFN is MoE'd; attention remains dense).
- **SwiGLU** experts.
- **Auxiliary loss** balance (classic approach, predates DeepSeek's bias-based scheme).

| Variant | Total | Active | Notes |
|---|---|---|---|
| **Mixtral 8x7B** | 47B | 12.9B | Dec 2023; first popular open MoE |
| **Mixtral 8x22B** | 141B | 39B | Apr 2024; pushes scale further |

(Note: "8x7B" is somewhat misleading — only the FFN is replicated 8 times; attention is shared. The total is ~47B, not 56B.)

## Benchmarks

- Mixtral 8x7B: ~70% MMLU; competitive with Llama-2 70B at much lower active params.
- Mixtral 8x22B: stronger; competitive with GPT-3.5 in 2024 and many Llama 3 variants in 2025.

## License

**Apache 2.0** — fully permissive open weights.

## Significance

- **Proved MoE could work at open weights** — opened the modern open MoE era.
- **Apache-2 licensing** made it instantly the default for many commercial deployments.
- **Set the template** that DeepSeek-V3 then refined (fine-grained experts, aux-loss-free balancing).

## Related Pages

- [[Mixture of Experts]] — architectural pattern
- [[Mistral AI]] — origin
- [[DeepSeek-V3]] — successor design with fine-grained experts
- [[Llama 4]] — Meta's MoE answer
- [[Modality-as-Tokens]] — synthesis

## Sources

- [[2026-05-28-mixture-of-experts-2026]]
