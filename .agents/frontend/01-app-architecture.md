# Frontend App Architecture

Frontend should optimize for speed of understanding, not only visual polish.

## App Surfaces (MVP)

- `Dashboard`: health, recent ingest, quick actions.
- `Search`: hybrid query with filters and ranking clues.
- `Page`: markdown content + backlinks + outgoing links.
- `Graph`: interactive concept/entity relationship view.
- `Chat`: grounded Q and A with citations.
- `Ingest`: source import and run monitoring.

## Technical Conventions

- Use route-level data fetching and cache invalidation strategy.
- Use typed API clients and centralized error mapping.
- Keep state local by default; promote to shared state only when needed.
- Prefer server components for read-heavy views, client components for interaction-heavy views.

## UI State Baseline

Every major view implements:

- loading state
- empty state
- error state
- success state

## Performance Baseline

- Debounce query input.
- Virtualize long lists where needed.
- Stream chat tokens incrementally.
- Avoid full page re-renders on citation hover/select.

## Accessibility Baseline

- Keyboard navigation for search results and citations.
- Visible focus states.
- Semantic headings and landmarks.
- Color contrast that passes WCAG AA.
