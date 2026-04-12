---
title: AutoGen
type: entity
tags: [multi-agent, framework, microsoft, automation]
sources: [2026-04-12-ai-agents-in-action]
created: 2026-04-12
updated: 2026-04-12
---

# AutoGen

Open-source framework from Microsoft Research for orchestrating multi-agent conversations among LLM-powered assistants and tool workers.

## Summary

- AutoGen Studio offers a GUI to wire proxy agents, assistants, shared chats, and skills without coding.
- Core library supports registering tools/skills (e.g., `describe_image`), critics that review intermediate outputs, caches that reuse prior reasoning, and group chat modes.
- Emphasizes conversational coordination, allowing developer-defined roles to debate, plan, and hand off tasks while logging each “thought”.

## Connections

- Contrasted with [[CrewAI]] for its conversational focus vs task/role pipelines.
- Instrumented with [[AgentOps]] to observe token usage, cost, and loop patterns.
