---

title: Brain-Perception-Action Agent Model
type: concept
tags: [agents, architecture, tool-use, cluster/agents]
sources: [2026-07-07-building-ai-agents-with-llms-rag-knowledge-graphs]
created: 2026-07-07
updated: 2026-07-07
---


# Brain-Perception-Action Agent Model

## Definition

The brain-perception-action model is a practical decomposition for LLM applications: the **brain** is the LLM plus memory, **perception** modules ingest and transform user/environment data, and **action** modules invoke tools, APIs, models, or external systems.

## Related Concepts

- [[Agentic Systems]] - broader architecture category.
- [[Agent Components]] - complementary five-pillar checklist for personas, actions, knowledge, reasoning, and planning.
- [[Tool Use]] - action-layer mechanism.
- [[Agent Memory]] - part of the brain layer when external state is needed.
- [[Retrieval-Augmented Generation]] - memory/knowledge access pattern.

## Sources

- [[2026-07-07-building-ai-agents-with-llms-rag-knowledge-graphs]] - Uses the interface/brain/perception/tools/prompts breakdown for LLM-based applications.

## Open Questions

- Where should deterministic workflow logic live: outside the LLM as application code, inside an agent framework, or inside prompts?
- How much perception should be handled by specialist models before the LLM sees the task?
