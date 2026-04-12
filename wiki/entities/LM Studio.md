---
title: LM Studio
type: entity
tags: [tool, llm, local, desktop]
sources: [2026-04-12-ai-agents-in-action]
created: 2026-04-12
updated: 2026-04-12
---

# LM Studio

Desktop application for downloading, running, chatting with, and serving open-source LLMs locally.

## Summary

- Provides a hardware-aware UI for selecting compatible GGUF models and launching chats without code.
- Can expose hosted models over an OpenAI-compatible HTTP server so custom scripts or prompt tools connect to a local endpoint.
- Useful for privacy-sensitive experiments, benchmarking non-OpenAI models, and pairing local inference with prompt-engineering exercises from *AI Agents in Action*.

## Connections

- Enables local evaluation loops for [[Prompt Engineering]] workflows.
- Serves as the local backbone for agent platforms that require on-device inference instead of hosted APIs.
