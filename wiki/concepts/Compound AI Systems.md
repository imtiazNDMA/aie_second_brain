---
title: Compound AI Systems
type: concept
tags: [agents, architecture, systems, production]
sources: [2026-04-12-building-ai-coding-agents-terminal, 2026-04-29-building-applications-with-ai-agents]
created: 2026-04-30
updated: 2026-04-30
---

# Compound AI Systems

## Definition

**Compound AI Systems** is the architectural framing — popularized by the Berkeley AI Research blog post "The Shift from Models to Compound AI Systems" (Zaharia, Khattab et al. 2024) and embodied in production systems like [[Claude Code]] and OpenDev — that treats production AI applications as *systems of cooperating components*, not single LLM calls. The components include:

- Multiple LLM calls (different sizes, different prompts).
- Retrieval and search.
- Tool execution and external APIs.
- Symbolic verifiers, classifiers, regex parsers.
- Caches, queues, schedulers.
- Control logic (branches, loops, retries).

The system's quality emerges from how these components compose, not from any single component's capability.

## The Bitter Lesson rebuttal

For a decade after Sutton's "Bitter Lesson" (2019), the dominant prior was: *scale the model and let learning replace handcrafted structure*. Compound AI inverts the prior in production. Empirically:

- **AlphaCode** (Google DeepMind, 2022) ranked top 54% on Codeforces using a *large search* over many candidate solutions plus filtering — single-model performance was much worse.
- **GPT-4 with [[Tree-of-Thought]]** beats GPT-4 alone on 24-game by 70 absolute points.
- **Coding agents** ([[Claude Code]], OpenDev, SWE-Agent) achieve 50%+ on SWE-Bench using compound architectures (planner + executor + tools + tests) — single-prompt baselines are <10%.
- **RAG** beats fine-tuning on most knowledge-intensive tasks despite using a smaller generator.

The pattern: a $N$B model + structure beats a $10N$B model alone, *and* costs less.

## Canonical components

A compound AI system typically has a subset of:

| Component | Role | Examples |
|---|---|---|
| **Planner** | Decomposes the task into sub-tasks | LangGraph supervisor, OpenDev planner |
| **Executor** | Performs sub-tasks (tool calls, generation) | [[ReAct]] loop, [[Tool Use]] subroutines |
| **Retriever** | Pulls task-relevant context | [[Embeddings]] + [[Vector Database]], [[BM25]] |
| **Reranker** | Filters/reorders retrieved items | Cross-encoder, [[Reranking]] models |
| **Critic / Verifier** | Validates outputs | LLM-as-judge, unit tests, regex |
| **Memory** | Persists state across calls | Conversation buffer, episodic memory, [[Agent Memory]] |
| **Router** | Sends queries to the right subsystem | Classifier, [[Adaptive RAG]] router |
| **Reflector** | Critiques past attempts to inform future ones | [[Reflexion]], [[Reflection]] |
| **Compactor** | Compresses long histories | LLM summarizer, [[Compaction]] |
| **Tool registry** | Available actions | Function-call schema, MCP server, [[OpenAI Function Calling]] |

## Design patterns

### 1. Specialized model routing

Different sub-tasks go to different models:
- A 7B fast model for *planning* (cheap, frequent).
- A 70B strong model for *generation* (expensive, occasional).
- A 1.5B fine-tuned classifier for *routing* and *guardrails*.

OpenDev formalizes this as **specialized model routing**: each sub-task type maps to the smallest model that solves it acceptably.

### 2. Lazy tool discovery

Don't list 200 tools in every prompt — that bloats context and confuses the model. Instead, register tools with descriptions in a registry; surface only the top-$k$ relevant tools per task (chosen by a small router or embedding similarity). Cuts prompt cost dramatically.

### 3. Context [[Compaction]]

Long conversations or long agent traces overflow context windows. A *compactor* summarizes older turns into a shorter form, preserving entities and decisions. The active context stays bounded; the model still "knows" what happened.

### 4. Extended ReAct (planner + executor)

Two agents share the loop:

- **Planner** — sees only goals and high-level state. Emits next sub-task.
- **Executor** — sees the sub-task and executes it via [[ReAct]] (tool use, file edits, etc.).
- The Planner is rewoken when the Executor reports back.

This separates "what to do" from "how to do it" — each agent's prompt is shorter and more focused than a unified prompt.

### 5. Test-time compute scaling

Spend more compute per query on hard queries. Patterns:
- Run the same chain $N$ times and aggregate ([[Self-Consistency]]).
- Run [[Tree-of-Thought]] search.
- Loop a [[Reflexion]] retry until success or budget exhausted.
- Route hard queries to a [[Reasoning Models|reasoning model]] (DeepSeek-R1, o-series) with explicit [[Test-Time Compute Scaling]] via [[Budget Forcing]].

The compound system *chooses how much compute to spend* per query — variable budget, not fixed. Modern compound systems often pair a fast generalist with a reasoning model invoked only on flagged-hard queries — see [[Reasoning Models]].

### 6. Tool-driven evaluation

Replace "did the model produce the right answer?" with "did the tool agree?":
- Code agents: did the tests pass?
- SQL agents: did the query parse and return rows?
- Math agents: does a verifier confirm the proof?

External verifiers turn unreliable LLM evaluation into reliable signals — and double as *training signals* for [[Reflexion]] or DPO.

## Why compound systems are hard

| Challenge | Why it matters |
|---|---|
| **Latency** | $N$ sequential LLM calls = $N\times$ latency. Mitigate via parallel calls, caching, smaller models. |
| **Cost** | Easy to spend 10–100× the cost of a single call. Mitigate via routing, caching, batching. |
| **Debugging** | Failures span components — was it retrieval, generation, or the verifier? Need traces. |
| **Evaluation** | End-to-end metrics blur per-component quality. Need component-level evals. |
| **Reliability** | Each component is a failure point; system reliability is the *product* of components. |
| **Drift** | Each component has its own distribution; upstream changes break downstream. |

[[LLMOps]] and observability (traces, evals, replays) are not optional for compound systems — they are the difference between a working demo and a working product.

## Comparison: single-model vs compound

| Axis | Single LLM call | Compound AI system |
|---|---|---|
| Quality on hard tasks | Limited by model | Limited by orchestration |
| Latency | Low (1 forward pass) | Higher (multiple calls + tools) |
| Cost per query | Predictable | Variable |
| Determinism | Fixed by sampling | Variable by routing/retries |
| Debuggability | Black box | Per-component traces |
| Improvement path | Bigger model | Better components / orchestration |
| Iteration speed | Slow (retrain) | Fast (swap a component) |

## OpenDev / Claude Code as compound system

[[Claude Code]] and OpenDev are reference implementations:

```
User request
   ↓
Planner (small fast model) ←─── Compaction (summarize old turns)
   ↓
Sub-tasks
   ↓
Executor (large strong model)
   ├─→ Tool: read file
   ├─→ Tool: edit file
   ├─→ Tool: run tests
   └─→ Tool: run shell
   ↓
Verifier (test runner)
   ↓
Reflector (small model)  ─── if failed
   ↓
Memory  ─── feedback into Planner on next turn
```

Each component is independently swappable — and is, every release.

## Connections

- [[ReAct]] — the core executor pattern
- [[Reflexion]] — common reflector implementation
- [[Tree-of-Thought]] — search overlay for hard sub-tasks
- [[Self-Consistency]] — voting overlay
- [[Multi-Agent Systems]] — special case where components are agents
- [[Coordinator-Worker-Delegator Model]] — three-role pattern within compound systems
- [[Agent Memory]] — persistence layer
- [[Agent Components]] — taxonomy of building blocks
- [[Retrieval-Augmented Generation]] — retrieval substrate
- [[LLMOps]] — operational discipline
- [[Modular RAG]] — RAG-specific compound architecture
- [[Claude Code]] — reference implementation
- [[OpenAI Function Calling]] / [[Model Context Protocol]] — tool registry standards
- [[Reasoning Strategies]] — taxonomy entry
