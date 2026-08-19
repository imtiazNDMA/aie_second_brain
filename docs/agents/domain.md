# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

This is a **single-context repo**: one `CONTEXT.md` and one `docs/adr/`, both at the root.

## Before exploring, read these

- **`CONTEXT.md`** at the repo root.
- **`docs/adr/`** — read ADRs that touch the area you're about to work in.

If any of these files don't exist, **proceed silently**. Don't flag their absence; don't suggest creating them upfront. The producer skill (`/grill-with-docs`) creates them lazily when terms or decisions actually get resolved.

## File structure

```
/
├── CONTEXT.md                                   ← not yet created; that's fine
├── docs/adr/
│   ├── 0001-local-first-localhost-app.md
│   ├── 0002-sqlite-first-persistence.md
│   ├── 0003-original-gamified-ui-brand-safety.md
│   ├── 0004-lesson-mastery-domain-model.md
│   └── 0005-lottie-asset-governance.md
├── api/                                         ← Node/Express backend
├── web/                                         ← Next.js frontend
└── wiki/                                        ← the Obsidian knowledge vault
```

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term as defined in `CONTEXT.md`. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal — either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `/grill-with-docs`).

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> _Contradicts ADR-0007 (event-sourced orders) — but worth reopening because…_

### Note on ADR currency

`docs/DESIGN.md` does not exist and never did, despite older references to it.
`docs/adr/` is the authoritative record.

ADRs 0006-0010 (2026-08-19) resolved a pivot to a five-track gated curriculum,
MongoDB persistence, a Duolingo-adjacent visual identity, hybrid local-LLM content
generation, and lesson versioning. Two earlier ADRs are no longer current:

- **0002** (SQLite-first) is superseded by **0006** (MongoDB).
- **0003** (brand safety) is amended by **0007** (visual identity).

Always check an ADR's `Status:` line before relying on it.
