---
title: Multi-Agent Collaboration
type: concept
tags: [agentic-ai, multi-agent, orchestration, taxonomy]
sources: [2026-05-09-multi-agent-collaboration-survey]
created: 2026-05-09
updated: 2026-05-09
---

# Multi-Agent Collaboration

## Definition

**Multi-agent collaboration** is the design space of how LLM-based agents interact to accomplish goals together. The 2025 survey by Tran et al. (arXiv:2501.06322) provides a five-axis taxonomy that organizes the space:

$$\text{System} = \langle \text{Actors}, \text{Types}, \text{Structures}, \text{Strategies}, \text{Coordination Protocols} \rangle$$

This concept page is the taxonomy hub. Concrete patterns ([[Coordinator-Worker-Delegator Model]], [[Planner-Executor-Evaluator Pattern]], [[Mixture of Agents]]) and concrete frameworks ([[AutoGen]], [[CrewAI]], [[LangGraph]]) are instances within this scheme.

## The five axes

### 1. Actors — who participates

- **Specialist agents** — narrow expertise (researcher, coder, fact-checker)
- **Generalist agents** — broad capability with role steering
- **Tool agents** — wrappers around external systems (search, code execution)
- **Human-in-the-loop** — humans as actors with the same protocol surface

### 2. Types — why they interact

- **Cooperation** — agents share goals and partial results
- **Competition** — agents work against each other (debate, adversarial review)
- **Coopetition** — both simultaneously: cooperate on the goal, compete on contribution quality

[[Coopetition]] is the survey's most useful conceptual addition — it names the pattern where multiple agents propose solutions in parallel and the system selects the best (cooperating on outcome, competing on individual contribution).

### 3. Structures — topology

- **Centralized** — one orchestrator routes work to others (MetaGPT, ChatDev, [[Coordinator-Worker-Delegator Model]])
- **Peer-to-peer** — agents talk directly, often via group-chat surface (AutoGen group chat, CAMEL)
- **Distributed / hierarchical** — tree or graph of teams, each with internal structure (CrewAI's manager-crew model)

### 4. Strategies — decision-making

- **Role-based** — each agent has a fixed identity (PM, architect, tester); steered by system prompts
- **Model-based** — each agent maintains beliefs about other agents and reasons about them (theory-of-mind style)

Most production systems are role-based; model-based MAS is largely research.

### 5. Coordination protocols — synchronization

- **Turn-taking** — strict order, common in dialog-style MAS
- **Asynchronous broadcasting** — pub/sub on a shared channel
- **Voting / consensus** — collective decision rules
- **Debate** — structured pro/con followed by judge
- **Auction / market** — bid-based task allocation (less common in LLM MAS, more in classical MAS)

## Mapping frameworks to the taxonomy

| Framework | Actors | Type | Structure | Strategy | Protocol |
|-----------|--------|------|-----------|----------|----------|
| **MetaGPT** | specialist | cooperation | centralized | role-based | turn-taking |
| **ChatDev** | specialist | cooperation | centralized | role-based | turn-taking |
| **AutoGen** | mixed | cooperation/coopetition | peer-to-peer | role-based | group-chat |
| **CAMEL** | specialist | cooperation | peer-to-peer | role-based | turn-taking |
| **CrewAI** | specialist | cooperation | hierarchical | role-based | turn-taking |
| **Society-of-Mind / debate** | generalist | coopetition | peer-to-peer | role-based | debate + judge |
| **Mixture-of-Agents (MoA)** | generalist | coopetition | layered | model-based | parallel + aggregate |

## When to use which

- **Centralized + role** — well-defined workflows with clear handoffs (software development, document processing)
- **Peer-to-peer + cooperation** — open-ended brainstorming, complementary specialist input
- **Coopetition + debate/voting** — high-stakes decisions where you need diversity of approaches
- **Hierarchical** — tasks that decompose recursively (research → subtopics → questions)

## Open challenges (per survey)

- **Evaluation** — no standard benchmarks for emergent multi-agent behavior
- **Scalability** — token cost grows superlinearly with agent count and conversation length
- **Reliability** — cascading errors, deadlock, miscommunication
- **Safety / governance** — accountability for collective harmful actions
- **Theory-of-mind** — robust modeling of other agents remains research

## Related Concepts

- [[Multi-Agent Systems]] — broader hub
- [[Coopetition]] — collaboration type
- [[Coordinator-Worker-Delegator Model]] — centralized + role-based instantiation
- [[Planner-Executor-Evaluator Pattern]] — coopetition exemplar
- [[Mixture of Agents]] — coopetition + layered structure
- [[Agent Orchestration Platforms]] — concrete framework comparison
- [[Agentic Systems]] — single-agent counterpart
- [[Agent Memory Architectures]] — cross-cutting concern
- [[AutoGen]], [[CrewAI]], [[LangGraph]], [[MetaGPT]] — framework entities

## Sources

- [[2026-05-09-multi-agent-collaboration-survey]] — Tran et al., arXiv:2501.06322 (2025)

## Open Questions

- Token-cost scaling of coopetition vs. cooperation as agent count grows
- Whether emergent miscommunication can be prevented architecturally
- Standard benchmarks for multi-agent emergent capability
- Mapping classical multi-agent system theory (auctions, contract nets) onto LLM MAS
