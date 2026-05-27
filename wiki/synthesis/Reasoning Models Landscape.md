---
title: Reasoning Models Landscape
type: synthesis
tags: [reasoning-models, rlvr, test-time-compute, alignment, distillation]
sources: [2026-05-09-deepseek-r1, 2026-05-09-s1-test-time-scaling]
created: 2026-05-09
updated: 2026-05-09
---

# Reasoning Models Landscape

The 2024–2025 reasoning-model wave introduced a third axis to LLM scaling: **inference-time compute**. [[DeepSeek-R1]] (Nature 2025) and [[2026-05-09-s1-test-time-scaling|s1]] (EMNLP 2025) bracketed the field with two opposite recipes — RL-from-scratch versus 1,000-example distillation — that produce comparable results on math/code benchmarks at radically different costs. This page maps that landscape so an AI engineer can choose a recipe, a base model, and a deployment topology without re-reading the source papers.

## Two recipes, one capability

| Axis | Recipe A: RL on Verifiable Rewards | Recipe B: SFT Distillation + Test-Time Control |
| --- | --- | --- |
| Exemplar | [[DeepSeek-R1]], R1-Zero | [[2026-05-09-s1-test-time-scaling\|s1-32B]] |
| Algorithm | [[GRPO]] (PPO without value critic) on [[RLVR]] | Plain SFT on (Q, reasoning trace, A) triples |
| Training data | Verifiable tasks at scale (math, code, formal) | ~1K curated traces from a stronger reasoning teacher |
| Compute | Thousands of GPU-hours; rollout-dominated | Under \$50 (s1) on 16× H100 for 26 minutes |
| Discovers novel reasoning | Yes — backtracking, self-verification emerge | No — capped by teacher quality |
| Test-time control | Implicit (model decides length) | Explicit ([[Budget Forcing]]: append `Wait` to extend, force end at budget) |
| Open-weights | DeepSeek-R1, R1-distill family | s1-32B, Qwen-distill, Llama-distill |
| Best for | Research labs, frontier capability | Practitioners reproducing capability cheaply |

Both recipes target the same emergent behaviors documented in [[Reasoning Models]]: self-verification, backtracking, alternative-strategy exploration, "aha moments". The Recipe-A → Recipe-B pipeline (train one model with RL, distill its traces into many smaller models) is now the canonical open-weights flow — the R1-distill-Qwen-{1.5,7,14,32}B and R1-distill-Llama-{8,70}B series are exactly this.

## The new scaling axis

Three axes now govern LLM capability planning:

| Axis | Knob | Canonical scaling law | Pays for | Cost model |
| --- | --- | --- | --- | --- |
| Pretraining compute | Tokens × params | Kaplan / Chinchilla | Base capability | Once, amortized |
| Post-training compute | RLHF/[[Direct Preference Optimization\|DPO]]/[[RLVR]] passes | (less formalized) | Alignment, instruction-following | Once per checkpoint |
| **Test-time compute** | Thinking tokens per query | [[Test-Time Compute Scaling]] (log-linear empirically) | Accuracy on hard queries | Per query, monotonic |

Test-time compute is the only axis a serving-side engineer controls *after* the model ships. That is what makes it strategically interesting: a fixed weight set can be tuned on the fly to spend more thinking on a hard ticket, less on a trivial one.

## Decision guide: do I need a reasoning model?

| Signal | Reasoning model | Standard LLM |
| --- | --- | --- |
| Workload contains math / code / formal verification | Yes | No |
| Latency budget is sub-second | No (minutes per query) | Yes |
| Cost-per-query matters more than max accuracy | Maybe ([[Distillation]]) | Yes |
| Tasks are verifiable (test cases, ground-truth answers) | Yes — pairs with [[RLVR]] cleanly | Either |
| Tasks are open-ended (legal arguments, creative writing) | Limited — RLVR generalization off-distribution unproven | Yes |
| You're routing in a [[Compound AI Systems\|compound system]] | Yes — invoke only on hard queries | Yes — fast path |

**Compound-system pattern (production default):** route 90% of traffic to a fast generalist (e.g., GPT-4o-mini, Claude Haiku, Gemma 4-9B), invoke a reasoning model only when a confidence/difficulty classifier flags the query. Cost-per-token of reasoning models is 5–50× the generalist; without routing the bill is unsustainable.

## Test-time control techniques

| Technique | Mechanism | Cost | When |
| --- | --- | --- | --- |
| [[Budget Forcing]] | Append literal `Wait` to extend; force `</think>` to stop | None — pure prompt control | s1-style models; cheapest |
| [[Self-Consistency]] | Sample K chains, majority-vote answer | K× decode cost | When answers are short and distinct |
| [[Tree-of-Thought]] | Maintain search tree of partial reasoning, expand best | Heavy — search overhead | Deep deliberate reasoning |
| [[Reflexion]] | Run [[ReAct]] loop, evaluator critiques, retry with critique prepended | 2–5× | Agentic tasks with feedback |
| [[Chain-of-Thought]] (prompted) | Instruct base model to "think step by step" | None | Non-reasoning models |

For reasoning models specifically, [[Budget Forcing]] is usually the right starting point: it works at inference time with no retraining, gives a clean compute/accuracy dial, and the s1 paper shows it matches or beats more elaborate schemes on AIME/GSM8K/MATH.

## Open-weights model selection (as of 2026-05)

| Model | Recipe | Size | License | Notes |
| --- | --- | --- | --- | --- |
| DeepSeek-R1 | RL ([[GRPO]] + [[RLVR]]) | 671B MoE | MIT | Frontier capability; matches o1-1217 on AIME/MATH/Codeforces |
| DeepSeek-R1-Distill-Qwen-{1.5,7,14,32}B | SFT distillation from R1 | 1.5–32B | MIT | Best small-model reasoning; 32B beats o1-mini on most reasoning benches |
| DeepSeek-R1-Distill-Llama-{8,70}B | SFT distillation from R1 | 8B / 70B | MIT (Llama license applies) | Llama-shaped weights for ecosystem compatibility |
| s1-32B | SFT on s1K (1K samples from Gemini Thinking) | 32B | Apache 2.0 | Cheapest reproduction of reasoning capability; budget-forcing native |

For the local A6000-Ada / 48GB / 128GB DRAM target, the practical sweet spot is **DeepSeek-R1-Distill-Qwen-32B** at 4-bit quantization (~20GB) or **s1-32B** at the same quant. Both leave headroom for KV cache and concurrent generalist serving.

## Operational implications

1. **Cost shifts from training to serving** — once you adopt a reasoning model, the bill follows queries, not weight updates. Capacity planning has to track p99 thinking-token length, not just throughput.
2. **Latency budgets need a new tier** — "interactive" (< 1s), "deliberative" (1–10s), and "analytical" (10s–10min) are distinct UX categories. Reasoning models live in the third tier.
3. **Caching becomes high-value** — reasoning is approximately deterministic given seed and prompt; aggressive answer caching pays back fast.
4. **Routing is mandatory** — use a small classifier or self-confidence signal to gate reasoning-model invocation; see [[Compound AI Systems]].
5. **Evaluation shifts to verifiable tasks** — [[GSM8K]], [[MMLU]], AIME, Codeforces, MATH are the contract benchmarks; chat benchmarks like [[MT-Bench]] under-measure reasoning improvements.
6. **Reward hacking is a real risk** — RLVR-trained models will exploit checker quirks (writing answers that pass the grader but are wrong). Audit graders before trusting them.

## What's still open

- **Off-domain transfer** — reasoning trained on math/code may not transfer to legal, ethical, creative reasoning. Empirical only.
- **Calibration** — reasoning chains often look authoritative when wrong; downstream consumers need to treat confidence carefully.
- **Reasoning ≠ planning** — long-horizon multi-step tool use still benefits from explicit agent loops ([[ReAct]], [[Reflexion]]) on top of a reasoning base.
- **Optimal compute split** — for a fixed dollar budget, when does it pay to scale pretraining vs. test-time? No clean answer yet.

## Related pages

- [[Reasoning Models]] — atomic concept hub
- [[DeepSeek-R1]], [[GRPO]], [[RLVR]] — Recipe A primitives
- [[2026-05-09-s1-test-time-scaling]], [[Budget Forcing]], [[Distillation]] — Recipe B primitives
- [[Test-Time Compute Scaling]] — the underlying scaling phenomenon
- [[Chain-of-Thought]], [[Tree-of-Thought]], [[Self-Consistency]], [[Reflexion]] — adjacent inference-time techniques
- [[Compound AI Systems]] — the production deployment pattern
- [[LLM Alignment and Post-Training]] — how RLVR fits into the broader alignment toolkit
- [[LLM Inference Optimization Stack]] — what makes long-form reasoning serveable
- [[Prompting Strategies Decision Guide]] — how reasoning-model behavior changes which prompting strategies are worth using
