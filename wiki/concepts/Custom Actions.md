---
tags: [actions, api, assistants]
sources: [2026-04-12-ai-agents-in-action]
created: 2026-04-12
updated: 2026-04-12
---

# Custom Actions

## Definition

User-defined functions that GPT Assistants can call to interact with external systems. Typically exposed as REST endpoints with JSON schemas that describe parameters and responses.

## Implementation Notes

- Build FastAPI (or similar) endpoints, document them with OpenAPI specs, and host via ngrok tunnels or HTTPS servers.
- Register actions in the GPT builder or Assistants API; the assistant can autonomously decide when to call them.
- Use actions to fetch live data (TMDB, weather), manipulate files, or trigger business workflows while keeping the LLM conversational layer simple.

## Related Concepts

- [[OpenAI Function Calling]] — Lower-level mechanism for tool execution.
- [[Semantic Kernel]] — Offers native and semantic plugins that can be exposed as actions.
