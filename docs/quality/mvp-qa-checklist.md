# MVP QA Checklist

Use this checklist before calling the local AI Engineering learning platform MVP releasable.

## Local App Smoke Test

- [ ] Fresh checkout can install dependencies.
- [ ] One documented command starts the local app.
- [ ] Frontend opens at the expected localhost URL.
- [ ] Backend health endpoint reports database connectivity.
- [ ] App remains usable without network after dependencies and local assets are installed.

## Wiki Sync

- [ ] Manual wiki sync scans selected `wiki/` pages.
- [ ] Frontmatter, title, tags, page type, body hash, excerpt, and wikilinks are parsed.
- [ ] Resolved and unresolved wikilinks appear in the sync report.
- [ ] Sync skips catalog/log files unless configured otherwise.
- [ ] Sync does not modify source wiki files.

## Learning Flow

- [ ] Home screen shows active path, next lesson, daily XP goal, streak, review queue, weak skills, and project checkpoint.
- [ ] RAG Foundations path renders units and lesson states.
- [ ] Learner can start and complete a 3-7 minute lesson.
- [ ] Lesson includes explanation, recognition, recall, scenario, drill, and summary steps where applicable.
- [ ] Correct and incorrect answers show useful feedback.
- [ ] Lesson completion awards XP and updates progress.
- [ ] Source wiki references are visible from lesson content.

## Review and Mastery

- [ ] Wrong answers create review or repair items.
- [ ] Due review queue returns scheduled cards.
- [ ] Review attempts reschedule cards.
- [ ] Mastery updates from introduced, recognized, recalled, applied, and project checkpoint events.
- [ ] Mastery level 5 requires project evidence.
- [ ] Weak concepts appear in the learner summary.

## Persistence

- [ ] Learner profile persists after page refresh.
- [ ] Lesson attempts persist after backend restart.
- [ ] XP, streaks, reviews, mastery, and project progress persist after backend restart.
- [ ] Database migrations run from an empty local database.
- [ ] Reset progress flow requires explicit confirmation.

## UI, Accessibility, and Brand Safety

- [ ] UI is mobile-first and responsive at narrow and desktop widths.
- [ ] First screen is the active learning path.
- [ ] Each screen has one primary next action.
- [ ] Reduced-motion mode disables Lottie playback.
- [ ] Lottie assets load from local files only.
- [ ] No Duolingo protected assets, mascot, exact colors, exact screen layouts, sounds, or copy are present.
- [ ] Project screens are more rigorous than quick drills while still fitting the same product identity.

## Test Coverage

- [ ] Backend parser fixtures pass.
- [ ] Concept graph tests pass.
- [ ] Question engine tests pass for each MVP question type.
- [ ] Lesson runtime tests pass.
- [ ] Review scheduler tests pass.
- [ ] Mastery and XP tests pass.
- [ ] Lottie asset registry tests pass.
- [ ] Frontend behavior tests cover home, path, lesson, review, completion, and reduced-motion behavior.
