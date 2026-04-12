# [[AI Engineering]] Second Brain

Second-brain workspace for capturing AI-engineering literature, code snippets, and RAG/agent workflows. The repo hosts:

- A structured wiki (`wiki/`) powered by Obsidian + wikilinks
- `raw/source/` (PDF/MD clippings) tracked via both Git **and** DVC so large files remain portable
- Synthesis pages and runnable code samples for PyTorch, Prompt Flow, and LangChain

Use this repository to ingest new sources, run lint/health checks, and experiment with agents/RAG pipelines.

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

## Data Management

All PDFs in `raw/source/` are large. Two layers keep them under control:

1. `raw/source.dvc` – DVC metadata so you can `dvc push` to a remote storage backend.
2. Forced Git tracking – the PDFs are also in Git to satisfy workflows that expect them locally.

Recommended workflow:

```bash
# add/update sources
dvc add raw/source
git add raw/source.dvc raw/.gitignore

# once you configure a remote (e.g., Azure blob, S3, GDrive)
git commit ...      # pushes metadata and wiki updates
```

When cloning a fresh repo:

```bash
cd aie_second_brain
dvc pull            # retrieves PDFs from remote storage (once configured)
```

## Ingest Workflow

Follow the Second Brain ingest instructions (`AGENTS.md`) or run manually:

1. Place a PDF/MD clipping in `raw/source/`.
2. Run the ingest agent or manually summarize:
   - Create `wiki/sources/<slug>.md` with summary, key claims, entities, concepts.
   - Update / create entity & concept pages (use wikilinks everywhere).
3. Update `wiki/index.md` and `wiki/log.md` with new entries.
4. Track the raw file via DVC + Git and commit.

## Lint & Health Checks

Use the lint agent (`second-brain-lint`) or manually verify:

- No broken wikilinks (run the regex scan in the lint instructions).
- No orphan pages (every entity/concept/source should have inbound links).
- `wiki/index.md` counts match actual pages.
- `wiki/log.md` has entries for each ingest/lint/code-example addition.

## Code Examples

The `wiki/code-examples/` directory contains runnable snippets referenced throughout the wiki, including:

- PyTorch basics (`PyTorch Tensor Basics`, `PyTorch Linear Regression`, `PyTorch TorchScript Export`)
- LangChain RAG pipeline (`LangChain Mini RAG Pipeline`)
- Prompt Flow evaluation DAG using the SOMA rubric (`Prompt Flow SOMA Evaluation`)

Paste them into notebooks or scripts to explore the workflows described under [[PyTorch]], [[RAG Evaluation Playbook]], and [[Prompt Evaluation Workflows]].

## Contributing

1. Keep new content Obsidian-friendly (YAML frontmatter, wikilinks, no absolute paths).
2. Prefer ASCII for new files; cite sources and add entries to the index/log immediately.
3. When adding large files to `raw/source/`, re-run `dvc add raw/source` and `dvc push` (if a DVC remote exists).
4. Run lint (`second-brain-lint`) after approximately every 10 ingests or whenever major structural edits happen.

## Git Remotes

The repository is configured with:

```
```

After staging/committing work, push via:

```bash
```

Remember to push DVC data separately (`dvc push`) once a data remote is set.
