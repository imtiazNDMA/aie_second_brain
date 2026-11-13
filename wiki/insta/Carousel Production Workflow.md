---
title: Carousel Production Workflow
type: content-workflow
tags: [instagram, carousel, workflow, visual-design]
sources: ["Artem Novitckii — AI Content Systems.md"]
created: 2026-09-11
updated: 2026-09-11
---

# Carousel Production Workflow

Adapted from Artem Novitckii's copy-first, visual-anchor workflow.

## Time allocation

- 40%: research, slide list, and exact copy
- 50%: visual reference and slide 1 anchor
- 10%: remaining slides and polish

## 1. Select and research

Choose the next item from [[AI Engineering Carousel Backlog]]. Read the primary concept, linked synthesis, and source page. If the wiki cannot support the thesis, improve the wiki before writing the post.

## 2. Write and review copy

Use [[Instagram Carousel Template]] as a stage gate. During `drafting`, complete the brief, five hooks, slide script, caption, and review fields. Add accessibility and visual-anchor fields after the copy reaches `review`; complete post-publication fields only after publishing. Verify every technical claim and run the quality gate.

Freeze the approved slide text. Image generation is a layout step, not a copywriting step.

## 3. Find a non-Instagram reference

Search for a strong visual language in editorial books, technical manuals, scientific diagrams, indie magazines, industrial catalogs, posters, album sleeves, or information-design archives.

Select one reference for the deck. Record what to borrow:

- typography hierarchy
- spacing and grid
- color treatment
- texture
- visual pacing
- layout logic

Record what must not be copied: exact text, branding, illustrations, or composition.

## 4. Generate slide 1

Generate five distinct cover directions at 1080 x 1350, using the reference as visual inspiration. Keep the exact approved hook and no other generated words.

Do not proceed until one version has:

- immediate readability at phone size
- a recognizable visual identity
- enough layout flexibility for diagrams and body slides
- contrast and hierarchy that survive compression
- no generic AI visual cliches

This approved cover becomes the visual anchor.

## 5. Generate one slide at a time

Attach slide 1 as the reference for every subsequent slide. Generate three versions of each slide, preserving typography, spacing, color, texture, hierarchy, and design language.

Each slide has one visual job: mechanism, sequence, comparison, architecture, example, failure, or decision rule.

## 6. Polish

Use editable layers for small text or alignment corrections. Regenerate when the composition is wrong; edit when the slide is already 95% correct.

Check the complete deck at thumbnail size and full-screen phone size.

## 7. Publish and learn

Publish the approved caption, alt text, and carousel. Record results in [[Instagram Publishing Log]] after 48 hours and 14 days. Convert comments and questions into backlog items.

## Anchor prompt

```text
Create 5 visually distinct versions of slide 1 for an Instagram carousel.

Use the attached reference as visual inspiration only. Borrow its typography
hierarchy, spacing, color treatment, texture, visual pacing, and layout logic.
Do not copy its exact text, branding, illustrations, or composition.

Audience: aspiring AI engineers.
Topic: [TOPIC]
Slide goal: stop the right reader and create a clear reason to swipe.
Exact text: [APPROVED HOOK]
Visual direction: [DIRECTION]

Style: editorial, technically credible, clear, highly readable, and designed
without feeling corporate or generically AI-generated.

Format: 4:5 vertical, 1080x1350.

Rules:
- use only the exact supplied text
- keep every word readable at phone size
- add no random words, labels, logos, or claims
- make each version compositionally distinct
- avoid generic robots, glowing brains, and blue-purple AI gradients
```

## Body-slide prompt

```text
Create 3 versions of slide [NUMBER] for this Instagram carousel.

Use the attached slide 1 as the visual anchor. Match its typography, grid,
spacing, color, texture, visual hierarchy, and editorial design language.
This must feel like the same deck, not a new carousel.

Audience: AI engineers, software engineers, developers.
Topic: [TOPIC]
Slide type: [MECHANISM / SEQUENCE / COMPARISON / EXAMPLE / FAILURE / DECISION]
Slide goal: [GOAL]
Exact text: [APPROVED COPY]
Visual direction: [DIRECTION]

Format: 4:5 vertical, 1080x1350.

Rules:
- use only the exact supplied text
- add no random words, labels, logos, or facts
- preserve readability at phone size
- communicate one clear idea
- stay visually consistent with slide 1
```
