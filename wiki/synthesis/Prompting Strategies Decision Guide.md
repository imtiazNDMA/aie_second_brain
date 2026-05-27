---
title: Prompting Strategies Decision Guide
type: synthesis
tags: [prompting, reasoning, chain-of-thought, react, tree-of-thought, decision-guide]
sources: [2026-04-12-prompt-engineering-llms, 2026-04-29-hands-on-llms, 2026-05-09-deepseek-r1, 2026-05-09-s1-test-time-scaling]
created: 2026-05-09
updated: 2026-05-09
---

# Prompting Strategies Decision Guide

The wiki has 8+ prompting strategies as atomic pages — [[Chain-of-Thought]], [[ReAct]], [[Tree-of-Thought]], [[Self-Consistency]], [[Reflexion]], [[Step-Back Prompting]], [[HyDE]], [[Reasoning Strategies]] — but no single page that says *which one to use when*. This synthesis sorts them by **what failure mode each fixes**, **what they cost in tokens**, and **how they compose with reasoning models** (where some strategies become redundant).

## The map

```
                        Single forward pass
                               ↓
                       [[Chain-of-Thought]]   (prompt the model to think step-by-step)
                               ↓
                   ┌─────────────┴──────────────┐
                   ↓                            ↓
              Sample K chains             Search a tree
        [[Self-Consistency]]            [[Tree-of-Thought]]
                   ↓                            ↓
                   └─────── Add tools ──────────┘
                               ↓
                          [[ReAct]]   (Reason + Act loop)
                               ↓
                       Add an evaluator + retry
                               ↓
                          [[Reflexion]]
                               ↓
                  ┌────────────┴─────────────┐
                  ↓                          ↓
        Pre-retrieval techniques        Reasoning models
        ([[HyDE]], [[Step-Back Prompting]])  (built-in CoT, see [[Reasoning Models Landscape]])
```

## What each fixes

| Strategy | Fails when… (failure mode it addresses) | Token cost |
| --- | --- | --- |
| Plain prompt | One-shot easy tasks | 1× |
| [[Chain-of-Thought]] | Multi-step reasoning required, model jumps to wrong answer | 1.5–3× |
| [[Self-Consistency]] | CoT with single sample is unreliable; answer is short and verifiable | K× (typically K=5–10) |
| [[Tree-of-Thought]] | Problem requires deliberate search and backtracking | 5–50× |
| [[ReAct]] | Task needs *external information or actions*, not just reasoning | 2–10× per loop iteration |
| [[Reflexion]] | Agent loops without learning from past failures | 2–5× per attempt |
| [[Step-Back Prompting]] | Specific question, abstract corpus | 2× |
| [[HyDE]] | Lexical mismatch between query and corpus (RAG context) | 2× |
| Few-shot examples | Format / style consistency needed | 1.2–2× depending on demos |

## The decision flow

```
What's the failure mode?
│
├── Model gives the wrong answer to multi-step reasoning
│   ├── Reasoning model available? → just use it (CoT is built-in, see Reasoning Models Landscape)
│   ├── No, want cheap → Chain-of-Thought + few-shot
│   ├── Need higher reliability → Self-Consistency (K=5–10)
│   └── Hard search problem → Tree-of-Thought
│
├── Model needs information it doesn't have
│   ├── External knowledge → RAG (see RAG Architecture Decision Guide)
│   ├── External actions / tools → ReAct
│   └── Both → ReAct over a retrieval tool
│
├── Model loops or repeats failures
│   └── Reflexion (verbal self-critique → retry)
│
├── Model retrieves the wrong context (RAG)
│   ├── Lexical gap → HyDE
│   ├── Specific-vs-abstract gap → Step-Back Prompting
│   └── See Pre-Retrieval Techniques for RAG
│
└── Model produces inconsistent style or format
    └── Few-shot examples (3–5 demos)
```

## How reasoning models change the picture

The 2025 [[Reasoning Models]] wave (R1, s1, o1) made **CoT obsolete as a prompting technique** for those models — they emit long-form reasoning whether you ask for it or not. The implications:

| Strategy | Vs. base model | Vs. reasoning model |
| --- | --- | --- |
| CoT | Big lift on hard tasks | Redundant — already trained behavior |
| Self-Consistency | Big lift | Modest — reasoning is more confident; lift smaller |
| Tree-of-Thought | Big lift | Modest — already explores alternatives internally |
| ReAct | Big lift | Still essential — reasoning models still need tool access |
| Reflexion | Big lift | Still essential — failure-driven retry orthogonal to reasoning |
| Few-shot | Useful | Often *harms* — reasoning chains get derailed by demos |
| Step-back / HyDE | RAG-only | Same — these are pre-retrieval, not reasoning techniques |

For reasoning models, the dominant prompting strategy is **clear task statement + tool definitions + clear stop condition**. Less is more.

## Composing strategies

These layer cleanly:

| Combination | When |
| --- | --- |
| CoT + Self-Consistency | Hard reasoning, answer is short and verifiable |
| CoT + Few-shot | Reasoning + format consistency |
| ReAct + Reflexion | Agentic tasks where retries should learn from failure |
| ReAct + RAG (HyDE/Step-Back) | Agent that retrieves and acts |
| ToT + Tools | Open-ended problem-solving with external lookups |
| Self-Consistency + ReAct | Run K agent traces, vote on final answer |

What rarely composes well:

- **CoT + ToT** — CoT is single-chain, ToT is multi-chain; pick one
- **Self-Consistency + Reasoning model** — diminishing returns; reasoning models are already self-consistent-ish
- **Few-shot + Reasoning model** — usually a regression; demos derail reasoning chains

## Cost-vs-quality Pareto (rough)

```
Quality
  │                              ToT + Tools
  │                          ●
  │                    ReAct + Reflexion
  │              ●
  │          Self-Consistency
  │       ●
  │    CoT
  │  ●
  │ Plain
  │●
  └──────────────────────────────► Token cost
```

The right place on this curve depends on:

- **Task value** — high-value tasks (legal, medical, financial) earn the higher-cost strategies
- **Latency budget** — Self-Consistency is K× slower; ToT is much slower
- **Verifiability** — strategies pay off more when there's a way to validate the answer

## Practical tips from *Prompt Engineering for LLMs*

[[2026-04-12-prompt-engineering-llms]] (Berryman & Ziegler) frames prompting as the [[LLM Application Loop]] — understand task, design prompt, evaluate, iterate. Key practices that compose with the strategies above:

- **Show, don't tell** — few-shot examples beat instruction prose
- **Externalize structure** — when you can, ask for JSON or another structured output; reduces format error
- **Position matters** — instructions at start, output target at end; long context decays in the middle (lost-in-the-middle)
- **Negative examples** — when style/format matters, show what *not* to do
- **Self-evaluation** — ask the model to grade its own output before returning it (closer to [[Reflexion]] than to a separate strategy)

The [[SOMA Evaluation Framework]] from the same book is the rubric you use to evaluate prompt quality across iterations.

## Anti-patterns

1. **"Think step by step" cargo-culting** — it works because it triggers CoT behavior, not because the literal phrase is magic. With reasoning models, it adds noise.
2. **Stuffing every strategy together** — CoT + few-shot + Self-Consistency + ReAct + Reflexion turns a 1× call into a 50× call for marginal lift.
3. **Few-shot with mismatched format** — demos that don't match the target format hurt more than they help.
4. **Using ToT for tasks that have a verifiable answer** — Self-Consistency is cheaper and works better there.
5. **Skipping the evaluation harness** — you can't tune prompting strategies without measurement. See [[Prompt Evaluation Workflows]].

## Where this synthesis stops and others begin

- **For RAG-specific input-side techniques** (HyDE, Step-Back, RAG-Fusion) → [[Pre-Retrieval Techniques for RAG]]
- **For agent-loop architectures** (Coordinator-Worker, MoA, debate) → [[Multi-Agent Collaboration Taxonomy]]
- **For evaluating prompts** → [[Prompt Evaluation Workflows]]
- **For reasoning-model-specific test-time control** (Budget Forcing) → [[Reasoning Models Landscape]]

## Related pages

- [[Chain-of-Thought]], [[Self-Consistency]], [[Tree-of-Thought]], [[ReAct]], [[Reflexion]], [[Step-Back Prompting]], [[HyDE]] — atomic strategies
- [[Reasoning Strategies]] — broader hub
- [[Prompt Engineering]] — discipline hub
- [[LLM Application Loop]], [[SOMA Evaluation Framework]] — evaluation context
- [[Reasoning Models Landscape]] — what changes when CoT is built into the model
- [[Pre-Retrieval Techniques for RAG]] — input-side prompting (HyDE, step-back live in both worlds)
- [[Prompt Evaluation Workflows]] — sibling synthesis (measurement)
- [[Multi-Agent Collaboration Taxonomy]] — sibling synthesis (multi-agent prompting)
