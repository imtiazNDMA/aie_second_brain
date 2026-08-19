# ADR 0001: Local-First Localhost App

Status: Accepted

Date: 2026-07-07

## Context

The MVP must turn the existing AI Engineering wiki into a polished learning app without adding hosted deployment, auth, billing, sync, or multi-user operations. The source content already lives in this local vault.

## Decision

Build the MVP as a local-first web app that runs on localhost, reads the local `wiki/` directory, and serves a single local learner profile.

The app should start with one command, expose only local development ports by default, and keep hosted deployment as a later migration path.

## Consequences

- The MVP can ship faster because it avoids production infrastructure.
- User wiki content and learning progress stay on the user's machine.
- The app can depend on direct filesystem access for wiki sync.
- No production authentication is required for MVP.
- Future hosted support will need a migration plan for auth, cloud storage, and multi-user isolation.

## Quality Gates

- The app runs from a clean checkout with one documented local command.
- The first screen is the active learning path, not a marketing or documentation page.
- Backend services bind to localhost by default.
- The app works without network access after dependencies and local assets are installed.
- Wiki sync reads source files without mutating them.
