# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is — read this first

This repo has **two coexisting layers**:

1. **The wiki** (`wiki/`, `raw/`, `Clippings/`, `.agents/skills/`) — an Obsidian-shaped knowledge vault for AI engineering: ~210 markdown files (entities/concepts/sources/synthesis/overviews), `[[wikilinks]]`, YAML frontmatter, PDFs in `raw/source/` via DVC. This is the original artifact and is still actively used.
2. **The app** (`api/`, `web/`, `docs/`, `docker-compose.yml`, `Makefile`) — a local-first, single-host, Ollama-bound full-stack application being built **around** the wiki: FastAPI backend, Next.js frontend, Postgres+pgvector, with chat / knowledge graph / page-browse surfaces. The wiki is its seeded default vault.

**The canonical product/architecture spec is `docs/DESIGN.md`.** Read it before making cross-cutting changes. It supersedes the original SaaS-oriented design (now preserved in `docs/design/01-04-*.md` as future-deployment reference).

## Build & run

```bash
make install        # uv sync in api/, pnpm install in web/
make db-up          # start Postgres + pgvector via docker compose
make migrate        # apply Alembic migrations
make seed           # import wiki/ → DB (pages, page_links, chunks, embeddings)
make dev            # api on :8000, web on :3000 (Ctrl-C stops both)
make test           # api parser tests + web vitest
make ollama-pull    # pull gemma3:27b-instruct, mxbai-embed-large, qwen2.5:32b-instruct
make ollama-check   # verify Ollama reachable on :11434
```

`make seed` works fully offline because the default `LLM_PROVIDER=mock` uses deterministic hash-derived embeddings — no Ollama needed to populate the DB and exercise the UI plumbing. Switch to `LLM_PROVIDER=ollama` in `.env` when Ollama is running.

`api/` uses `uv` (Python 3.12+); `web/` uses `pnpm` (Node 20+). Postgres runs in Docker; everything else runs natively.

## Stack at a glance (deeper detail in `docs/DESIGN.md`)

- Frontend: Next.js 15 App Router + TS + Tailwind + shadcn/ui + react-force-graph
- Backend: FastAPI 3.12 async + SQLAlchemy 2 + Alembic
- DB: Postgres 16 + pgvector (HNSW, 1024-d) + `pg_trgm` + `citext`
- LLM: Ollama (`gemma3:27b-instruct` default, `qwen2.5:32b-instruct` tool-use fallback). Pluggable adapter: `mock` | `ollama` | `anthropic` | `openai` selected via `LLM_PROVIDER`.
- Embeddings: `mxbai-embed-large` via Ollama (1024-d).
- Reranker: `bge-reranker-v2-m3` via FlashRank.
- Streaming: SSE with structured citation events on a separate channel — never parse citations from the text stream.
- Multi-vault from day one (routes are `/v/[vault]/...`); single-user, no auth (it's localhost).

## Repository layout

```
api/
├── pyproject.toml                  # uv-managed
├── alembic.ini, alembic/           # migrations (initial schema in versions/20260425_*)
├── src/sb_api/
│   ├── settings.py                 # typed env config
│   ├── main.py                     # FastAPI app entry
│   ├── db/{session,models}.py      # 9-table schema per docs/DESIGN.md §3
│   ├── llm/                        # protocol + mock/ollama adapters + registry
│   ├── ingest/wiki_parser.py       # frontmatter, wikilink RE, H2 chunker
│   ├── scripts/seed.py             # import wiki/ into the default vault
│   └── v1/                         # FastAPI routers (health, vaults, ...)
└── tests/                          # parser + mock provider tests; smoke tests vs ../wiki

web/
├── package.json                    # pnpm workspace member
├── next.config.mjs                 # /api/* proxied to FastAPI :8000
├── tailwind.config.ts              # design tokens incl. type-color tokens
└── src/app/{layout,page,globals.css}

docs/
├── DESIGN.md                       # CANONICAL local-first plan
└── design/01-04-*.md               # original SaaS specialist docs (banner-noted as superseded)

wiki/                               # the original knowledge vault — now the seeded default vault
raw/source/                         # DVC-tracked PDFs (~270MB)
Clippings/                          # web clippings
.agents/skills/                     # original Claude Code skills (still usable for wiki edits)
docker-compose.yml                  # Postgres+pgvector
infra/postgres/init.sql             # extensions + roles
Makefile                            # dev orchestration
.env.example                        # all env vars documented
```

## Wiki conventions (still relevant when editing wiki/)

These are unchanged from the pre-app era and the app code respects them when seeding:

- **Filenames are Title Case with spaces** (`Active Learning.md`). The filename stem is the page slug.
- **Frontmatter required**: `title`, `type`, `tags`, `sources`, `created`, `updated`.
- **`[[wikilinks]]` everywhere** — never raw paths. Embeds (`![[Page]]`) are ignored by the parser for now.
- **Page type is inferred from the parent directory** (`wiki/concepts/X.md` → concept). Frontmatter `type:` overrides if present.
- **Three places stay in sync** when editing wiki by hand: the page, `wiki/index.md` counts, `wiki/log.md` entry. The app's seed script is idempotent and handles the DB side automatically.
- **`index.md`, `log.md`, `README.md`** are skipped by the parser — they're catalogue/log artifacts, not pages.

## Skills (`.agents/skills/`) vs the app

The four `/second-brain-*` skills (`ingest`, `query`, `lint`, onboarding wizard) predate the app. They still work for purely-wiki workflows (e.g. "I dragged a PDF into `raw/`, ingest it"). The app will eventually expose ingest/query/lint as server-side endpoints driven by the same prompts — when that lands, the skills become a power-user / offline alternative rather than the primary path.

For now: if the user is asking about *the wiki content* (ingest a source, run a lint pass, find a page), the skills are still appropriate. If the user is working on *the app* (scaffolding, endpoints, UI components, migrations), work in `api/` / `web/` / `docs/`.

## Design-doc precedence (when sources disagree)

1. `docs/DESIGN.md` — canonical product + architecture (local-first scope).
2. `docs/design/01-04-*.md` — SaaS-scope specialists; useful for AI/UX/backend reference but anything cloud/multi-tenant is deferred.
3. This file (`CLAUDE.md`) — operational pointers; defers to DESIGN.md on architecture.
4. `AGENTS.md`, `README.md` — predate the app; defer to the wiki and DESIGN.md respectively.

## Build phase (as of 2026-04-25)

- ✅ Repo scaffolded: api/ + web/ + docker-compose + Makefile + .env.example.
- ✅ Schema designed and initial Alembic migration written (HNSW, GIN, tsvector all in).
- ✅ LLM adapter (mock + Ollama) with deterministic mock embeddings.
- ✅ Wiki parser + idempotent seed importer.
- ✅ Parser unit tests + smoke tests against the real `wiki/`.
- ⏳ Next: hybrid retrieval (`/v1/.../search`), SSE chat endpoint, the four agent tools (`search_pages` / `read_page` / `expand_neighbors` / `find_path_between_pages`), citation pipeline, and the chat UI in `web/`.
- ⏳ Then: graph endpoints + react-force-graph canvas + page-browse RSC view + ingest UI.

When resuming, the natural starting point is **chat retrieval (Week 2)** — see `docs/DESIGN.md` §8 build phases.
