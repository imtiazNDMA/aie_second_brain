---
tags: [agents, collaboration, orchestration]
sources: [2026-04-12-building-agentic-ai-systems]
created: 2026-04-12
updated: 2026-04-12
---

# Coordinator-Worker-Delegator Model

## Definition

Role-based collaboration pattern where a coordinator manages goals, workers execute specialized tasks, and delegators hand off subtasks to new agents when workloads branch.

## Usage

- Encourages explicit communication contracts and shared memory so crews stay aligned.
- Helps scale complex projects by isolating responsibilities (planning vs execution vs task spawning).
- Often implemented in frameworks like CrewAI or [[LangGraph]] where role prompts define capabilities and guardrails.

## Related Concepts

- [[Multi-Agent Systems]]
- [[Agent Components]]
