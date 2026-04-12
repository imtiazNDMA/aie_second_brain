---
title: Semantic Kernel
type: entity
tags: [framework, microsoft, orchestration]
sources: [2026-04-12-ai-agents-in-action]
created: 2026-04-12
updated: 2026-04-12
---

# Semantic Kernel

Microsoft’s open-source orchestration SDK for mixing semantic prompts with native code plugins when building AI agents.

## Summary

- Lets developers define semantic functions (prompt templates) with inputs/context variables and wire them to connectors like OpenAI or Azure OpenAI.
- Supports native plugins (C#, Python) so imperative code can be invoked from semantic flows, enabling API wrappers (TMDB, weather, file systems).
- Integrates with GPT interfaces, enabling skills to be exposed as GPT actions or as services within the [[GPT Assistants Playground]].

## Connections

- Powers deterministic tool execution described in [[OpenAI Function Calling]] and [[Custom Actions]].
- Used within [[Agentic Behavior Trees]] to provide reusable skills.
