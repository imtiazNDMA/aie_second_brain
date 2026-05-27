---
title: DeepSeek-R1
type: entity
tags: [model, reasoning-models, llm, open-weights]
sources: [2026-05-09-deepseek-r1]
created: 2026-05-09
updated: 2026-05-09
---

# DeepSeek-R1

## Identity

The flagship 2025 reasoning model from [[DeepSeek-AI]]. First peer-reviewed reasoning model published in *Nature* (645:633-638, 2025), demonstrating that frontier-tier reasoning capability can be elicited from a base LLM via reinforcement learning on verifiable rewards.

## Architecture & training

- **Base model**: DeepSeek-V3-Base (mixture-of-experts)
- **RL algorithm**: [[GRPO]] (Group Relative Policy Optimization)
- **Reward design**: rule-based ([[RLVR]]) — accuracy on math/code + format compliance
- **Pipeline (R1)**: cold-start data → reasoning RL → rejection sampling → generic RL

The companion model **DeepSeek-R1-Zero** uses no SFT cold-start — pure RL from base — and demonstrates that reasoning behavior is RL-elicitable without supervised reasoning data, though at the cost of readability.

## Benchmarks

| Benchmark | DeepSeek-R1 | OpenAI o1-1217 |
|-----------|-------------|----------------|
| AIME 2024 | 79.8% | 79.2% |
| MATH-500 | 97.3% | 96.4% |
| Codeforces (Elo) | 2029 | comparable |
| MMLU | 90.8% | comparable |
| GPQA Diamond | strong | strong |

## Distilled family

R1 was distilled into six dense models, all open-weight:

- DeepSeek-R1-Distill-Qwen-1.5B / 7B / 14B / 32B
- DeepSeek-R1-Distill-Llama-8B / 70B

Distill-Qwen-32B exceeds OpenAI-o1-mini on multiple reasoning benchmarks, demonstrating that reasoning distills into small dense models effectively.

## Significance

- First **peer-reviewed** (Nature) frontier reasoning model
- Open weights, open recipe — sharply democratized the paradigm
- Reframed alignment training around verifiable rewards instead of preference data
- Made [[GRPO]] the de-facto RL algorithm for reasoning-model training

## Related Pages

- [[DeepSeek-AI]] — organization
- [[GRPO]] — training algorithm
- [[RLVR]] — training paradigm
- [[Reasoning Models]] — model class
- [[Test-Time Compute Scaling]] — capability enabled
- [[Chain-of-Thought]] — substrate
- [[2026-05-09-deepseek-r1]] — full source summary

## Sources

- [[2026-05-09-deepseek-r1]] — DeepSeek-AI, *Nature* 645:633-638 (2025); arXiv:2501.12948
