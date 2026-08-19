# ADR 0009: Hybrid Content Generation

Status: Accepted

Date: 2026-08-19

## Context

`todos.md` recorded a settled decision: "manual/offline seed content first,
optional provider later." That was sound when the scope was one path of ten
lessons. Moving to five tracks invalidated the assumption the decision rested on.

Measured authoring cost from the existing hand-written content:

- `rag-foundations` = 3 units, 10 lessons, 2,008 lines of JSON.
- Approximately 200 lines per lesson.

Five tracks over roughly 418 track-relevant wiki pages at ~3 pages per lesson is
about 140 lessons, or roughly 28,000 lines of hand-authored JSON. That is not
achievable by a single author alongside building the application.

The PRD imposes a hard constraint on any generated content: "each generated
question validated against source text, so that the app does not teach
hallucinated material."

Local generation is viable at no cost: the target machine runs Ollama on an
A6000 Ada 48GB, and ten hand-authored lessons already exist as exemplars.

## Decision

Generate lesson content with a local Ollama model, seeded by hand-authored
exemplars, behind a validation gate and a human review step.

1. **Seed.** The ten hand-authored `rag-foundations` lessons are the golden
   reference for format and depth, and serve as few-shot exemplars. They are not
   regenerated.
2. **Generate.** Ollama drafts lessons from wiki pages using those exemplars.
3. **Validate.** Every generated claim, question stem, and correct answer must be
   traceable to quoted text in the cited wiki page(s). Drafts failing validation
   are rejected before reaching review, not after.
4. **Review.** Surviving drafts land in a review queue and require explicit human
   approval before publication.

No cloud provider is used. Generation stays local and free, consistent with the
project's cost and localhost constraints.

## Consequences

- Exemplar quality directly determines output quality. Degrading the ten seed
  lessons degrades all ~130 generated ones.
- The lesson step schema (ADR 0010's companion decision, recorded in `plan.md`)
  must be settled before bulk generation. Changing it later means regenerating
  everything.
- The validation gate needs the source text available at generation time, so
  generation depends on wiki sync having run.
- A review queue becomes a real product surface with real work behind it, not an
  afterthought. ~130 lessons is a substantial review backlog.
- Stub pages (29 in the current wiki) cannot produce honest lessons and must be
  excluded from generation input.

## Quality Gates

- No lesson reaches a learner without explicit human approval.
- Every published question cites at least one wiki page, and the cited page
  contains text supporting the correct answer.
- Drafts that fail source validation are rejected automatically and logged with
  the failing claim.
- Pages tagged `stub` are excluded from generation input.
- Generation is reproducible: the same page, exemplars, and model produce a
  comparable draft.
- The ten seed lessons remain hand-authored and are never overwritten by
  generation.
