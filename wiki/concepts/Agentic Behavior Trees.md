---
tags: [behavior-tree, autonomy, orchestration]
sources: [2026-04-12-ai-agents-in-action]
created: 2026-04-12
updated: 2026-04-12
---

# Agentic Behavior Trees

## Definition

Behavior trees adapted for AI agents, combining selector/sequence nodes with LLM-driven workers (Hacker, Judge, Verifier) to manage complex workflows.

## Highlights

- Implemented with `py_trees` to define nodes that tick agents, evaluate results, and route control flow.
- [[GPT Assistants Playground]] supplies the assistants and actions executed at each node, including local code execution guarded by permissions.
- Supports concurrency (agents running in separate threads), guard nodes for rate limiting, and logging hooks to inspect each tick.

## Related Concepts

- [[Multi-Agent Systems]] — ABTs are one orchestration approach.
- [[Agent Components]] — Planning + feedback pillar often realized via behavior trees.
