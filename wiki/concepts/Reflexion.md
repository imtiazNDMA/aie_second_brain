---
title: Reflexion
type: concept
tags: [agents, reflection, reinforcement-learning, prompting]
sources: [2026-04-12-prompt-engineering-llms, 2026-04-12-ai-agents-in-action]
created: 2026-04-30
updated: 2026-04-30
---

# Reflexion

## Definition

**Reflexion** (Shinn et al. 2023) is a "verbal reinforcement learning" framework: an agent runs a [[ReAct]] trajectory, observes whether it succeeded or failed, then writes a *natural-language critique* of its own performance. The critique is appended to the agent's persistent memory and read at the start of the next attempt. No model weights change — only the prompt evolves.

It is the canonical pattern for **learning from failure within a single deployment**, and contrasts with parameter-update methods like [[RLHF]] and [[Direct Preference Optimization]].

## Architecture

Reflexion has three roles, all played by LLMs (often the same one with different prompts):

1. **Actor** — runs a ReAct loop on the task. Uses tools, observes results, produces a final answer.
2. **Evaluator** — labels the trajectory as success/failure. Source: an external grader (unit tests, ground truth) or another LLM.
3. **Self-Reflector** — given the trajectory and the verdict, writes a 1–3 sentence verbal critique: *what went wrong, what to try differently next time*.

The critiques accumulate in a fixed-size **episodic memory buffer**. On the next attempt, the Actor's prompt is prefixed with the recent critiques.

```
[reflections]
1. Last attempt I called search_web before reading the README. Read first.
2. The error pattern was missing imports; I should run the test command after each edit.

[task] <user request>
[ReAct loop continues...]
```

## Pseudocode

```python
def reflexion(task, max_trials=3):
    memory = []
    for trial in range(max_trials):
        trajectory = react_actor(task, memory_prefix=memory)
        verdict = evaluator(task, trajectory)
        if verdict == "success":
            return trajectory.answer
        critique = reflector(task, trajectory, verdict)
        memory.append(critique)
        if len(memory) > MAX_MEMORY:
            memory.pop(0)
    return trajectory.answer  # best effort
```

## Why "verbal RL"?

Classical RL updates a parameterized policy via reward gradients. Reflexion updates the prompt — a non-parametric memory — via natural-language reward shaping. The mapping:

| RL term | Reflexion analog |
|---|---|
| Policy $\pi_\theta$ | LLM + prompt |
| Trajectory $\tau$ | ReAct transcript |
| Reward $r(\tau)$ | Evaluator's success/failure label |
| Policy update | Append critique to memory |
| Replay buffer | Episodic memory |

It is **gradient-free** but still benefits from feedback signals. The key requirement is an evaluator that can label outcomes — without one, Reflexion has nothing to reflect on.

## Empirical results (Shinn 2023)

| Benchmark | Baseline ReAct | Reflexion | Δ |
|---|---|---|---|
| HotpotQA (multi-hop QA) | 30% | 51% | +21 |
| AlfWorld (text adventure) | 75% | 100% | +25 |
| HumanEval (code) | 80% | 91% | +11 |

Gains compound across trials; most of the lift comes between trial 1 and trial 3.

## Variants

| Variant | Difference |
|---|---|
| **Trajectory-level Reflexion** | One critique per failed attempt (original) |
| **Step-level Reflexion** | Critique each ReAct step — finer-grained but noisier |
| **Reflexion + retrieval** | Memory grows unbounded; retrieve top-$k$ relevant critiques per task |
| **Reflexion + DPO** | Use successful/failed trajectories as preference pairs to update weights — bridges verbal and parametric RL |
| **R3A Loop** | [[Mira S. Devlin]]'s variant adding explicit Reflection between Reasoning and Action — see [[R3A Loop]] |

## When Reflexion helps

- **Tasks with clear success criteria** (unit tests, exact-match QA, game completion).
- **Repeatable tasks** — gains compound only across multiple attempts on similar problems.
- **Long-running agents** with persistent state across sessions (coding agents, research agents).
- **Sparse-reward problems** where intermediate actions matter but only the end is graded.

## When it doesn't

- **One-shot tasks** with no retry budget.
- **Tasks without an evaluator** — verbal critiques without ground truth become confabulation.
- **Tasks where failure is silent** (e.g., subtly wrong but plausible answers) — the model can't reflect on a bug it didn't notice.
- **Long-tail bug distributions** — memory grows faster than retrieval can filter.

## Failure modes

1. **Critique drift** — the reflector blames the wrong cause; subsequent attempts overfit to a non-issue.
2. **Memory poisoning** — once a confident-but-wrong critique enters memory, it shapes all future attempts.
3. **Memory bloat** — without retrieval, the prefix grows past the context window.
4. **Evaluator gaming** — the actor learns to satisfy the evaluator's pattern (e.g., output format) without solving the problem.

## Operational guidance

- **Cap memory** at 3–5 most recent critiques unless using retrieval.
- **Use a separate model for the reflector** when possible; same-model reflection inherits the actor's blind spots.
- **Validate critiques** — apply a human review or LLM-as-judge filter to gate critiques entering memory.
- **Reset memory per task family** — critiques about coding bugs don't help summarization tasks.

## Test-time compute framing

Reflexion is the canonical **iterative** form of [[Test-Time Compute Scaling]] — spending compute across N retry attempts with verbal memory between them. Compare to [[Self-Consistency]] (parallel sampling), [[Tree-of-Thought]] (search), and [[Budget Forcing]] (sequential extension within a single attempt). The four families compose: a [[Reasoning Models|reasoning model]] can run Reflexion-style retries, each retry containing budget-forced thinking, optionally inside a tree search.

## Connections

- [[ReAct]] — the substrate Reflexion runs on top of
- [[Reflection]] — the broader concept; Reflexion is a structured form
- [[Test-Time Compute Scaling]] — Reflexion is the iterative-retry family member
- [[Reasoning Models]] — composable; reasoning models within a Reflexion loop
- [[Budget Forcing]] — within-attempt compute spending
- [[R3A Loop]] — alternative reflection-aware loop
- [[Self-Consistency]] — flat alternative; doesn't learn across attempts
- [[Tree-of-Thought]] — orthogonal: search vs retry
- [[RLHF]] — parametric counterpart with weight updates
- [[RLVR]] — verifiable-reward parametric counterpart (analog of Reflexion's evaluator signal)
- [[Direct Preference Optimization]] — bridge between verbal and parametric RL
- [[Agent Memory]] — Reflexion's critiques are a form of episodic memory
- [[Reasoning Strategies]] — taxonomy entry
