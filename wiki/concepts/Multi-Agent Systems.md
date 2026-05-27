---
tags: [multi-agent, orchestration, collaboration]
sources: [2026-04-12-ai-agents-in-action, 2026-04-29-building-llm-agents-rag-knowledge-graphs-reflection, 2026-05-09-multi-agent-collaboration-survey]
created: 2026-04-12
updated: 2026-05-09
---

# Multi-Agent Systems

## Definition

Collections of specialized agents that collaborate on tasks through structured conversations, task queues, or shared memory.

## Patterns

- **[[AutoGen]]-style** group chats: agents debate within a mediated conversation, optionally guided by critics and caches.
- **CrewAI** crews: roles plus task lists executed sequentially or hierarchically with reviewers.
- **Behavior-tree crews**: selector/sequence nodes route work between assistants like Hacker/Judge/Verifier.
- Observability (e.g., [[AgentOps]]) is essential for detecting loops, runaway costs, and coordination failures.
- **Planner/Executor/Evaluator triads**: explicit role separation for planning, tool execution, and validation.

## Coordination Notes
- Define explicit communication contracts between roles.
- Use shared memory to avoid duplicated work and preserve context across runs.
- Add conflict-resolution or evaluator arbitration to prevent deadlocks.

## Taxonomy (per the 2025 multi-agent survey)

[[2026-05-09-multi-agent-collaboration-survey]] (Tran et al., arXiv:2501.06322) provides a unified five-axis classification for the design space — see [[Multi-Agent Collaboration]] for the full hub:

- **Actors**: specialist / generalist / tool / human-in-the-loop
- **Types**: cooperation / competition / **[[Coopetition]]** (parallel generation + integration)
- **Structures**: peer-to-peer / centralized / hierarchical
- **Strategies**: role-based / model-based
- **Coordination protocols**: turn-taking / async broadcast / voting / debate / auction

This scaffolding makes it possible to describe AutoGen, MetaGPT, CAMEL, CrewAI, ChatDev, and society-of-mind frameworks on consistent dimensions.

## Related Concepts

- [[Multi-Agent Collaboration]] — taxonomy hub from the 2025 survey
- [[Coopetition]] — first-class collaboration type alongside cooperation/competition
- [[Agent Components]] — Provide a checklist for each agent participating in a system.
- [[Agentic Behavior Trees]] — One orchestration pattern for multi-agent autonomy.
- [[Planner-Executor-Evaluator Pattern]] — Core pattern for scalable collaboration.
- [[Coordinator-Worker-Delegator Model]] — Centralized + role-based instantiation.
- [[Mixture of Agents]] — Coopetition + layered structure.
- [[Agent Orchestration Platforms]] — Concrete framework comparison.
