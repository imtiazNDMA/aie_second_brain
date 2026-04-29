# Ingest Pipeline with Ollama (Gemma)

This guide defines the ingestion workflow for extracting knowledge from files in `raw/`.

## Model Policy

- Primary extraction model: `gemma4:latest`
- Fallback extraction model: `gemma3:27b-instruct`
- Embedding model: `mxbai-embed-large`

Environment defaults:

```env
LLM_PROVIDER=ollama
LLM_MODEL=gemma4:latest
LLM_FALLBACK_MODEL=gemma3:27b-instruct
OLLAMA_BASE_URL=http://localhost:11434
EMBED_PROVIDER=ollama
EMBED_MODEL=mxbai-embed-large
EMBED_DIM=1024
```

## Pipeline Stages

1. Source discovery
   - Scan `raw/` recursively.
   - Skip files already processed with identical content hash.
2. Parsing
   - Extract text from markdown, txt, pdf.
   - Attach metadata: filename, path, checksum, modified time.
3. Chunking
   - Chunk by semantic boundaries where possible (headers/paragraphs).
   - Preserve chunk offsets for citations.
4. LLM extraction
   - Send chunk windows to Gemma using strict JSON schema prompt.
   - Collect summary, claims, entities, concepts, wikilinks, confidence.
5. Validation
   - Validate JSON with schema.
   - Retry once on parse failure, then fallback model.
6. Persistence
   - Upsert pages, links, chunks, and embeddings.
   - Record ingest run status and diagnostics.
7. Post-processing
   - Recompute backlinks and graph degree stats.
   - Append run results to operational log.

## Required Structured Output

Extraction payload should conform to:

```json
{
  "source_title": "string",
  "summary": "string",
  "key_claims": ["string"],
  "entities": [{"name":"string","type":"person|org|tool|other","evidence":"string"}],
  "concepts": [{"name":"string","evidence":"string"}],
  "wikilinks": ["Page Name"],
  "citations": [{"chunk_id":"string","quote":"string"}],
  "confidence": 0.0
}
```

## Prompting Guardrails

- Instruct model to output JSON only.
- Forbid fabricated claims and links.
- Require every claim to map to one citation.
- Include a low-confidence signal when uncertain.

## Failure Handling

- If both models fail schema validation, mark source as `needs_review`.
- Persist partial parse artifacts for manual repair.
- Never delete prior successful extraction on failed rerun.
