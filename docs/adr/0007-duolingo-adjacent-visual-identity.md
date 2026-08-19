# ADR 0007: Duolingo-Adjacent Visual Identity

Status: Accepted

Date: 2026-08-19

Amends: ADR 0003 (Original Gamified UI and Brand Safety)

## Context

ADR 0003 required an original identity and explicitly avoided "exact screen
layouts" and "Duolingo-adjacent phrasing". In practice that was read as requiring
visual distance as well as legal distance, which left the product without a clear
reference for how the interface should feel.

The product owner has since asked for the interface to be as close to Duolingo as
is lawful. The distinction that matters is between mechanics and expression:

- **Mechanics** — the winding path map, node states, hearts, streak freezes, XP
  bars, league boards, lesson loop, instant feedback timing. These are functional
  interaction patterns and are not protectable.
- **Expression** — the mascot character, the specific palette, illustration style,
  copy voice, and sound design. These are protected by copyright and trade dress.

ADR 0003 conflated the two. This ADR separates them.

## Decision

Replicate Duolingo's learning mechanics and layout conventions closely and
deliberately. Chunky rounded controls, a vertical winding path of lesson nodes,
node state rings, a persistent top status bar, full-screen lesson player, and
end-of-lesson celebration are all in scope, including their timing and feel.

Build every asset original. The companion is an abstract geometric form (see
below), the palette is our own, all illustration and animation is authored for
this product, and copy is written in our own voice.

The companion is an abstract geometric character authored as Lottie shape layers
rather than an illustrated creature. Shape-layer authoring keeps it on-model
across all states by construction, keeps each state a few KB, allows recolouring
from design tokens, and places maximum distance between it and a protected
character.

## Consequences

- ADR 0003's originality constraints on *assets* remain fully in force. Only its
  implied constraint on *layout convention* is lifted.
- Trade-dress exposure rises from negligible to low. It stays acceptable while the
  app is localhost-only and single-user. Any move to public distribution requires a
  fresh review of visual distance before release.
- Design review must now check asset originality specifically, since visual
  similarity to the reference product is intentional and can no longer serve as a
  proxy for a problem.
- The abstract companion is cheaper to produce than an illustrated mascot and
  avoids the off-model drift that generated character art suffers across poses.

## Quality Gates

- No Duolingo mascot, character, artwork, animation file, sound, copy string, or
  palette value appears in the product.
- The companion is authored as vector shape layers and renders identically in all
  eleven states of the animation registry (ADR 0005).
- Every colour token is defined in our own palette file; no value is sampled from
  the reference product.
- Copy is written for this product; no reference-product phrasing is reused
  verbatim.
- Motion uses spring physics for interaction feedback, not only Lottie set pieces.
- A pre-release check confirms asset provenance for every shipped image, animation,
  and sound.
