---
tags: [agents, architecture, autonomy]
sources: [2026-04-12-building-agentic-ai-systems]
created: 2026-04-12
updated: 2026-04-12
---

# Agentic Systems

## Definition

AI systems that can perceive, reason, plan, and act with varying degrees of autonomy—ranging from reactive assistants to deliberative, self-optimizing crews.

## Architecture Patterns

- **Deliberative**: World models, planners, and goal-based execution.
- **Reactive**: Fast stimulus-response agents for latency-sensitive tasks.
- **Hybrid**: Combine planning depth with reflex loops, often orchestrated through frameworks like [[AutoGen]], CrewAI, or [[LangGraph]].

## Design Considerations

- Clear separation of personas, actions, knowledge/memory, reasoning, and planning pillars.
- Trust, transparency, and safety guardrails to keep actions auditable.
- Workflow orchestration (Coordinator/Worker/Delegator) for multi-agent collaboration.

## Related Concepts

- [[Agent Components]]
- [[Coordinator-Worker-Delegator Model]]
- [[Agent Trust and Safety]]
