---
tags: [agents, architecture, autonomy]
sources: [2026-04-12-building-agentic-ai-systems, 2026-04-29-llmops-managing-large-language-models-in-production]
created: 2026-04-12
updated: 2026-04-29
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

## LLMOps Considerations

From [[LLMOps]]:
- Agentic systems introduce unique operational challenges including monitoring complexity, security risks (prompt injection, jailbreaking), and reliability concerns
- LLMOps for agentic systems requires specialized evaluation metrics beyond traditional ML metrics
- Operational considerations include agent-to-agent communication protocols, memory management, and tool orchestration
- Security practices (LLMSecOps) are particularly important for agentic systems due to their autonomous action capabilities
- Infrastructure scaling must account for the computational demands of multi-agent reasoning and planning

## Related Concepts

- [[Agent Components]]
- [[Coordinator-Worker-Delegator Model]]
- [[Agent Trust and Safety]]
- [[LLMOps]] — Operational framework for managing agentic systems in production
- [[LLMSecOps]] — Security operations for LLM and agentic systems
- [[Retrieval-Augmented Generation]] — Often integrated with agentic systems for knowledge access
- [[Prompt Engineering]] — Critical for controlling agent behavior
