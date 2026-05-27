---
title: Model Context Protocol
type: concept
tags: [agent-tools, protocol, mcp, tool-use, ai-coding-agents]
sources: []
created: 2026-05-10
updated: 2026-05-10
---

# Model Context Protocol

## Definition

The **Model Context Protocol (MCP)** is an open protocol introduced by Anthropic in late 2024 for connecting LLM-based agents to external tools, data sources, and prompts via a standardized interface. MCP is to AI agents what HTTP is to web services: a transport-and-schema specification that lets any client (Claude Code, Claude Desktop, Cursor, Continue, etc.) discover and call tools served by any conforming server (databases, APIs, codebases, internal services). MCP has rapidly become the **de facto standard** for tool integration in 2025–2026 AI coding agents and broader agent workflows.

## What MCP defines

An MCP server exposes three resource types:

| Resource | What it is | Examples |
| --- | --- | --- |
| **Tools** | Functions the agent can call | `read_file`, `query_database`, `send_email`, `run_tests` |
| **Resources** | Data the agent can read | File contents, API responses, database schemas |
| **Prompts** | Reusable prompt templates | "Code review this PR", "Summarize this issue" |

The protocol uses **JSON-RPC 2.0** over stdio, HTTP, or Server-Sent Events. Each transport gives different deployment shapes — stdio for local subprocesses, HTTP for remote services.

## Why it matters

Before MCP, every tool integration was bespoke:

- Different serialization for tool definitions across SDKs
- Different conventions for argument schemas
- Different patterns for streaming vs blocking calls
- Hard to share tool implementations across clients

After MCP, **a tool implemented once** can be used by any MCP-aware agent. The result: a fast-growing ecosystem of MCP servers (databases, search, devtools, productivity, cloud APIs) that any agent can plug in to.

## Comparison to alternatives

| Approach | Strengths | Weaknesses |
| --- | --- | --- |
| Vendor-specific tool APIs (OpenAI Function Calling, Anthropic Tools) | Tight integration | Locked to one vendor / SDK |
| LangChain Tool abstractions | Cross-vendor; mature ecosystem | Library-coupled; not a wire protocol |
| OpenAPI + LLM | Reuses existing API infra | LLM has to interpret OpenAPI; brittle |
| **MCP** | Open protocol; ecosystem-wide reuse; clear schema | Newer; specifications still evolving |

MCP doesn't replace [[OpenAI Function Calling]]-style APIs at the model layer; it sits one level higher, defining how agents and tool servers talk regardless of which model the agent runs.

## Where it appears in this wiki

- [[Compound AI Systems]] — MCP is one of the standardization patterns enabling compound systems
- [[AI Coding Agents]] — Claude Code, Cursor, and other coding agents are MCP clients
- [[Tool Use]] — the broader capability MCP standardizes
- [[Agent Components]], [[Agentic Systems]] — substrate for tool-use components

## Practical considerations

- **Discovery** — clients query servers for available tools/resources/prompts; the agent's system prompt is augmented with these
- **Auth** — most MCP servers handle OAuth or token-based auth; the protocol is auth-agnostic
- **Streaming** — both call results and notifications can stream; useful for long-running operations
- **Sandboxing** — MCP itself doesn't sandbox; the runtime around it (Claude Code's permission system, etc.) does

## Failure modes

- **Tool sprawl** — connecting too many MCP servers bloats the system prompt and confuses the agent; tool discoverability degrades
- **Schema drift** — server-side tool changes can break client behavior silently
- **Auth complexity** — multi-tenant MCP servers need careful auth design
- **Latency multiplication** — every tool call is a round-trip; agent loops can hit minute-scale latency with many tools

## Related Concepts

- [[Tool Use]] — broader capability MCP standardizes
- [[OpenAI Function Calling]] — model-layer tool-call API
- [[Compound AI Systems]] — architectural framing where MCP fits
- [[AI Coding Agents]] — synthesis covering MCP's primary 2025–2026 use
- [[Agent Components]] — Tool component is what MCP plugs into
- [[Anthropic]] — MCP's original publisher
- [[Claude Code]] — flagship MCP client

## Open Questions

- Tool-discovery / ranking when many MCP servers are connected
- Standardization of auth, observability, rate-limiting across MCP servers
- MCP's stability as the ecosystem grows beyond the initial spec
