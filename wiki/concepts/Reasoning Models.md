---
title: Reasoning Models
type: concept
tags: [reasoning-models, test-time-compute, rlvr, llm, alignment]
sources: [2026-05-09-deepseek-r1, 2026-05-09-s1-test-time-scaling]
created: 2026-05-09
updated: 2026-05-09
---

# Reasoning Models

## Definition

**Reasoning models** are LLMs explicitly trained to produce extended internal chains of thought before answering — spending substantially more inference compute per query in exchange for higher accuracy on hard problems (math, code, scientific reasoning). They differ from prompting-only [[Chain-of-Thought]] in that the long-form reasoning is *trained behavior* the model emits whether or not the prompt asks for it.

## Defining characteristics

1. **Trained, not prompted, to reason** — extended reasoning emerges from objective rather than instruction
2. **Test-time compute scaling** — accuracy improves monotonically with thinking-token budget
3. **Verifiable-reward training signal** — typically trained on tasks with rule-based correctness checks
4. **Emergent self-verification** — models exhibit autonomous backtracking, alternative-strategy exploration, error correction

## The two training recipes

The 2024–2025 reasoning-model wave produced two complementary playbooks:

### Recipe A: RL on verifiable rewards ([[DeepSeek-R1]])

Apply [[GRPO]] (or PPO) with rule-based rewards to a base model. Reward = `correct_answer ? 1 : 0`, optionally combined with a format reward. Reasoning behavior emerges; no human-labeled CoT data needed.

- **Pros**: open-ended exploration, novel reasoning patterns can emerge
- **Cons**: requires verifiable tasks at scale, GPU-hours dominated by RL rollouts
- **Exemplars**: DeepSeek-R1-Zero, DeepSeek-R1, the Kimi-1.5 line, OpenAI's o-series (closed)

### Recipe B: SFT distillation + test-time control ([[2026-05-09-s1-test-time-scaling]])

Train via supervised fine-tuning on a small curated set (e.g., s1K = 1,000 samples) of (question, reasoning, answer) triples sourced from a stronger reasoning model. Add an inference-time intervention like [[Budget Forcing]] to control thinking length.

- **Pros**: cheap (under \$50 for s1), reproducible, requires no RL infrastructure
- **Cons**: capped by the quality of the teacher model; doesn't discover novel reasoning
- **Exemplars**: s1-32B, distilled DeepSeek-R1 variants (Qwen 1.5B–32B, Llama 8B/70B)

## Test-time compute as a new scaling dimension

Pretraining scaling laws (Kaplan, Hoffmann/Chinchilla) and post-training scaling (RLHF, DPO) operate at training time. Reasoning models introduce a third axis: **inference compute**. The relationship is empirically clean — at fixed model size, extending thinking budget produces continued accuracy gains, often surpassing what additional pretraining could deliver at the same dollar cost.

This reframes engineering decisions:
- *Training-time compute* — better base capabilities, cheaper per query
- *Inference-time compute* — higher accuracy on hard tasks, paid per query

## Behaviors that emerge

Reported in DeepSeek-R1's training logs and reproduced by s1:

- **Self-verification** — model rechecks its work before committing
- **Backtracking** — model explicitly abandons a failing approach and starts over
- **Alternative exploration** — "let me try a different approach"
- **Goal decomposition** — breaks the problem into sub-problems mid-stream
- **"Aha moments"** — sudden recognition of a simpler / correct approach (DeepSeek's term)

## Operational implications

- **Cost per query rises 5–50×** vs. non-reasoning models on long-tail hard tasks
- **Latency budgets shift** — minutes of "thinking" can be acceptable for offline analysis, not for chat
- **Routing** — production systems pair a fast generalist with a reasoning model invoked only for hard queries (compound system pattern, see [[Compound AI Systems]])
- **Caching** — answers can be cached aggressively since reasoning is deterministic-ish given the same seed and prompt

## Limitations and open questions

- **Reward hacking on verifiable tasks** — models learn to game the reward signal in subtle ways (writing incorrect-but-checker-pleasing solutions)
- **Generalization off-distribution** — reasoning trained on math/code may not transfer to open-ended reasoning (e.g., legal, ethical, creative)
- **Calibration** — models often produce confident-sounding wrong reasoning chains
- **Reasoning ≠ planning** — token-level thinking still struggles with long-horizon multi-step tool-use plans

## Related Concepts

- [[DeepSeek-R1]] — flagship RL-trained reasoning model
- [[GRPO]] — RL algorithm used to train R1
- [[RLVR]] — broader paradigm of RL from verifiable rewards
- [[Test-Time Compute Scaling]] — the underlying scaling phenomenon
- [[Budget Forcing]] — simplest test-time control method
- [[Chain-of-Thought]] — substrate (prompted version)
- [[Tree-of-Thought]] — search-based generalization at inference
- [[Self-Consistency]] — sampling-based test-time strategy
- [[Reflexion]] — agent-loop test-time strategy
- [[Reasoning Strategies]] — broader hub
- [[Compound AI Systems]] — production architecture combining reasoning and non-reasoning models

## Sources

- [[2026-05-09-deepseek-r1]] — RL recipe; *Nature* 645:633-638 (2025)
- [[2026-05-09-s1-test-time-scaling]] — SFT-distillation recipe; EMNLP 2025

## Open Questions

- What's the empirical scaling-law form for test-time compute (matches pretraining log-linear, or different)?
- Can reasoning be elicited by RL from non-verifiable rewards (legal arguments, scientific writing)?
- Optimal compute split between training-time and inference-time for a given budget?
- Are emergent behaviors transferable across architectures and base models?
