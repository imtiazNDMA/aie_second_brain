---
title: DeepSeek-R1
type: entity
tags: [model, reasoning-models, llm, open-weights]
sources: [2026-05-09-deepseek-r1, 2026-11-13-build-a-reasoning-model-from-scratch]
created: 2026-05-09
updated: 2026-11-13
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

## As described in *Build a Reasoning Model (From Scratch)*

Raschka (2026) adds:

- **Significance.** The first open-source reasoning model with a comprehensive technical report (p305).
- **Size.** It has 671B parameters; the small variants were made by distilling from the 671B teacher (p268).
- **Clipping.** It used very weak policy-ratio clipping (ε = 10) (p246).
- **Batching.** It generates a pool of 8,192 rollouts once and steps through it in 16 minibatches (p247–248).
- **Reference refresh.** The KL reference model is replaced every 400 steps (p250).
- **PRMs.** The team tried process reward models for intermediate-step scoring without success, and kept final-answer correctness rewards (p201). See [[Process Reward Model]].
- **R1-Zero.** Applying RL directly to the base model skipped SFT and preference tuning. The result was generally less accurate than the full pipeline but showed clear, robust reasoning (p182).

**As a distillation teacher** ([[Distillation]]):
- **Generating data.** Answering 12,000 MATH training problems via OpenRouter cost about $50 (p272–273).
- **Teacher accuracy.** It scored 90.6% on that training set (p276) and 91.2% on [[MATH-500]] in the book's setup (p300).
- **Student results.** [[Qwen3]] 0.6B reached 30.6–33.6% over three epochs. With Qwen3 235B-A22B as teacher, the student reached 44.2–45.0% (Table 8.1, p299).

**Benchmark caveat.** The table above lists MATH-500 97.3% from the R1 paper. The book's 91.2% comes from its own prompt, generation settings and verifier. The two numbers measure different evaluation setups and should not be compared directly.

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
- [[2026-11-13-build-a-reasoning-model-from-scratch]] — Raschka 2026; R1 as distillation teacher and GRPO reference
