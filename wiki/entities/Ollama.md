---
title: Ollama
type: entity
tags: [tool, local-inference, llm-runtime, open-source]
sources: [2026-11-13-build-a-reasoning-model-from-scratch]
created: 2026-11-13
updated: 2026-11-13
---

# Ollama

## Identity

**Ollama** (ollama.com) is an open-source application for running LLMs locally, for example on a laptop. It wraps the C/C++ library **llama.cpp**. It handles **inference only** and does not support training or fine-tuning (Raschka 2026, Appendix F, p390).

## Usage facts

All from *Build a Reasoning Model (From Scratch)*, p390–393:

- **Running a model.** `ollama run gpt-oss:20b` downloads the model the first time (about 14 GB on disk) and opens an interactive session; `/bye` exits it.
- **Server.** `ollama serve` starts the backend at `http://localhost:11434`. It loads a model only when an API call arrives. The desktop app and `ollama run` use the same server API.
- **Port conflicts.** If the port is already in use, start it with `OLLAMA_HOST=127.0.0.1:11435 ollama serve`.
- **Chat API.** POST to `/api/chat` with a `messages` list. The response streams JSON lines.
- **Deterministic output** needs `options: {seed: 123, temperature: 0, num_ctx: 2048}`. Answers from the API can differ from `ollama run` because the defaults differ.
- **RAM needs:**

| Model | RAM |
|---|---|
| gpt-oss:20b | ~13 GB |
| qwen3:4b | ~4 GB |
| gpt-oss:120b | Far more |

**Example use.** The book runs gpt-oss:20b ([[GPT-OSS]]) as a local [[LLM-as-Judge]] that scores answers 1–5 against a rubric and a reference answer.

## Related Pages

- [[LLM-as-Judge]] — main use case in the source
- [[GPT-OSS]] — judge model used in the example
- [[Qwen3]] — smaller alternative for running locally

## Sources

- [[2026-11-13-build-a-reasoning-model-from-scratch]] — Raschka 2026, Appendix F.5
