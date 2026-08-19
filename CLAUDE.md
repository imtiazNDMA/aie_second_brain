# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## What this repository is — read this first

Two coexisting layers:

1. **The wiki** (`wiki/`, `raw/`, `Clippings/`, `.agents/skills/second-brain-*`) — an
   Obsidian-shaped knowledge vault for AI engineering. **564 markdown files**
   (concepts, entities, sources, synthesis, overviews, model-architectures),
   `[[wikilinks]]`, YAML frontmatter, PDFs in `raw/source/` via DVC. The original
   artifact, still actively maintained.
2. **The app** (`api/`, `web/`, `content/`, `scripts/`) — a local-first, single-user
   **gamified learning platform** built from the wiki. Node/Express API, Vite +
   React frontend. The wiki is its content source; the app turns wiki pages into
   lessons, practice, spaced review, XP, streaks, mastery, and project checkpoints.

The product is a Duolingo-style learning app for AI Engineering. Duolingo's
*mechanics* are replicated closely; every *asset* is original (see ADR 0007).

## Canonical documents

There is **no `docs/DESIGN.md`**. Earlier versions of this file referenced one; it
never existed. Precedence when sources disagree:

1. **`docs/adr/`** — accepted architectural decisions. Highest authority. Check
   `Status:` — some are superseded or amended by later ADRs.
2. **`docs/prds/ai-engineering-learning-platform.md`** — the product requirements.
3. **`plan.md`** — product and curriculum plan.
4. **`architecture.md`** — system architecture detail.
5. **`todos.md`** — build checklist and open decisions.
6. This file — operational pointers only.
7. **`AGENTS.md`, `README.md`** — predate the app; they describe the wiki.

`docs/roadmaps/mern-production-migration-plan.md` drove the MongoDB migration and
remains useful, but ADR 0006 is authoritative on persistence.

## Build & run

Root is an npm workspace (`api`, `web`). Node 20+.

```bash
npm install            # install all workspaces
npm run dev            # api on :8787 and web on :5173 concurrently
npm run start:app      # scripted launcher (start-app.cmd on Windows)
npm test               # build + smoke test + workspace tests
npm run typecheck      # tsc across workspaces
npm run lint           # eslint across workspaces
npm run format         # prettier
```

Copy `.env.example` to `.env`. Key variables: `API_PORT` (8787), `WEB_PORT` (5173),
`MONGODB_URI`, `REPOSITORY_BACKEND`, `WIKI_PATH`.

## Stack

- **Frontend**: Vite + React 19 + TypeScript. `lottie-react` for animations.
  Being rebuilt as a routed multi-screen app — react-router, Tailwind, Framer
  Motion for interaction physics, TanStack Query for server state. Today
  `web/src/App.tsx` is still a single ~464-line prototype component.
- **Backend**: Express 4 + TypeScript (ESM, `tsx` in dev), helmet/cors/compression.
- **Database**: **MongoDB via Mongoose** is the target (ADR 0006). A SQLite
  implementation (`better-sqlite3`, `api/src/db/schema.sql`) still exists and is
  being retired. `REPOSITORY_BACKEND` selects `local` | `mongo` | `auto`; the
  silent `auto` fallback is scheduled for removal.
- **Content generation**: local Ollama, seeded by hand-authored exemplars, behind
  a source-validation gate (ADR 0009). No cloud LLM provider.

## Repository layout

```
api/
├── src/
│   ├── app.ts, server.ts, config.ts, security.ts, logger.ts
│   ├── db/            # SQLite client + schema.sql (being retired), mongo.ts
│   ├── domain/        # curriculum, lesson-runtime, reviews, projects, progress, wiki
│   ├── models/        # learner, learning, projects, reviews, wiki
│   ├── repositories/  # types.ts interface; local.ts (SQLite) + mongo/ (Mongoose)
│   └── routes/        # health, learning, reviews, projects, wiki, animations
└── data/              # learning.db, app-state.json (local backend artifacts)

web/
├── src/App.tsx        # prototype shell — being replaced by routed screens
├── src/components/    # LottieFrame, ProgressRing
└── public/lottie/     # local Lottie assets (ADR 0005)

content/               # authored curriculum JSON
├── paths/             # rag-foundations.path.json
├── lessons/           # rag-foundations.lessons.json (10 hand-authored lessons)
├── reviews/           # review prompts
└── projects/          # toy-rag-evaluation

docs/
├── adr/               # 0001-0010, authoritative
├── prds/              # product requirements
├── roadmaps/          # MERN migration plan + phase logs
├── quality/           # checklists
└── agents/            # issue tracker, triage labels, domain doc rules

wiki/                  # the knowledge vault — 564 pages, the app's content source
.agents/skills/        # agent skills (second-brain-* plus vendored design skills)
.agents/design-md/     # 74 vendored brand design systems
```

## Curriculum shape

Five tracks in a gated DAG with Machine Learning as the root (ADR 0008):

```
Machine Learning -> { LLM Engineering -> Agent Engineering,  MLOps -> AIOps }
```

**v1 ships LLM Engineering only, with gates deferred** and the other tracks shown
as locked. The existing `rag-foundations` content becomes LLM Engineering's
opening units.

A lesson is `explain` -> 8–12 ramped question steps -> `summary`. Question types:
`multiple_choice`, `multi_select`, `recall`, `scenario`, `drill`, plus
`match_pairs`, `order_steps`, `cloze`, `true_false`. Fast recognition items come
first, heavy scenario/drill items last.

Mechanics: hearts deplete and refill by clearing review items; streak freezes are
earned by hitting 2× the daily goal (max 2); leagues are "ghost leagues" ranked
against the learner's own prior weeks.

## Wiki conventions (when editing `wiki/`)

- **Filenames are Title Case with spaces** (`Active Learning.md`). The stem is the
  page slug.
- **Frontmatter**: `tags`, `sources`, `created`, `updated`.
- **`[[wikilinks]]` everywhere** — never raw paths.
- **Page type is inferred from the parent directory** (`wiki/concepts/X.md` →
  concept); frontmatter `type:` overrides.
- **Keep three places in sync** when editing by hand: the page, `wiki/index.md`
  counts, `wiki/log.md` entry.
- **`index.md`, `log.md`, `README.md`** are catalogue artifacts, not pages.
- Pages tagged `stub` (29 currently) are excluded from lesson generation.

Editing a wiki page never costs learner progress: lessons are versioned and
mastery is concept-scoped (ADR 0010).

## Skills

`.agents/skills/` holds the four `second-brain-*` skills (ingest, query, lint,
onboarding) for wiki work, plus vendored design skills. `.claude/skills/` is a
generated link layer and is gitignored apart from pre-existing real skills.

If the user is asking about *wiki content* (ingest a source, lint, find a page),
the `second-brain-*` skills apply. If they are working on *the app*, work in
`api/` / `web/` / `content/` / `docs/`.

## Build phase (as of 2026-08-19)

- ✅ Planning complete: PRD, `plan.md`, `architecture.md`, `todos.md`, ADRs 0001–0010.
- ✅ Backend domain modules with tests: lesson runtime, reviews, progress, projects,
  curriculum, wiki sync.
- ✅ Repository pattern with SQLite and Mongoose implementations.
- ✅ 10 hand-authored lessons (`rag-foundations`) as generation exemplars.
- ⏳ Finish the MongoDB migration; retire SQLite; remove the silent `auto` fallback.
- ⏳ Add the four lightweight question types (validators, UI, generator prompts).
- ⏳ Lesson versioning + stale flags per ADR 0010.
- ⏳ Ollama generation pipeline with source validation and a review queue.
- ⏳ Frontend rebuild: router, Tailwind, Framer Motion, TanStack Query, six screens.
- ⏳ Original visual identity: palette, product name, abstract geometric companion.

Open decisions in `todos.md`: final product name, palette.
