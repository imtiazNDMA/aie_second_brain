---
title: Nexus Agent Platform
type: entity
tags: [platform, streamlit, agents]
sources: [2026-04-12-ai-agents-in-action]
created: 2026-04-12
updated: 2026-04-12
---

# Nexus Agent Platform

Streamlit-based agent platform introduced in *AI Agents in Action* for hosting chat UIs backed by personas, tool registries, knowledge bases, and memory stores.

## Summary

- Provides login/auth, chat UI, persona profiles, and action registries that map to underlying tool implementations.
- Includes Nexus managers for chats, actions, knowledge, and memory, allowing builders to toggle features like semantic memory, episodic storage, and retrieval pipelines.
- Can be installed from source or as an editable clone, giving developers a starting point for app-specific agent deployments.

## Connections

- Tightly coupled with [[Agent Memory]] strategies (semantic, episodic, procedural stores).
- Interfaces with [[Prompt Flow]] and [[Reasoning Strategies]] by offering a deployable runtime for evaluated prompts.
