import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import type { AppConfig } from "../config.js";
import { loadSeedContent } from "./content-loader.js";
import { createStateStore } from "./state-store.js";
import {
  buildPathProgressSummary,
} from "../domain/curriculum.js";
import { buildProgressSummary, buildStreakSummary, buildXpSummary } from "../domain/progress.js";
import { listProjectSummaries } from "../domain/projects.js";
import { buildPersistedState, calculateTotalXp, findAnimation, localAnimationRegistry } from "../domain/local-adapter-support.js";
import { applyLessonStepAnswer, createLessonSession, finalizeLessonSession } from "../domain/local-learning-runtime.js";
import { applyLocalReviewAttempt, completeLocalProjectCheckpoint, findProjectById } from "../domain/local-review-project-runtime.js";
import { buildRepairQueue, dueReviewItems, type ReviewAttemptResult } from "../domain/reviews.js";
import { buildInitialConceptMap, buildSeedLearningPath } from "../domain/seed-learning.js";
import { scanWiki } from "../domain/wiki.js";
import { notFound } from "../errors.js";

export type LessonStepType =
  | "explain"
  | "multiple_choice"
  | "multi_select"
  | "recall"
  | "scenario"
  | "drill"
  | "order_steps"
  | "match_pairs"
  | "cloze"
  | "true_false"
  | "summary";

export type WikiPage = {
  id: string;
  slug: string;
  title: string;
  pageType: "concept" | "entity" | "source" | "synthesis" | "overview";
  filePath: string;
  tags: string[];
  excerpt: string;
  updatedAt: string;
};

export type ConceptNode = {
  id: string;
  slug: string;
  title: string;
  masteryLevel: number;
  tags: string[];
};

export type ConceptEdge = {
  from: string;
  to: string;
  type: "prerequisite" | "unlocks" | "related" | "source_link" | "project_dependency";
};

export type LessonChoice = {
  id: string;
  text: string;
};

export type LessonSourceRef = {
  title?: string;
  path?: string;
  section?: string;
};

export type LessonStep = {
  id: string;
  type: LessonStepType;
  prompt: string;
  body: string;
  choices: LessonChoice[];
  correctAnswer?: unknown;
  expectedTerms: string[];
  minimumTermsRequired: number;
  explanation: string;
  sourceRefs: LessonSourceRef[];
  reviewItemIds: string[];
  rubric: string[];
};

export type Lesson = {
  id: string;
  slug: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  xpReward: number;
  perfectBonusXp: number;
  status: "draft" | "published";
  sourcePageIds: string[];
  prerequisiteConceptIds: string[];
  unlockConceptIds: string[];
  masteryTargets: Array<{ conceptId: string; targetLevel: number }>;
  steps: LessonStep[];
};

export type PathUnit = {
  id: string;
  slug: string;
  title: string;
  description: string;
  sortOrder: number;
  lessons: Array<{
    id: string;
    title: string;
    status: "locked" | "available" | "completed";
    xpReward: number;
  }>;
};

export type LearningPath = {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: "draft" | "active";
  units: PathUnit[];
};

export type LessonSession = {
  id: string;
  learnerId: string;
  lessonId: string;
  status: "in_progress" | "completed";
  startedAt: string;
  completedAt?: string;
  score: number;
  xpAwarded: number;
  attempts: Array<{
    stepId: string;
    answer: unknown;
    isCorrect: boolean;
  }>;
};

export type ReviewItem = {
  id: string;
  conceptId: string;
  lessonId: string;
  prompt: string;
  answer: string;
  cardType: "definition" | "tradeoff" | "failure_mode" | "scenario" | "recall" | "multi_select" | "application";
  dueAt: string;
  intervalDays: number;
  status: "active" | "suspended" | "completed";
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: "draft" | "active";
  checkpoints: Array<{
    id: string;
    title: string;
    description: string;
    rubric: string[];
    xpReward: number;
    status: "available" | "completed";
    evidence?: string;
  }>;
};

export type AnimationAsset = {
  id: string;
  state: string;
  theme: string;
  filePath: string;
  reducedMotionFallback: string;
  description: string;
};

export type AppDataClient = ReturnType<typeof createAppDataClient>;

const nowIso = () => new Date().toISOString();

export function createAppDataClient(appConfig: AppConfig) {
  const dbDir = path.dirname(appConfig.databasePath);
  const stateKey = "learning-state";
  fs.mkdirSync(dbDir, { recursive: true });
  const db = new Database(appConfig.databasePath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  db.exec(fs.readFileSync(appConfig.schemaPath, "utf8"));
  db.exec(`
    CREATE TABLE IF NOT EXISTS app_state (
      key TEXT PRIMARY KEY,
      state_json TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
  db.prepare(
    `
      INSERT INTO learner_profiles (id, display_name, daily_goal_xp, reduced_motion)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        display_name = excluded.display_name,
        daily_goal_xp = excluded.daily_goal_xp,
        reduced_motion = excluded.reduced_motion,
        updated_at = CURRENT_TIMESTAMP
    `
  ).run(appConfig.learnerId, "Dummy Learner", 50, 0);

  const learnerProfile = db.prepare(
    "SELECT id, display_name, daily_goal_xp, reduced_motion FROM learner_profiles WHERE id = ?"
  ).get(appConfig.learnerId) as
    | {
        id: string;
        display_name: string;
        daily_goal_xp: number;
        reduced_motion: number;
      }
    | undefined;

  const { pathSeed, lessons, lessonById, defaultLessonStatus, defaultReviewItems, defaultProjects } = loadSeedContent(appConfig.workspaceRoot);
  const stateStore = createStateStore({
    db,
    stateKey,
    createDefaultState: () => ({
      lessonStatus: JSON.parse(JSON.stringify(defaultLessonStatus)) as Record<string, "locked" | "available" | "completed">,
      reviewItems: JSON.parse(JSON.stringify(defaultReviewItems)) as ReviewItem[],
      sessions: [],
      conceptMastery: {},
      projects: JSON.parse(JSON.stringify(defaultProjects)) as Project[]
    })
  });

  const persistedState = stateStore.load();
  const lessonStatus = new Map<string, "locked" | "available" | "completed">(Object.entries(persistedState.lessonStatus) as Array<
    [string, "locked" | "available" | "completed"]
  >);
  const reviewItems = persistedState.reviewItems;
  const projects = persistedState.projects;
  const sessions = new Map<string, LessonSession>(persistedState.sessions.map((session) => [session.id, session]));
  const conceptMastery = new Map<string, number>(Object.entries(persistedState.conceptMastery));
  let wikiState = scanWiki(appConfig.wikiPath);

  const conceptMap = buildInitialConceptMap(lessons, conceptMastery);

  function buildPath(): LearningPath {
    return buildSeedLearningPath(pathSeed, lessonById, lessonStatus);
  }

  function totalXp(): number {
    return calculateTotalXp(sessions.values(), projects);
  }

  function persistState() {
    stateStore.save(buildPersistedState(lessonStatus, reviewItems, sessions.values(), conceptMap, projects));
  }

  return {
    async health() {
      const schema = fs.readFileSync(appConfig.schemaPath, "utf8");

      return {
        status: "ok",
        database: {
          mode: "sqlite",
          sqlitePath: appConfig.databasePath,
          schemaLoaded: schema.includes("CREATE TABLE IF NOT EXISTS learner_profiles")
        },
        content: {
          lessons: lessons.length,
          reviews: reviewItems.length,
          projects: projects.length
        },
        wikiPath: appConfig.wikiPath
      };
    },

    syncWiki() {
      wikiState = scanWiki(appConfig.wikiPath);
      return {
        syncedAt: nowIso(),
        mode: "filesystem-scan",
        scannedPath: appConfig.wikiPath,
        pagesUpserted: wikiState.pages.length,
        linksUpserted: wikiState.edges.length,
        conceptsUpserted: wikiState.concepts.length,
        missingLinks: wikiState.missingLinks.slice(0, 50),
        warnings: wikiState.missingLinks.length > 50 ? [`${wikiState.missingLinks.length - 50} additional missing links omitted.`] : []
      };
    },

    listWikiPages() {
      return wikiState.pages;
    },

    getWikiPage(id: string) {
      const page = wikiState.pages.find((candidate) => candidate.id === id || candidate.slug === id);
      if (!page) throw notFound("wiki page", id);
      return page;
    },

    getWikiGraph() {
      return { nodes: wikiState.concepts, edges: wikiState.edges };
    },

    listPaths() {
      const path = buildPath();
      return [
        {
          id: path.id,
          slug: path.slug,
          title: path.title,
          description: path.description,
          status: path.status,
          unitCount: path.units.length,
          lessonCount: path.units.reduce((count, unit) => count + unit.lessons.length, 0)
        }
      ];
    },

    getPath(id: string) {
      const path = buildPath();
      if (path.id !== id && path.slug !== id) throw notFound("learning path", id);
      return path;
    },

    getPathProgress(id: string) {
      return buildPathProgressSummary(this.getPath(id), appConfig.learnerId, totalXp());
    },

    getLesson(id: string) {
      const lesson = lessons.find((candidate) => candidate.id === id || candidate.slug === id);
      if (!lesson) throw notFound("lesson", id);
      return lesson;
    },

    startLesson(lessonId: string) {
      const lesson = this.getLesson(lessonId);

      const session: LessonSession = {
        id: randomUUID(),
        learnerId: appConfig.learnerId,
        lessonId: lesson.id,
        status: "in_progress",
        startedAt: nowIso(),
        score: 0,
        xpAwarded: 0,
        attempts: []
      };

      sessions.set(session.id, session);
      persistState();
      return createLessonSession(session, lessonStatus, lesson);
    },

    submitStepAnswer(sessionId: string, stepId: string, answer: unknown) {
      const session = sessions.get(sessionId);
      if (!session) throw notFound("lesson session", sessionId);

      const lesson = this.getLesson(session.lessonId);
      const result = applyLessonStepAnswer(session, lesson, stepId, answer, reviewItems);
      if (!result) throw notFound("lesson step", stepId);

      persistState();
      return result;
    },

    completeLesson(sessionId: string) {
      const session = sessions.get(sessionId);
      if (!session) throw notFound("lesson session", sessionId);

      const lesson = this.getLesson(session.lessonId);
      const result = finalizeLessonSession(session, lesson, lessons, lessonStatus, conceptMap, nowIso());

      persistState();
      return result;
    },

    getProgressSummary() {
      return buildProgressSummary({
        learnerId: appConfig.learnerId,
        dailyGoalXp: learnerProfile?.daily_goal_xp ?? 50,
        xpToday: totalXp(),
        reviewItems,
        concepts: Array.from(conceptMap.values())
      });
    },

    getMastery() {
      return Array.from(conceptMap.values()).map((concept) => ({
        conceptId: concept.id,
        title: concept.title,
        masteryLevel: concept.masteryLevel,
        confidence: concept.masteryLevel / 5,
        lastMasteryEvent: concept.masteryLevel > 0 ? "lesson_progress" : "unseen"
      }));
    },

    getStreak() {
      return buildStreakSummary(this.getProgressSummary());
    },

    getXp() {
      return buildXpSummary({
        learnerId: appConfig.learnerId,
        summary: this.getProgressSummary(),
        sessions: Array.from(sessions.values())
      });
    },

    getDueReviews() {
      return dueReviewItems(reviewItems);
    },

    recordReviewAttempt(reviewId: string, result: ReviewAttemptResult) {
      const outcome = applyLocalReviewAttempt(reviewItems, reviewId, result);
      if (!outcome) throw notFound("review item", reviewId);
      persistState();

      return outcome;
    },

    getRepairQueue() {
      return buildRepairQueue(reviewItems);
    },

    listProjects() {
      return listProjectSummaries(projects);
    },

    getProject(id: string) {
      const project = findProjectById(projects, id);
      if (!project) throw notFound("project", id);
      return project;
    },

    completeCheckpoint(projectId: string, checkpointId: string, evidence: string) {
      const result = completeLocalProjectCheckpoint(projects, projectId, checkpointId, evidence, conceptMap);
      if (!result && !findProjectById(projects, projectId)) throw notFound("project", projectId);
      if (!result) throw notFound("project checkpoint", checkpointId);

      persistState();

      return result;
    },

    listAnimations() {
      return localAnimationRegistry();
    },

    getAnimation(state: string) {
      const animation = findAnimation(this.listAnimations(), state);
      if (!animation) throw notFound("animation asset", state);
      return animation;
    }
  };
}
