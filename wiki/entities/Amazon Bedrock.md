---
title: Amazon Bedrock
type: entity
tags: [platform, managed-llm, aws]
sources: [2026-04-12-ultimate-guide-fine-tuning]
created: 2026-04-13
updated: 2026-04-13
---

# Amazon Bedrock

## Summary

Fully managed AWS service that exposes foundation models (Anthropic, Cohere, Meta, Amazon) with unified APIs plus Guardrails and Agents features. Mentioned in the Ultimate Guide as a deployment alternative when teams prefer hosted models over self-managed inference.

## Capabilities

- Invoke multiple base models with a single security/compliance boundary.
- Apply Guardrails for safety filtering and content tagging.
- Integrate Agents/Knowledge Bases for retrieval workflows.

## Usage

- Hybrid approach: run [[RAG Architecture Decision Guide]] pipelines locally and backstop with Bedrock models when private hardware is limited.
- Evaluate tuned adapters by uploading them to Bedrock-hosted custom models (through Model Access Program).

## Sources

- [[2026-04-12-ultimate-guide-fine-tuning]] — Lists Bedrock in the industrial platform roundup.
