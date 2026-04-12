# LLM Wiki Schema

This document defines the conventions and workflows for maintaining the wiki.

## Directory Structure

```
├── raw/              # Immutable source documents (articles, PDFs, notes)
│   ├── inbox/        # New sources pending ingest
│   └── sources/      # Approved sources by category
├── wiki/             # LLM-generated markdown pages
│   ├── entities/    # People, places, organizations, characters
│   ├── concepts/    # Topics, ideas, theories
│   ├── sources/     # Source summaries and annotations
│   ├── syntheses/   # Cross-cutting analyses
│   └── overviews/   # High-level topic summaries
├── logs/             # Operation logs
├── index.md          # Catalog of all wiki pages
└── log.md            # Chronological record of operations
```

## Page Conventions

### Frontmatter (required)

```yaml
---
title: Page Title
type: entity | concept | source | synthesis | overview
tags: [tag1, tag2]
sources: [source-id]  # Only for source summaries
created: 2026-04-12
updated: 2026-04-12
---
```

### Entity pages (entities/)

- One page per entity (person, place, organization, character)
- Sections: Summary, Connections (links to related pages), Sources, Timeline
- Use wikilinks: `[[entity-name]]`

### Concept pages (concepts/)

- One page per key concept
- Sections: Definition, Related concepts, Sources, Open questions
- Cross-reference with other concept pages

### Source summaries (sources/)

- One page per ingested source
- Sections: Key takeaways, Quotes, Annotations, Links to relevant entities/concepts
- Source ID format: `YYYY-MM-DD-source-slug`

### Syntheses (syntheses/)

- Cross-cutting analyses comparing multiple sources or entities
- Format: comparison tables, thesis statements, argument maps

### Overviews (overviews/)

- High-level summaries of major topics
- Aggregate and link to relevant entities, concepts, sources

## Workflows

### Ingest

1. Read source from `raw/inbox/`
2. Discuss key takeaways with user
3. Write source summary to `wiki/sources/`
4. Update `wiki/index.md` with new page entry
5. Update relevant entity/concept pages
6. Append entry to `log.md`: `## [YYYY-MM-DD] ingest | Source Title`

### Query

1. Read `index.md` to find relevant pages
2. Read candidate pages
3. Synthesize answer with citations to wiki pages
4. Ask user if answer should be saved as new wiki page

### Lint

1. Check for contradictions between pages
2. Identify stale claims superseded by newer sources
3. Find orphan pages (no inbound links)
4. Find concepts mentioned but lacking pages
5. Suggest missing cross-references
6. Report gaps that need filling
7. Append lint results to `log.md`: `## [YYYY-MM-DD] lint | Issues found`

## Index Format

```markdown
# Index

## Entities (n)
- [[entity-name]]: One-line summary

## Concepts (n)
- [[concept-name]]: One-line summary

## Sources (n)
- [[source-id]]: Source title

## Syntheses (n)
- [[synthesis-name]]: One-line summary
```

## Log Format

```markdown
# Log

## [2026-04-12] ingest | Source Title
- Created wiki/sources/2026-04-12-source-slug.md
- Updated wiki/concepts/topic-name.md

## [2026-04-12] query | User question
- Answered with references to [[page1]], [[page2]]
- Suggested saving as [[synthesis-name]]

## [2026-04-12] lint | Health check
- Found 3 contradictions between page X and page Y
- 2 orphan pages identified
```

## Naming Conventions

- kebab-case for filenames: `2026-04-12-some-concept.md
- Title case for display: Some Concept
- Source IDs: `YYYY-MM-DD-source-slug`
- Use consistent prefixes: `ingest |`, `query |`, `lint |`

## Tools

- Search: When wiki grows beyond ~100 pages, use qmd or equivalent
- Graph view: Use Obsidian's graph to visualize connections
- Dataview: Query frontmatter for dynamic lists