# Retrieval, Chat, and Citations

This guide defines grounded answer generation from wiki and raw-derived content.

## Retrieval Strategy

- Use hybrid retrieval:
  - lexical: trigram/full-text for exact term matches
  - semantic: vector search for conceptual matches
- Merge and de-duplicate candidates.
- Apply reranker to top N results.
- Return chunk-level evidence with each candidate.

## Ranking Defaults

- lexical_k = 30
- semantic_k = 30
- merge_k = 40
- rerank_k = 12
- context_k = 8

Tune with offline eval before changing defaults.

## Chat Assembly

1. Build query intent and filters.
2. Retrieve and rerank evidence chunks.
3. Build system prompt with hard constraints:
   - cite sources
   - do not invent facts
   - say unknown when evidence is weak
4. Generate answer.
5. Emit citation events tied to chunks.

## Citation Rules

- Every factual statement should map to at least one chunk citation.
- Cite using stable identifiers (source slug + chunk id).
- UI should make citations clickable.
- If no reliable evidence exists, answer with uncertainty and no forced citation.

## Tooling Interface (future-ready)

Design chat engine to support tool calls:

- `search_pages(query, filters)`
- `read_page(slug)`
- `expand_neighbors(slug, depth)`
- `find_path_between_pages(start, end)`

Keep tool API pure and deterministic so it can be used by any LLM provider.
