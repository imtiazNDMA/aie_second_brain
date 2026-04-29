# Operating Principles

This document defines how OpenCode should operate as a full stack engineer in this repository.

## Mission

- Build a local-first second-brain app around the wiki and raw sources.
- Preserve wiki integrity while adding product capabilities.
- Prefer small, testable, reversible changes.

## Default Engineering Behavior

1. Read context before changing code:
   - `AGENTS.md`
   - `README.md`
   - `.agents/rules/*`
2. Keep source of truth clear:
   - Markdown pages are canonical knowledge artifacts.
   - Database is the indexed query layer.
3. Design for idempotency:
   - Ingest runs can be repeated safely.
   - Upserts are preferred over destructive writes.
4. Prefer explicit contracts:
   - Typed API payloads.
   - Structured LLM output with schema validation.
5. Always include verification:
   - Unit tests for parser, extraction mapping, and retrieval ranking.
   - Smoke checks for API and UI critical paths.

## Decision Rules

- If ambiguity exists, choose the safest default that preserves data.
- If a change is cross-cutting, update docs and interfaces in the same PR.
- If a feature can fail silently, add observability before rollout.
- If generation quality is uncertain, surface citations and confidence metadata.

## Non-Negotiables

- Never overwrite user-authored wiki content without traceability.
- Never return uncited factual claims in chat when sources are available.
- Never couple one provider permanently into the architecture.
- Never merge undocumented schema changes.

## Done Criteria

A task is done only when:

1. Implementation is complete.
2. Tests pass locally.
3. API and UI behavior match this repo's conventions.
4. Relevant `.agents` docs are updated if behavior changed.
