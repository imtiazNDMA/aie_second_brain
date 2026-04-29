---
title: Tool Use
type: concept
tags: [agent-capabilities, function-calling, actions]
sources: [2026-04-12-building-ai-coding-agents-terminal.md, 2026-04-12-prompt-engineering-llms.md]
created: 2026-04-29
updated: 2026-04-29
---

# Tool Use

The capability of AI agents and LLMs to execute external tools, APIs, and functions to extend their capabilities beyond text generation.

## Definition

Tool use allows LLMs to interact with external systems by selecting and invoking defined functions with appropriate parameters. This extends model capabilities to tasks like searching the web, querying databases, executing code, or controlling applications.

## Key Concepts

- **Function Calling**: Structured JSON schema describing available tools
- **Tool Selection**: Model decides which tool to use based on user intent
- **Parameter Extraction**: Model extracts required arguments from context
- **Tool Response Processing**: Incorporating tool outputs into ongoing conversation
- **Multi-step Tool Use**: Chaining multiple tool calls to complete complex tasks

## Related Concepts

- [[OpenAI Function Calling]] — Specific implementation by OpenAI
- [[Agentic Systems]] — Tool use enables agentic behavior
- [[AI Coding Agent]] — Heavy users of tool use for coding tasks
- [[Custom Actions]] — Tools exposed to GPT Assistants

## Sources

- [[2026-04-12-building-ai-coding-agents-terminal.md]]: Tool use as core capability of AI coding agents like Claude Code
- [[2026-04-12-prompt-engineering-llms.md]]: Discussed as key LLM capability alongside reflection

## Open Questions

- How to handle tool errors and retries gracefully?
- What's the best way to describe complex tools to LLMs?
