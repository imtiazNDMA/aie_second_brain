---
title: "Multi-Agent Collaboration Mechanisms: A Survey of LLMs"
type: source
authors: [Khanh-Tung Tran, Dung Dao, Minh-Duong Nguyen, Quoc-Viet Pham, Barry O'Sullivan, Hoang D. Nguyen]
tags: [agentic-ai, multi-agent, orchestration, survey, collaboration]
sources: [arxiv:2501.06322]
venue: arXiv preprint (2025)
created: 2026-05-09
updated: 2026-05-09
---

# Multi-Agent Collaboration Mechanisms: A Survey of LLMs

**arXiv:** [2501.06322](https://arxiv.org/abs/2501.06322)
**Date submitted:** January 11, 2025
**Affiliations:** University College Cork (Ireland), Pusan National University (South Korea)

## Summary

Provides a unified five-axis taxonomy for classifying LLM-based **multi-agent systems (MAS)** along the dimensions Actors × Types × Structures × Strategies × Coordination Protocols. The survey introduces the term **coopetition** (combined cooperation and competition) as a first-class collaboration mode and connects classical multi-agent systems theory with modern LLM-agent frameworks (AutoGen, MetaGPT, CAMEL, CrewAI). Application domains analyzed include 5G/6G networking, Industry 5.0, question answering, and social/cultural simulation.

## Key Takeaways

### The five-axis taxonomy

| Axis | Values | What it captures |
|------|--------|------------------|
| **Actors** | Specialist / generalist agents; tool agents; human-in-the-loop | Who participates |
| **Types** | Cooperation / competition / **coopetition** | Why they interact |
| **Structures** | Peer-to-peer / centralized / distributed | Topology of interactions |
| **Strategies** | Role-based / model-based | How decisions are made |
| **Coordination protocols** | Synchronous / asynchronous; turn-taking; voting; debate | How synchronization happens |

### Coopetition — the under-discussed mode

The paper's most useful contribution is naming **coopetition**: agents that simultaneously cooperate (share goals or partial results) and compete (vie for the best output, judging each other). Examples: agent debate frameworks where two agents argue and a third judges; multi-agent code-generation where N candidates are generated in parallel and the best is selected.

### Patterns mapped to existing frameworks

- **Centralized + role-based** → MetaGPT, ChatDev (PM/architect/engineer/QA roles, central orchestrator)
- **Peer-to-peer + cooperation** → CAMEL, AutoGen group chat
- **Distributed + coopetition** → multi-agent debate, society-of-mind
- **Hierarchical + role-based** → CrewAI (manager-worker, delegated subtasks)

### Open challenges identified

- **Evaluation**: no standard benchmarks for multi-agent emergent behavior (vs. single-agent task success)
- **Scalability**: token cost grows superlinearly with agent count; coordination overhead dominates
- **Reliability**: cascading errors, deadlock, and emergent miscommunication
- **Safety/governance**: who is accountable when an agent collective takes a harmful action?
- **Theory-of-mind**: agents lack robust models of other agents' beliefs and intentions

### Application domains surveyed

- **5G/6G networks** — spectrum allocation, edge orchestration
- **Industry 5.0** — human-machine collaborative manufacturing
- **Question answering** — multi-hop reasoning via specialist decomposition
- **Social/cultural** — simulation of group dynamics, agent-based social science

## Why this matters for the wiki

Your existing pages [[Multi-Agent Systems]], [[Agent Orchestration Platforms]], [[Mixture of Agents]] and [[Coordinator-Worker-Delegator Model]] each describe one slice of the design space. This survey provides the **classification scaffolding** that ties them together — and adds the **coopetition** primitive, which is genuinely novel for your taxonomy.

## Connections

- [[Khanh-Tung Tran]] — lead author (new entity)
- [[Multi-Agent Collaboration]] — concept (new)
- [[Coopetition]] — concept (new, brief)
- [[Multi-Agent Systems]] (existing — to be enriched with taxonomy reference)

## Related Concepts

- [[Multi-Agent Collaboration]] (new — primary contribution)
- [[Coopetition]] (new — novel collaboration type)
- [[Multi-Agent Systems]] (existing — broadest hub)
- [[Agent Orchestration Platforms]] (existing — concrete instantiations)
- [[Mixture of Agents]] (existing — one specific pattern)
- [[Coordinator-Worker-Delegator Model]] (existing — role-based pattern)
- [[Planner-Executor-Evaluator Pattern]] (existing — coopetition exemplar)
- [[AutoGen]], [[CrewAI]], [[LangGraph]] (existing entities — frameworks classified)
