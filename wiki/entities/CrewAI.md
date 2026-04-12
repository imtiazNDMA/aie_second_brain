---
title: CrewAI
type: entity
tags: [multi-agent, framework, orchestration]
sources: [2026-04-12-ai-agents-in-action]
created: 2026-04-12
updated: 2026-04-12
---

# CrewAI

Multi-agent orchestration framework that models each agent with a role, goal, backstory, and tools, then runs them sequentially or hierarchically to finish projects.

## Summary

- Crews are defined in YAML or Python with agent/task definitions, memory settings, and output channels (console, files).
- Supports “jokester” demos, coding crews, and evaluator patterns where reviewer agents critique worker output.
- Integrates with [[AgentOps]] for monitoring and includes safeguards for runaway loops, cost overruns, or repeated reasoning.

## Connections

- Complements conversational frameworks like [[AutoGen]].
- Reinforces [[Agent Components]] such as persona design and tool assignment.
