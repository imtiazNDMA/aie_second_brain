---
title: Coopetition
type: concept
tags: [agentic-ai, multi-agent, collaboration]
sources: [2026-05-09-multi-agent-collaboration-survey]
created: 2026-05-09
updated: 2026-05-09
---

# Coopetition

## Definition

**Coopetition** is a collaboration mode in [[Multi-Agent Systems]] where agents simultaneously **cooperate on the shared goal** and **compete on individual contribution quality**. The system aligns on the outcome (correct answer, completed task) but agents are evaluated against one another for what part of that outcome they contributed.

The term is borrowed from business/strategy literature; the 2025 multi-agent survey (Tran et al., arXiv:2501.06322) elevated it to a first-class collaboration type alongside pure cooperation and pure competition.

## Why this is a useful primitive

Pure cooperation collapses agents into a single voice — useful for handoff, less useful for diversity. Pure competition produces conflicting outputs but no integration. Coopetition occupies the middle: **diverse approaches → integration step → single outcome**. The judge / aggregator step is what makes the cooperation real; the parallel generation is what makes the competition real.

## Concrete patterns

- **Multi-agent debate** — two or more agents argue positions; a separate judge agent selects the winning argument
- **[[Mixture of Agents]] (MoA)** — N agents draft answers in parallel; a final aggregator synthesizes their outputs
- **Best-of-N with judge** — sample N independent attempts; LLM-as-judge selects the best
- **Society-of-Mind** — agents take adversarial roles (proposer / critic) iteratively
- **[[Self-Consistency]] (degenerate case)** — same model, multiple samples, majority vote — coopetition where the "agents" are reasoning chains rather than personas

## Structural recipe

A coopetition system has three parts:

1. **Generators** ($G_1, G_2, ..., G_N$) — independent attempts at the task
2. **Evaluator(s)** — judge that compares or scores the generations
3. **Aggregator** — produces the single outcome (selection, synthesis, or vote)

The generators don't communicate during their work (or communicate minimally). The evaluator and aggregator are typically the same component.

## When coopetition outperforms cooperation

Coopetition adds value when:

- **The task admits multiple valid approaches** — different framings produce genuinely different solutions worth comparing
- **A judge/verifier can discriminate** — the evaluator is meaningfully better than random
- **Compute is available for parallel generation** — N× generators means N× cost during the parallel phase

If the task has one clear approach, coopetition is wasted compute. If the verifier is weak, coopetition amplifies noise.

## When coopetition fails

- **Verifier weakness** — the aggregator is the bottleneck; bad judges select bad answers
- **Mode collapse** — if all generators come from the same base model with similar prompts, "diversity" is illusory
- **Token cost** — N parallel agents over a long conversation can balloon costs faster than benefits accrue

## Related Concepts

- [[Multi-Agent Collaboration]] — taxonomy hub where coopetition sits as one of three types
- [[Multi-Agent Systems]] — broader category
- [[Mixture of Agents]] — concrete coopetition pattern
- [[Self-Consistency]] — single-model degenerate case
- [[LLM-as-Judge]] — typical evaluator/aggregator
- [[Compound AI Systems]] — production architectures often use coopetition for high-stakes paths
- [[Reflection]] — single-agent self-coopetition (proposer + critic = same agent)

## Sources

- [[2026-05-09-multi-agent-collaboration-survey]] — Tran et al., arXiv:2501.06322 (2025); names coopetition as a first-class collaboration type
