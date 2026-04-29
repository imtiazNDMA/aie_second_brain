# .agents Playbook Index

Use this folder as the operating manual for OpenCode in this repo.

## Recommended Execution Order

Follow guides in this order for any non-trivial feature work:

1. Rules
   - `./rules/01-operating-principles.md`
   - `./rules/02-code-quality-checklist.md`
   - `./rules/03-delivery-workflow.md`
   - `./rules/04-ai-engineering-rules.md`
   - `./rules/05-llm-evaluation-and-release-gates.md`
   - `./rules/06-security-privacy-and-compliance.md`
2. Database
   - `./database/01-schema-and-indexing.md`
   - `./database/02-migrations-and-data-lifecycle.md`
3. Backend
   - `./backend/01-api-architecture.md`
   - `./backend/02-ingest-pipeline-ollama.md`
   - `./backend/03-retrieval-chat-citations.md`
4. Frontend
   - `./frontend/01-app-architecture.md`
   - `./frontend/02-search-chat-graph-ux.md`
5. Design
   - `./design/01-product-design-system.md`
   - `./design/02-information-architecture.md`
6. End-to-End Playbook
   - `./AI_ENGINEERING_PLAYBOOK.md`
7. Templates
   - `./templates/prompt-spec.md`
   - `./templates/eval-dataset.md`
   - `./templates/feature-rfc.md`
   - `./templates/ai-incident-postmortem.md`

## Quick Intent Routing

- "I need architecture guidance" -> start at `./rules/` then layer-specific docs.
- "I need to ingest sources from raw" -> `./backend/02-ingest-pipeline-ollama.md`.
- "I need search/chat grounding" -> `./backend/03-retrieval-chat-citations.md`.
- "I need schema/index guidance" -> `./database/01-schema-and-indexing.md`.
- "I need UX/system guidance" -> `./frontend/` and `./design/`.
- "I need full delivery flow" -> `./AI_ENGINEERING_PLAYBOOK.md`.
- "I need reusable docs/templates" -> `./templates/`.

## Ollama Defaults

For ingest and extraction:

- Primary LLM: `gemma4:latest`
- Fallback LLM: `gemma3:27b-instruct`
- Embeddings: `mxbai-embed-large`

Authoritative details are in `./backend/02-ingest-pipeline-ollama.md`.

## Relationship to Skills

- `./skills/` contains command-style workflow skills (`second-brain-*`).
- This playbook (`./rules`, `./backend`, `./database`, `./frontend`, `./design`) defines engineering standards and delivery behavior.
- Use both together: skills for workflows, playbook for implementation quality.
