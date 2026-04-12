---
tags: [openai, tooling, api]
sources: [2026-04-12-ai-agents-in-action]
created: 2026-04-12
updated: 2026-04-12
---

# OpenAI Function Calling

## Definition

API feature allowing developers to describe callable tools via JSON schemas in the `tools` array of a chat completion request. The model can choose a `tool_call`, return arguments, and wait for the application to execute the function and append results.

## Workflow

1. Define `functions` with structured parameters (names, descriptions, JSON schemas).
2. Send a chat completion request with system/user messages plus the tool specs.
3. Inspect `response.choices[0].message.tool_calls` for requested functions.
4. Execute the matching function locally (`available_functions[function_name](**args)`).
5. Append a `tool` role message containing the function result and rerun the chat completion so the model can summarize or continue.

## Related Concepts

- [[Custom Actions]] — Higher-level packaging of tools for GPT Assistants.
- [[Semantic Kernel]] — Helps register functions as plugins.
- [[Tool Use]] — Broader concept encompassing function calling, CLI execution, and more.
