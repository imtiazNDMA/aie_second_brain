---
title: HuggingGPT
type: entity
tags: [agents, orchestration, multimodal, hugging-face]
sources: [2026-07-07-building-ai-agents-with-llms-rag-knowledge-graphs]
created: 2026-07-07
updated: 2026-07-07
---

# HuggingGPT

## Summary

HuggingGPT is an agent pattern where an LLM acts as a controller over external expert models. It plans the user's task, selects appropriate models from natural-language model descriptions, executes those models, and synthesizes their outputs into a final response.

## Connections

- [[Toolformer]] - related tool/model invocation approach.
- [[Hugging Face Hub]] - source of model descriptions and expert models.
- [[Multi-Agent Systems]] - example of LLM-mediated model cooperation.
- [[Multimodal Tokenization]] - many HuggingGPT tasks cross text, image, video, or audio modalities.

## Sources

- [[2026-07-07-building-ai-agents-with-llms-rag-knowledge-graphs]]

## Timeline

- **2023** - HuggingGPT proposed task planning, model selection, task execution, and response generation over Hugging Face models.
- **2026-07-07** - Added from the Packt agent book's single- and multi-agent systems chapter.
