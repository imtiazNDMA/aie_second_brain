---
title: 003 - Why AI Agents Fail in Production
type: carousel-draft
tags: [instagram, agents, reliability, ai-engineering]
sources: [Agent Failure Taxonomy, Agent Operations, Agent Trust and Safety Controls]
created: 2026-09-11
updated: 2026-09-11
status: drafting
---

# 003 - Why AI Agents Fail in Production

## Brief

- Content level: Judge
- Content pillar: Agents and compound systems
- Audience problem: Agent reliability is blamed entirely on model intelligence.
- Reader outcome: Diagnose failures across reasoning, tools, memory, control flow, safety, output quality, and operations.
- Primary wiki concept: [[Agent Failure Taxonomy]]
- Supporting wiki sources: [[Agent Operations]], [[Agent Trust and Safety Controls]]
- Thesis: Agent reliability is a property of the whole execution system, not only the model.
- Desired action: Label the failure class before changing the model or prompt.
- Slide-count rationale: Ten slides preserve one diagnostic slide for each of the seven failure classes.

## Hook candidates

1. Your AI agent is not failing only because the model is weak.
2. Seven failure classes can break an agent run.
3. A smarter model will not fix a missing termination rule.
4. Most agent failures are architecture failures wearing a model-shaped mask.
5. Diagnose your agent before swapping the model.

**Selected hook:** A smarter model will not fix a missing termination rule.

## Slide script

### Slide 1 - Cover

**Exact text:**

A smarter model will not fix a missing termination rule.

Why artificial intelligence (AI) agents fail in production.

**Visual direction:** A powerful model engine trapped inside an execution loop with no exit.

### Slide 2 - The wrong diagnosis

**Exact text:**

Agent fails -> blame the large language model (LLM) -> buy a stronger model.

But the failure may live in the prompt, tool, memory, loop, permission boundary, or runtime.

**Visual direction:** A model replacement failing to repair seven surrounding fault indicators.

### Slide 3 - Reasoning failures

**Exact text:**

The agent chooses the wrong plan, ignores constraints, or acts on an unsupported assumption.

Control: evaluate plan steps and action outcomes, then feed trace evidence back into prompts and policies.

**Visual direction:** A decision tree whose plan steps and action outcomes are visible in one trace.

### Slide 4 - Tool failures

**Exact text:**

The model selects the wrong tool, invents arguments, misreads the result, or retries an unsafe action.

Control: restrict available tools, log every call, and route failures to retry, fallback, or human takeover.

**Visual direction:** A restricted tool set feeding an observable call that can route to retry, fallback, or a human.

### Slide 5 - Memory failures

**Exact text:**

The agent forgets critical state, retrieves stale context, or stores an incorrect conclusion as memory.

Control: trace every memory read and write, then test stale, missing, and corrupted context.

**Visual direction:** A memory store separating current, stale, and unverified records.

### Slide 6 - Loop failures

**Exact text:**

The agent repeats actions, chases its own output, or never recognizes completion.

Control: step and time budgets, loop detection, fallback routing, and human takeover.

**Visual direction:** A loop with a budget counter, completion gate, and escalation exit.

### Slide 7 - Safety failures

**Exact text:**

The agent follows malicious instructions, exceeds its authority, or exposes sensitive data.

Control: tool allowlists, explicit policy rules, approval gates, and auditable traces.

**Visual direction:** A permission boundary around tools and data, with a human gate for high-impact actions.

### Slide 8 - Output-quality failures

**Exact text:**

The task finishes, but the result is wrong, incomplete, unsupported, badly formatted, or only partly useful.

Control: evaluate task success, support, formatting, and user intent at the final output.

**Visual direction:** A completed run entering an output-quality gate that checks correctness, support, format, and intent.

### Slide 9 - Operational failures

**Exact text:**

The run times out, costs too much, cannot be replayed, or fails without enough evidence to debug.

Control: full traces, budget caps, fallback routing, replay, and trace review.

**Visual direction:** An execution trace with cost, latency, replay, and fallback lanes.

### Slide 10 - Close

**Exact text:**

Agent reliability is a system property.

Before changing the model, classify the failure.
Then fix the boundary that allowed it.

Next: how to evaluate an agent trajectory, not just its final answer.

**Visual direction:** A seven-part diagnostic wheel converging on a targeted fix rather than a model swap.

## Caption

An agent is a large language model (LLM) inside an execution system. The system supplies tools, state, permissions, control flow, retries, budgets, and observability. Any one of those boundaries can fail even when the model's raw capability is strong.

A useful incident review should classify the failure before proposing a fix. Otherwise, teams keep changing prompts and models while the actual defect remains in the runtime.

Which failure class have you seen most often: reasoning, tools, memory, loops, safety, output quality, or operations?

## Review

- Writing score: pending
- Claims verified: yes
- Copy frozen: no
