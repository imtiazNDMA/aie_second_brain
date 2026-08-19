# ADR 0005: Lottie Asset Governance

Status: Accepted

Date: 2026-07-07

## Context

Lottie animations are required to make the local app feel immersive and alive. They should reinforce AI Engineering concepts and learning states while remaining accessible, local, performant, and brand-safe.

## Decision

Store Lottie JSON assets locally under `public/lottie/` and manage them through an animation asset registry. Use original, custom-created, or properly licensed assets only. Map animations to app states such as onboarding, unit intro, lesson start, answer feedback, completion, streaks, review empty state, repair, project unlock, wiki sync, and lesson generation.

## Consequences

- The app can run offline after assets are installed.
- Animation choices remain separate from lesson and mastery logic.
- Asset licensing, file size, lazy loading, and reduced-motion fallbacks must be reviewed.
- Continuous motion must be limited during question-solving screens.

## Quality Gates

- Every animation has license/source metadata or is marked custom-created.
- No remote Lottie assets are loaded at runtime.
- Reduced-motion mode renders static fallback content instead of playback.
- Large animations are lazy-loaded by screen or state.
- Animation states reinforce learning context rather than acting as unrelated decoration.
