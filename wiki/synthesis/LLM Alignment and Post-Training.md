---
title: LLM Alignment and Post-Training
type: synthesis
tags: [alignment, post-training, rlhf, dpo, rlvr, fine-tuning]
sources: [2026-04-12-llm-engineers-handbook, 2026-04-12-ultimate-guide-fine-tuning, 2026-05-09-deepseek-r1]
created: 2026-05-09
updated: 2026-05-09
---

# LLM Alignment and Post-Training

A pretrained base model is fluent but not useful: it doesn't follow instructions, it isn't safe, and it doesn't know when to refuse. Alignment is the umbrella term for the post-pretraining steps — supervised fine-tuning, preference optimization, and reinforcement learning — that turn a base model into a deployable assistant. The 2024–2025 wave produced a confusing alphabet soup of preference-optimization variants ([[RLHF]], [[Direct Preference Optimization|DPO]], [[ORPO]], [[KTO]], [[RLVR]], [[GRPO]]) with overlapping but non-equivalent strengths. This synthesis maps each to data needs, infra cost, and the use case where it's the right answer.

## The pipeline (canonical 2025 stack)

```
Base model
  → Supervised Fine-Tuning (SFT) on instruction data
    → Preference Optimization (DPO / ORPO / KTO / RLHF)
      → [optional] RL from Verifiable Rewards (RLVR / GRPO)
        → Aligned model
```

Each stage answers a different question:

| Stage | Question it answers | Data signal |
| --- | --- | --- |
| Pretraining | "What is plausible language?" | Raw text |
| SFT | "What does a good response look like?" | (prompt, response) pairs |
| Preference optimization | "Which of these responses is better?" | (prompt, chosen, rejected) — pairwise OR (prompt, response, +/-) — pointwise |
| RLVR | "Is this response correct?" | (prompt, response, score) from a verifier |

## The preference-optimization family

The big 2023–2025 shift was *away from* full RLHF (PPO + reward model) and *toward* reference-free closed-form alternatives. Each method trades one of: reference model, paired data requirement, separate-stage SFT, RL infrastructure.

| Method | Loss | Reference model | Data shape | Multi-stage? | Infra | When |
| --- | --- | --- | --- | --- | --- | --- |
| [[RLHF]] (PPO) | Policy gradient on learned reward | Yes (KL anchor) | Pairwise → reward model → rollouts | Yes (3 stages: SFT, RM, RL) | RL stack required | Frontier labs, you have rollout infra |
| [[Direct Preference Optimization\|DPO]] | Closed-form max-likelihood on preferences | Yes (frozen SFT model) | (prompt, chosen, rejected) | Yes (SFT then DPO) | Standard SFT trainer | Open-source default; pair data available |
| [[ORPO]] | SFT NLL + odds-ratio penalty in one loss | **No** | (prompt, chosen, rejected) | **No** — single stage | Standard SFT trainer | You want one training pass; small/mid models |
| [[KTO]] | Kahneman-Tversky utility on per-sample +/- | Yes (frozen ref) | (prompt, response, label) — **unpaired** | Yes | Standard SFT trainer | Production thumbs-up/down logs; pair data unavailable |
| [[RLVR]] / [[GRPO]] | Group-relative reward z-scores; no value critic | Yes (KL anchor optional) | (prompt, sample) with rule-based grader | Yes | RL stack required | Verifiable tasks (math, code, formal) |

### Quick selection logic

- **Have pair data, no production logs** → [[Direct Preference Optimization|DPO]]
- **Have only thumbs-up/down logs from production** → [[KTO]]
- **Want a single-stage recipe, small-model territory** → [[ORPO]]
- **Tasks are verifiable (math, code, formal)** → [[RLVR]] / [[GRPO]] (this is the [[DeepSeek-R1]] / [[Reasoning Models]] recipe)
- **You're a frontier lab with rollout infra** → [[RLHF]] still has the highest ceiling on open-ended tasks
- **You need to combine open-ended preferences and verifiable correctness** → DPO + RLVR sequentially

## Reference-free vs. reference-anchored

A subtle but important axis. The "reference model" is a frozen copy of the SFT checkpoint that the loss penalizes the trained model for diverging from. It prevents reward hacking but doubles GPU memory.

| Class | Reference model | GPU memory | Risk profile |
| --- | --- | --- | --- |
| RLHF, DPO, KTO | Frozen SFT model | 2× weights | Anchored; safer |
| ORPO | None | 1× weights | Lighter; slightly more drift |
| RLVR (anchored) | Frozen base | 2× weights | Anchored |
| RLVR (unanchored) | None | 1× weights | DeepSeek-R1-Zero territory; emergence + instability |

For a 48GB local GPU, reference-anchored methods (DPO, KTO) on a 7B–13B base are the practical sweet spot: the doubled memory still fits, and the anchor keeps things from going off the rails.

## Parameter-efficient overlay

All preference methods compose with [[Parameter-Efficient]] adapters — they don't have to update full weights. See [[Parameter-Efficient Fine-Tuning]] for the matrix; the headline is:

- [[Low-Rank Adaptation|LoRA]] adapters on top of any of the above → 1–10% of trainable params, same loss
- [[QLoRA]] (4-bit base + LoRA) → consumer-GPU territory; the [[LLM Twin]] recipe in [[2026-04-12-llm-engineers-handbook]] uses QLoRA + DPO end-to-end
- For RLVR/GRPO, LoRA works but interactions with rollout stability are an active research area

## Distillation as alignment shortcut

When the goal is to get an aligned model cheaply, **distillation from a strong aligned model** beats any of the optimization methods above on a fixed budget:

- [[Distillation]] on (prompt, teacher response) — pure SFT, no preferences needed
- The [[2026-05-09-s1-test-time-scaling|s1]] recipe — 1K curated reasoning traces from Gemini, plain SFT, $50 of compute, matches or beats much more expensive RL recipes
- Trade-off: capped by teacher quality; can't discover new behavior the teacher doesn't have

Distillation is the right answer when an open-weights teacher already exhibits the behavior you want. It's the wrong answer when you need *novel* alignment (a new safety policy, a domain-specific style the teacher doesn't have).

## Data requirements (rule-of-thumb)

| Stage | Order-of-magnitude examples | Sources of data |
| --- | --- | --- |
| SFT | 10K–100K | Curated public sets (Alpaca, ShareGPT), hand-written, distilled |
| DPO / ORPO | 5K–50K pairs | UltraFeedback, HH-RLHF, internal preference annotations |
| KTO | 5K–500K labeled samples | Production thumbs-up/down logs, automated graders |
| RLHF (RM) | 10K–100K pairs to train reward model | Pair annotations, RLHF preference datasets |
| RLHF (RL rollouts) | Millions of generated tokens | Synthetic / on-policy generations |
| RLVR | 1K–10K verifiable problems × many rollouts | Math, code, formal datasets with checkers |

Data quality matters more than quantity past a threshold — the [[2026-04-12-ultimate-guide-fine-tuning|Ultimate Guide]] (CeADAR) and [[2026-04-12-llm-engineers-handbook|LLM Engineer's Handbook]] both emphasize that 1K excellent pairs beat 10K mediocre pairs.

## Failure modes by method

| Method | Typical failure mode | Mitigation |
| --- | --- | --- |
| RLHF | Reward hacking on the learned RM | KL anchor, RM ensembles, regular RM refresh |
| DPO | Over-optimization, "DPO mode collapse" | Stop early; β tuning; mix with SFT loss |
| ORPO | Less anchored than DPO; mild drift | Validate against held-out preference set |
| KTO | Sensitive to label-class imbalance | Class-weighted loss; stratified sampling |
| RLVR | Grader-gaming (writes solutions that fool the checker) | Audit graders; ensemble graders; spot-check outputs |
| Distillation | Inherits teacher's blind spots | Pair with held-out evaluation set; mix in original supervised data |

## Where this fits in the lifecycle

- Stage 4 of the [[Seven-Stage Fine-Tuning Pipeline]] is alignment-method selection — exactly this decision.
- The full recipe shows up in the [[LLM Twin]] case study: SFT → DPO with LoRA adapters, snapshot to [[Comet ML]], deploy via [[ZenML]].
- Reasoning models add an RLVR step on top: SFT → preferences → RLVR (or RLVR-only à la R1-Zero). See [[Reasoning Models Landscape]].

## Related pages

- [[RLHF]], [[Direct Preference Optimization]], [[ORPO]], [[KTO]], [[RLVR]], [[GRPO]] — atomic methods
- [[Distillation]] — alignment shortcut
- [[Parameter-Efficient Fine-Tuning]] — adapter overlay
- [[Seven-Stage Fine-Tuning Pipeline]] — full lifecycle
- [[LLM Twin]] — production case study
- [[Reasoning Models Landscape]] — RLVR's headline use case
- [[Fine-Tuning]] — broader hub
- [[LLM Ops Toolchain]] — tooling that wraps these training stages
