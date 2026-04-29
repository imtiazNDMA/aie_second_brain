# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a **second brain knowledge management system** for AI engineering topics, built with Obsidian. The repository contains:

- A structured wiki (`wiki/`) organized into entities, concepts, sources, syntheses, and code examples
- Raw source documents (`raw/`) tracked via both Git and DVC for large files (PDFs, clippings)
- Automated skills for ingestion, linting, and querying (`.agents/skills/`)

## Repository Structure

```
├── raw/                    # Source documents (PDFs, MD clippings)
│   └── sources/           # Approved sources organized by date
├── wiki/                   # Structured wiki pages
│   ├── entities/          # People, organizations, products, tools
│   ├── concepts/          # Topics, frameworks, theories
│   ├── sources/           # Source summaries and annotations
│   ├── synthesis/         # Cross-cutting analyses
│   └── code-examples/     # Runnable snippets (PyTorch, Prompt Flow, LangChain)
├── .agents/skills/        # Automated workflow skills
└── .dvc/                  # DVC configuration and state
```

## Development Workflows

### Ingesting New Sources

Use the `second-brain-ingest` skill when processing new material:

1. Place a PDF/MD clipping in `raw/source/`
2. Run `/second-brain-ingest` to:
   - Create a source summary in `wiki/sources/`
   - Update/create entity and concept pages
   - Add wikilinks to related pages
   - Update `wiki/index.md` and `wiki/log.md`

### Wikilink Conventions

- Use `[[pagename]]` syntax for all internal references
- Never use raw file paths (e.g., `wiki/concepts/rag.md`)
- Page names match filenames without extension (kebab-case)
- All entities and concepts should be linked when mentioned

### Health Checks

Run `/second-brain-lint` after every 10 ingests or when making structural edits to check for:
- Broken wikilinks
- Orphan pages (no inbound links)
- Contradictions between pages
- Stale claims from outdated sources

## Data Management

### Adding Large Files

1. Place file in `raw/source/`
2. Run `dvc add raw/source` to track it
3. Commit DVC metadata: `git add raw/source.dvc raw/.gitignore`
4. Push to remote (once configured): `dvc push`

### Cloning the Repository

```bash
dvc pull  # Retrieves large files from remote storage
```

## Wiki Schema

Each wiki page should include YAML frontmatter:

```yaml
---
title: Page Title
type: entity | concept | source | synthesis | code-example
tags: [tag1, tag2]
sources: [source-id]  # Only for source summaries
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

### Page Types

- **Entities**: People, organizations, products, tools
- **Concepts**: Ideas, frameworks, theories
- **Sources**: Summaries of ingested articles/papers
- **Syntheses**: Cross-cutting analyses comparing multiple sources
- **Code-examples**: Runnable snippets referenced by the wiki

## Querying the Knowledge Base

Use the `second-brain-query` skill to explore the wiki:

1. Read `wiki/index.md` to find relevant pages
2. Follow wikilinks to gather context from related pages
3. Synthesize answers with proper citations using `[[wikilink]]` syntax

## Tools

The repository uses several external tools:

- **DVC**: Data version control for large files
- **Obsidian**: Markdown note-taking app (local usage only)
- **qmd**: Optional CLI tool for searching the wiki when it grows beyond ~100 pages

## Related Documentation

- `AGENTS.md` - Agent configuration and workflow details
- `wiki/log.md` - Chronological record of operations
- `wiki/code-examples/Code Examples Overview.md` - Code example organization