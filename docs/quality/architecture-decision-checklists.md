# Architecture Decision Quality Checklists

Use these checklists when implementing or reviewing work tied to the accepted MVP architecture decisions.

## Local-First Localhost App

- [ ] App starts locally with one documented command.
- [ ] Browser UI opens on the active learning path.
- [ ] Backend binds to localhost by default.
- [ ] Wiki sync reads from the configured local vault path.
- [ ] Wiki sync does not mutate files in `wiki/`.
- [ ] No production auth, cloud sync, billing, or hosted-only dependency is required for MVP use.
- [ ] Network calls are optional and user-triggered when generation needs an external API.
- [ ] API keys are read from environment variables, not persisted in app tables.

## SQLite-First Persistence

- [ ] SQLite migrations are committed and repeatable.
- [ ] Schema covers learner profile, wiki pages, links, concepts, paths, lessons, steps, sessions, attempts, reviews, mastery, XP, streaks, projects, checkpoints, progress, and animation assets.
- [ ] Source-derived records are distinguishable from learner progress records.
- [ ] Core learning flow persists across server restart.
- [ ] Database reset or progress deletion requires explicit confirmation.
- [ ] Tests verify at least one full persistence round trip.

## Original Gamified UI and Brand Safety

- [ ] Product name, mascot or companion, colors, icons, badges, copy, node shapes, and screen layouts are original.
- [ ] No Duolingo protected assets, mascot, characters, animation files, sounds, exact colors, exact copy, or exact screen structure are used.
- [ ] UI is mobile-first and path-based.
- [ ] Each screen has one obvious next action.
- [ ] The UI feels like a consumer learning app, not an LMS, wiki reader, or admin dashboard.
- [ ] Project and mastery gates keep competence more important than streak activity.

## Lesson and Mastery Domain Model

- [ ] Lessons map to source wiki pages.
- [ ] Lesson steps support explanation, multiple choice, multi-select, recall, scenario, drill, and summary types.
- [ ] Answer validation is deterministic for MVP.
- [ ] Lesson runtime records attempts and emits typed learning outcomes.
- [ ] XP, streak, review, and mastery updates are derived from learning outcomes.
- [ ] Mastery levels follow 0 unseen, 1 introduced, 2 recognized, 3 recalled, 4 applied, 5 project-proven.
- [ ] Project checkpoints are required for project-proven mastery.
- [ ] Wrong answers schedule review or weak-skill repair.

## Lottie Asset Governance

- [ ] Lottie files are stored locally under `public/lottie/`.
- [ ] Animation metadata records state, theme, local path, description, fallback, and license/source.
- [ ] Runtime does not load remote Lottie URLs.
- [ ] Animations are lazy-loaded by route, screen, or state.
- [ ] Reduced-motion preference disables playback and shows static fallback.
- [ ] Question screens avoid distracting continuous loops.
- [ ] Animation themes reinforce AI Engineering concepts or learning states.
