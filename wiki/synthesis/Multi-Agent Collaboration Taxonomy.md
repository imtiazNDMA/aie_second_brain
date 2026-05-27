---
title: Multi-Agent Collaboration Taxonomy
type: synthesis
tags: [multi-agent, agentic-ai, taxonomy, orchestration, decision-guide]
sources: [2026-05-09-multi-agent-collaboration-survey, 2026-04-12-ai-agents-in-action, 2026-04-12-building-agentic-ai-systems, 2026-04-29-building-applications-with-ai-agents]
created: 2026-05-09
updated: 2026-05-09
---

# Multi-Agent Collaboration Taxonomy

[[Agent Orchestration Platforms]] compares concrete frameworks ([[AutoGen]], [[CrewAI]], [[LangGraph]], [[Semantic Kernel]]) by their feature surfaces. This synthesis sits one layer above: it's the *conceptual* taxonomy from Tran et al.'s 2025 survey ([[2026-05-09-multi-agent-collaboration-survey]]) plus design patterns from *Building Agentic AI Systems* and *AI Agents in Action* — five axes that decide whether a multi-agent system is the right answer at all, and what shape it should take.

## When NOT to use multi-agent

Before the taxonomy, the negative case. Multi-agent systems are *expensive* — token cost grows superlinearly with agent count and conversation length, and the failure modes (deadlock, miscommunication, cascading errors) are real. Single-agent + tool use is the right answer when:

- The task decomposes naturally into one ReAct-shaped loop
- Latency budget is sub-30s
- You can write the system prompt yourself with the necessary roles inline
- There's no genuine need for *parallel diverse perspectives*

Multi-agent earns its cost when the work is genuinely parallelizable, the perspectives are genuinely different, or the workflow has clear hand-offs (PM → architect → coder → tester).

## The five axes (Tran et al. 2025)

A multi-agent system is fully specified by its choice along each:

$$\text{System} = \langle \text{Actors}, \text{Types}, \text{Structures}, \text{Strategies}, \text{Coordination} \rangle$$

| Axis | Choices | What it determines |
| --- | --- | --- |
| Actors | Specialist / generalist / tool / human | Who participates |
| Types | Cooperation / competition / [[Coopetition]] | Why they interact |
| Structures | Centralized / peer-to-peer / hierarchical | Topology |
| Strategies | Role-based / model-based | How decisions are made |
| Coordination | Turn-taking / async broadcast / voting / debate / auction | Synchronization |

Most production systems are: **specialist actors × cooperation × centralized × role-based × turn-taking**. That's the workflow-engine quadrant — MetaGPT, ChatDev, CrewAI live here. The other quadrants exist for specific reasons; pick deliberately.

## The decision flow

```
What's the workload shape?
│
├── Linear pipeline with role hand-offs (PM → coder → tester)
│   └── Centralized + role-based + turn-taking
│       └── MetaGPT, ChatDev, [[Coordinator-Worker-Delegator Model]], CrewAI
│
├── Open-ended exploration with diverse perspectives
│   └── Peer-to-peer + cooperation + role-based + group-chat
│       └── AutoGen group-chat, CAMEL
│
├── High-stakes decision needing dissent
│   └── Coopetition + debate + voting/judge
│       └── Society-of-Mind, multi-agent debate, AI safety review
│
├── Quality lift via diverse generation + aggregation
│   └── Coopetition + layered + parallel-aggregate
│       └── [[Mixture of Agents]] (MoA), best-of-N + judge
│
├── Recursively decomposable (research → subtopics → questions)
│   └── Hierarchical + cooperation + role-based
│       └── CrewAI manager-crew, hierarchical AutoGen
│
└── Self-evaluation loop on a single goal
    └── [[Planner-Executor-Evaluator Pattern]] (often single-agent or 3-agent)
        └── Reflexion-style, R3A loop variants
```

## Mapping concrete patterns

| Pattern | Actors | Type | Structure | Strategy | Coordination |
| --- | --- | --- | --- | --- | --- |
| [[Coordinator-Worker-Delegator Model]] | specialist | cooperation | centralized | role-based | turn-taking |
| [[Planner-Executor-Evaluator Pattern]] | specialist (3 roles) | coopetition | centralized | role-based | turn-taking |
| [[Mixture of Agents]] | generalist | coopetition | layered | role-based | parallel-aggregate |
| MetaGPT (PM/architect/dev/QA) | specialist | cooperation | centralized | role-based | turn-taking |
| ChatDev | specialist | cooperation | centralized | role-based | turn-taking |
| AutoGen group-chat | mixed | cooperation/coopetition | peer-to-peer | role-based | group-chat |
| CAMEL | specialist (2) | cooperation | peer-to-peer | role-based | turn-taking |
| CrewAI | specialist | cooperation | hierarchical | role-based | turn-taking |
| Society-of-Mind / debate | generalist | coopetition | peer-to-peer | role-based | debate + judge |
| Multi-agent debate (2023) | generalist | competition | peer-to-peer | role-based | debate + judge |

## When each *type* earns its cost

### Cooperation

Goal-aligned, complementary contributions. The default and the cheapest. Use when the task decomposes into specialist sub-tasks (research, write, edit, fact-check) and there's no need for adversarial pressure.

**Failure mode:** consensus collapse — agents converge on the first plausible answer without exploring alternatives. Mitigation: add an evaluator agent or switch to coopetition.

### Competition

Agents work against each other. Rare in production; useful for adversarial robustness testing or red-teaming setups.

**Failure mode:** wasted compute when the goal isn't actually adversarial.

### [[Coopetition]] (the most useful conceptual addition from Tran et al.)

Cooperate on the outcome, compete on contribution quality. This is the structure of:

- **[[Mixture of Agents]]** — N agents propose, layer-2 aggregator picks/synthesizes
- **Multi-agent debate** — pro/con agents debate, judge agent decides
- **Best-of-N** — sample N, judge selects (degenerate single-agent coopetition)
- **Reflexion-style** — generator vs. critic with retry loop

Coopetition produces measurably better outputs than pure cooperation on hard tasks, at K× the token cost. Pay it when the answer matters.

## The cost equation

Token cost grows as roughly:

$$\text{Cost} \approx N_\text{agents} \cdot T_\text{turns} \cdot L_\text{context} \cdot p_\text{tokens-per-turn}$$

Each axis multiplies. A 4-agent × 10-turn × 8K-context × 500-token-per-turn workflow is ~1.6M tokens per task — a 16×–80× multiplier over single-agent execution. That's why:

- **Cap turns** with explicit termination conditions, not just "until done"
- **Compress context** — agents shouldn't replay the entire transcript
- **Prefer hierarchy over flat group-chat** at >3 agents — bounds the connection count
- **Use cheaper models** for sub-roles; reserve the strong model for the planner/judge

## Reliability concerns

Per the Tran survey's open challenges, plus pragmatic experience:

| Failure mode | Mitigation |
| --- | --- |
| Cascading errors | Validation gates between hand-offs; checkpoint state |
| Deadlock / non-termination | Hard turn cap; supervisor agent that can force-stop |
| Miscommunication / role drift | Strong system prompts; periodic role re-assertion |
| Token-cost blowup | Context compression; turn cap; model tiering |
| Emergent unsafe collective behavior | Audit transcripts; safety wrapper agent ([[Agent Trust and Safety Controls]]) |
| Evaluation difficulty | Trace-level metrics + outcome eval; see [[Agent Memory Architectures]] for state-tracking |

## Theory-of-mind / model-based MAS

Model-based strategies (where each agent maintains beliefs about other agents and reasons about them) are largely research as of 2026. Production MAS is overwhelmingly role-based — system prompts assign identities, agents follow scripts.

**When model-based pays off:** negotiation, deception detection, classical-MAS tasks (auctions, contract nets). Currently rare in LLM agent stacks.

## Where in this wiki

- [[Multi-Agent Collaboration]] — atomic concept hub; the taxonomy itself
- [[Agent Orchestration Platforms]] — concrete framework comparison (one-layer-down)
- [[Agent Memory Architectures]] — orthogonal cross-cutting concern
- [[Agent Trust and Safety Controls]] — how to keep MAS from misbehaving collectively
- [[AIOps-LLMOps Convergence for Agent Operations]] — operational stance for MAS in prod

## Related pages

- [[Multi-Agent Collaboration]], [[Multi-Agent Systems]] — atomic hubs
- [[Coopetition]], [[Coordinator-Worker-Delegator Model]], [[Planner-Executor-Evaluator Pattern]], [[Mixture of Agents]] — patterns
- [[AutoGen]], [[CrewAI]], [[LangGraph]], [[Semantic Kernel]], [[MetaGPT]] — framework entities
- [[Agent Orchestration Platforms]] — sibling synthesis (frameworks)
- [[Agent Memory Architectures]] — sibling synthesis (state)
- [[Agent Trust and Safety Controls]] — sibling synthesis (safety)
- [[Agentic Systems]], [[Agent Components]] — single-agent counterpart
- [[ReAct]], [[Reflexion]] — single-agent loops MAS often wraps around
