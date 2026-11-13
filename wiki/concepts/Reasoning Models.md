---

title: Reasoning Models
type: concept
tags: [reasoning-models, test-time-compute, rlvr, llm, alignment, cluster/reasoning-prompting]
sources: [2026-05-09-deepseek-r1, 2026-05-09-s1-test-time-scaling, 2026-11-13-build-a-reasoning-model-from-scratch]
created: 2026-05-09
updated: 2026-11-13
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

## Raschka's framing: *Build a Reasoning Model (From Scratch)*

**Definition** (p2–4). Reasoning means the model generates intermediate steps before the final answer, either visibly or inside `<think>…</think>` tags hidden from the user. A reasoning model is an LLM improved, by training *or* prompting, to produce those steps.
- "Reasoning" and "thinking" are used in an engineering sense and do not imply human-like thought.
- Because generation is autoregressive and probabilistic, the steps are not guaranteed to be logically sound even when they look convincing. A symbolic theorem prover, by contrast, is deterministic.

**A spectrum, not a new kind of model** (p13). LLMs sit on a spectrum, and "reasoning model" means a refined version of a capability that already existed. A non-reasoning model such as GPT-4o can still answer some logic puzzles by pattern matching (p11–12). Pattern matching struggles with novel scenarios and long multistep problems (p13). The book cites Apple's "Illusion of Thinking" (2025), which describes reasoning models as sophisticated but very capable pattern matchers (p306).

**Three method families** (p8–9):
1. Inference-time compute scaling. See [[Test-Time Compute Scaling]], [[Self-Consistency]], [[Self-Refinement]].
2. Reinforcement learning. See [[RLVR]], [[GRPO]]. The underlying RL is the same as [[RLHF]]; the two differ in where the reward comes from. Verifier rewards are "more objective but less aligned with human preferences" (p9).
3. [[Distillation]]. This is SFT on text generated by a larger model. It differs from traditional knowledge distillation, where the student also learns from logits.

**History** (p8, p305):
- **First reasoning model.** OpenAI o1-preview (Sept 12, 2024) is "regarded as the first LLM-based reasoning model."
- **First open blueprint.** DeepSeek-R1 (Jan 2025, arXiv 2501.12948) was the first open-source reasoning model with a comprehensive technical report.
- **End of non-CoT models.** On Feb 12, 2025, Sam Altman called GPT-4.5 OpenAI's "last non-chain-of-thought model."

**When not to use one** (p14). Summarization, translation and knowledge QA don't need reasoning models. Reasoning models are more expensive and verbose, and sometimes more error-prone because of overthinking. Reasoning helps with puzzles, advanced math, coding and agents, where it supports task decomposition, planning and tool choice.

**Small-scale numbers** ([[Qwen3]] 0.6B, [[MATH-500]]):

| Setup | Accuracy | Source |
|---|---|---|
| Base model | 15.2% | Table 6.1, p222 |
| Official reasoning variant | 48.2% | Table 6.1, p222 |
| Base + 50 GRPO steps | 47.4% | Table 6.1, p222 |
| Base + 3 epochs distilled from Qwen3 235B-A22B | 44.2% | Table 8.1, p299 |
| Reasoning variant + self-refinement with heuristic scorer | 57.8% | Table 5.1, p176 |

In Chapter 3 the same models scored 15.3% and 50.8% under a different hardware and PyTorch setup (Table 3.1, p91).

**Future directions** (p301–302):
- RLVR for flagship models and distillation for small ones.
- Adaptive reasoning budgets, such as GPT-5's "auto" mode.
- Process and whole-answer rewards, such as DeepSeekMath-V2 (arXiv 2511.22570).
- Reasoning models as the engine of agents (Codex, Claude Code, OpenClaw). This leads to multi-reward training covering tool use, retrieval and policy compliance.

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
- [[Self-Refinement]] — iterative critique-and-revise test-time strategy
- [[MATH-500]] — standard math benchmark for reasoning models
- [[Reflexion]] — agent-loop test-time strategy
- [[Reasoning Strategies]] — broader hub
- [[Compound AI Systems]] — production architecture combining reasoning and non-reasoning models

## Sources

- [[2026-05-09-deepseek-r1]] — RL recipe; *Nature* 645:633-638 (2025)
- [[2026-05-09-s1-test-time-scaling]] — SFT-distillation recipe; EMNLP 2025
- [[2026-11-13-build-a-reasoning-model-from-scratch]] — Raschka 2026; all three method families implemented from scratch on Qwen3 0.6B

## Open Questions

- What's the empirical scaling-law form for test-time compute (matches pretraining log-linear, or different)?
- Can reasoning be elicited by RL from non-verifiable rewards (legal arguments, scientific writing)?
- Optimal compute split between training-time and inference-time for a given budget?
- Are emergent behaviors transferable across architectures and base models?
