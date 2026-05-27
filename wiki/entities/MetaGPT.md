---
title: MetaGPT
type: entity
tags: [framework, multi-agent, agent-orchestration]
sources: [2026-05-09-multi-agent-collaboration-survey]
created: 2026-05-09
updated: 2026-05-09
---

# MetaGPT

## Identity

Open-source multi-agent framework that simulates a complete software-development organization. Roles include Product Manager, Architect, Project Manager, Engineer, and QA Engineer; each role is an LLM agent specialized via system prompts and equipped with tool access. Originally published as "MetaGPT: Meta Programming for Multi-Agent Collaborative Framework" (Hong et al., ICLR 2024).

## Architecture

In the [[Multi-Agent Collaboration]] taxonomy, MetaGPT is canonically:

- **Actors**: specialist agents (PM, architect, engineer, QA)
- **Type**: cooperation (no inter-agent competition)
- **Structure**: centralized — orchestrator routes work between roles
- **Strategy**: role-based — each agent has a fixed identity defined by system prompt
- **Coordination protocol**: turn-taking — outputs of one role become inputs to the next

The orchestrator (a "boss" agent or programmatic state machine) follows a software-development SOP: requirement → design → API spec → implementation → tests. Each step is owned by the appropriate role agent.

## Distinguishing features

- **SOP-driven** — agents follow a Standard Operating Procedure encoded as a deterministic workflow
- **Document-centric** — agents communicate via structured documents (PRD, technical design doc, code) rather than free-form chat
- **End-to-end code generation** — typical demos take a high-level requirement and produce a small but runnable codebase

## Comparison to peers

| Framework | Style | Best for |
|-----------|-------|----------|
| **MetaGPT** | SOP, role-based, centralized | Software development workflows |
| **ChatDev** | Role-based, centralized | Software dev (lighter SOP than MetaGPT) |
| **AutoGen** | Group chat, peer-to-peer | Open-ended brainstorming, debate |
| **CAMEL** | Two-agent role-play, peer | Task decomposition via dialogue |
| **CrewAI** | Role-based, hierarchical | Manager–worker delegation |

## Related Pages

- [[Multi-Agent Collaboration]] — taxonomy hub
- [[Multi-Agent Systems]] — broader category
- [[Coordinator-Worker-Delegator Model]] — MetaGPT's structural pattern
- [[AutoGen]], [[CrewAI]], [[LangGraph]] — peer frameworks

## Sources

- [[2026-05-09-multi-agent-collaboration-survey]] — surveyed as a centralized + role-based exemplar
