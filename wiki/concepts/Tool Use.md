tags: [ai, agent, tool-use, execution]
sources: [Building AI Coding Agents for the Terminal.pdf, AI Agents in Action.pdf]
created: 2026-04-12
updated: 2026-04-12
---

# Tool Use

## Definition

The capability of AI agents to execute commands, interact with external systems, and perform file operations. Enables agents to take actions beyond text generation.

## Patterns

- **Function calling** — Use OpenAI’s JSON-described functions so LLMs deterministically invoke APIs.
- **Semantic Kernel plugins** — Combine semantic prompts and native code to expose reusable skills to agents.
- **GPT [[Custom Actions]]** — FastAPI/ngrok endpoints registered in GPT Assistants for domain-specific tasks.
- **Command runners** — Behavior trees or Nexus actions run shell commands or scripts with guardrails.

## Related Concepts

- [[AI Coding Agent]] — Context for tool use
- [[Agent Memory]] — Storing results of tool execution
- [[OpenAI Function Calling]] — Specific API feature powering tool invocation
- [[Custom Actions]] — GPT-specific extension mechanism

## Sources

- [[2026-04-12-building-ai-coding-agents-terminal]] — Primary source
- [[2026-04-12-ai-agents-in-action]] — Details function calling, Semantic Kernel, and GPT actions
