# [[AI Engineering]] Second Brain

Curated “second brain” for AI engineering: every source becomes a source summary, linked concepts, runnable code, and a traceable log entry. Use it to capture ML/RAG/agent workflows, reason about trade-offs, and keep knowledge fresh.

**Highlights**

- Obsidian-friendly wiki with entities, concepts, sources, syntheses, and code examples.
- `raw/source/` PDFs managed via Git + DVC so large documents remain portable.
- `.agents/` skills automate ingest, lint, and query workflows.

## Repository Layout

```
├── raw/source/                     # PDFs & clippings (tracked by DVC)
├── wiki/
│   ├── sources/                    # Source summaries with key claims and links
│   ├── concepts/                   # Knowledge graph of ideas/tools
│   ├── entities/                   # People/organizations/products
│   ├── synthesis/                  # Cross-source comparisons & analyses
│   └── code-examples/              # Notebook-style snippets (PyTorch, Prompt Flow, LangChain)
├── .agents/                        # Skill definitions used by automation
├── .obsidian/                      # Obsidian workspace configuration
├── .dvc/ , raw/source.dvc          # DVC configuration/state
└── README.md                       # This file
```

## Data Management (Git + DVC)

1. Add or update PDFs in `raw/source/`.
2. `dvc add raw/source` to capture large files.
3. `git add raw/source.dvc raw/.gitignore wiki/…` and commit.
4. Push Git metadata as usual; once a remote is configured, run `dvc push` to upload binaries.

Fresh clone:

```bash
git clone <repo>
cd second_brain
dvc pull   # downloads PDFs from the configured remote
```

## Ingest Workflow

1. Drop a PDF/markdown clipping into `raw/source/`.
2. Run the ingest agent (see `AGENTS.md`) or summarize manually:
   - Create `wiki/sources/YYYY-MM-DD-slug.md` covering summary, key claims, entities, concepts, links.
   - Add/update referenced entities and concepts with wikilinks.
3. Refresh `wiki/index.md` counts + entries and append an entry to `wiki/log.md`.
4. `dvc add raw/source`, stage everything, commit, and push (`git push` + `dvc push`).

## Lint & Health Checks

Run `second-brain-lint` (see `AGENTS.md`) or verify manually:

- Broken wikilinks – use the provided regex/Python scan.
- Orphan pages – ensure every entity, concept, and source has inbound links.
- Index/log consistency – `wiki/index.md` counts should match actual files; `wiki/log.md` must reference every ingest/lint/code-example.

## Code Examples

`wiki/code-examples/` mirrors the workflows described throughout the wiki:

- PyTorch basics – tensors, training loops, TorchScript export.
- LangChain RAG pipeline – ingestion → embedding → retrieval.
- Prompt Flow SOMA evaluation – rubric-driven grading DAG.

Copy/paste them into notebooks or scripts to reproduce the patterns covered in [[PyTorch]], [[RAG Evaluation Playbook]], [[Prompt Evaluation Workflows]], and related concept pages.

## Contributing Guidelines

1. Keep pages Obsidian-friendly: YAML frontmatter, wikilinks, ASCII by default, relative paths only.
2. Cite sources everywhere (`sources: [YYYY-MM-DD-slug]`) and update `wiki/index.md` + `wiki/log.md` immediately.
3. For new PDFs, always `dvc add raw/source` and keep the DVC remote in sync with `dvc push`.
4. Run lint (`second-brain-lint`) roughly every 10 ingests or after structural edits and follow its fixes.
5. Never rename/move wiki pages without updating backlinks in the wiki and catalog.
