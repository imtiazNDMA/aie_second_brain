# Prompt Spec Template

Use this template for any prompt used in ingest, retrieval orchestration, or chat generation.

## Metadata

- Prompt ID: `prompt-<area>-<name>`
- Version: `v1`
- Owner: `<team-or-person>`
- Status: `draft | active | deprecated`
- Last updated: `YYYY-MM-DD`

## Purpose

Describe what this prompt must achieve and why model inference is required.

## Inputs

- User input shape:
- Retrieved context shape:
- Optional tool outputs:
- Constraints (token budget, max context chunks):

## Output Contract

- Format: `json | markdown | plain-text`
- Schema version: `v1`
- Required fields:
- Optional fields:

Example JSON schema (adjust as needed):

```json
{
  "type": "object",
  "properties": {
    "answer": { "type": "string" },
    "citations": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "source_slug": { "type": "string" },
          "chunk_id": { "type": "string" }
        },
        "required": ["source_slug", "chunk_id"]
      }
    },
    "confidence": { "type": "number" }
  },
  "required": ["answer", "citations"]
}
```

## System Prompt

```text
<put the full system prompt here>
```

## Developer Notes

- Forbidden behaviors:
- Citation rules:
- Tool usage rules:
- Failure behavior:

## Test Cases

1. Happy path:
2. Ambiguous query:
3. No evidence available:
4. Adversarial/prompt injection:

## Release Checklist

- [ ] Schema validates under expected output variance
- [ ] Fallback behavior tested
- [ ] Eval set results recorded
- [ ] Prompt/model version persisted in telemetry
