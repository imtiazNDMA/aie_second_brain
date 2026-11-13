---
tags: [entity, tool, observability, llm-ops]
sources: ["2026-09-12-grokking-ai-applications"]
created: 2026-09-12
updated: 2026-09-12
---

# Langfuse

Open-source LLM observability platform for tracing, evaluating, and monitoring LLM applications. Captures prompts, outputs, tool calls, latency, token usage, and costs across the full request lifecycle.

## Key Features

- **Tracing** — end-to-end request traces across chains, agents, and tools
- **Evaluation** — scoring and human feedback collection
- **Monitoring** — latency, cost, and quality dashboards
- **Prompt management** — versioned prompt templates
- **Open source** — self-hostable, no vendor lock-in

## vs. LangSmith

| Aspect | Langfuse | LangSmith |
|---|---|---|
| **License** | Open source | Proprietary |
| **Self-hosting** | Yes | Cloud only |
| **Evaluation** | Built-in | Built-in |
| **Integration** | LangChain, LlamaIndex, custom | LangChain-native |

## Use Cases

- Debugging agent tool-call ordering
- Monitoring token usage and costs
- A/B testing prompt variations
- Compliance audit trails

## Related

- [[LangSmith]] — alternative observability platform
- [[LangWatch]] — alternative observability platform
- [[LLMOps]] — broader operational context
- [[Agent Operations]] — agent-specific monitoring
- [[Prompt Versioning]] — prompt management
