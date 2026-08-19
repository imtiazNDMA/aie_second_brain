import test from "node:test";
import assert from "node:assert/strict";
import type { Lesson, LessonStep } from "../db/client.js";
import { feedbackForLessonStep, perfectBonusXpForLesson, scoreLessonSession, validateLessonStepAnswer } from "./lesson-runtime.js";

function makeStep(overrides: Partial<LessonStep> = {}): LessonStep {
  return {
    id: "step-1",
    type: "multiple_choice",
    prompt: "Prompt",
    body: "",
    choices: [
      { id: "a", text: "A" },
      { id: "b", text: "B" }
    ],
    correctAnswer: "a",
    expectedTerms: [],
    minimumTermsRequired: 0,
    explanation: "",
    sourceRefs: [],
    reviewItemIds: [],
    rubric: [],
    ...overrides
  };
}

function makeLesson(steps: LessonStep[]): Lesson {
  return {
    id: "lesson-1",
    slug: "lesson-1",
    title: "Lesson 1",
    description: "Desc",
    estimatedMinutes: 5,
    xpReward: 10,
    perfectBonusXp: 5,
    status: "published",
    sourcePageIds: [],
    prerequisiteConceptIds: [],
    unlockConceptIds: [],
    masteryTargets: [],
    steps
  };
}

test("validateLessonStepAnswer handles multiple choice and recall", () => {
  const choiceStep = makeStep();
  assert.equal(validateLessonStepAnswer(choiceStep, "a"), true);
  assert.equal(validateLessonStepAnswer(choiceStep, "b"), false);

  const recallStep = makeStep({
    type: "recall",
    correctAnswer: undefined,
    expectedTerms: ["retrieval", "grounding", "external knowledge"],
    minimumTermsRequired: 2
  });
  assert.equal(validateLessonStepAnswer(recallStep, "Uses retrieval for external knowledge."), true);
  assert.equal(validateLessonStepAnswer(recallStep, "Only grounding."), false);
});

test("validateLessonStepAnswer handles scenario length threshold", () => {
  const scenarioStep = makeStep({ type: "scenario", correctAnswer: undefined });
  assert.equal(validateLessonStepAnswer(scenarioStep, "too short"), false);
  assert.equal(validateLessonStepAnswer(scenarioStep, "This answer is long enough."), true);
});

test("scoreLessonSession ignores explain and summary steps", () => {
  const steps = [
    makeStep({ id: "s1", type: "explain" }),
    makeStep({ id: "s2", type: "multiple_choice" }),
    makeStep({ id: "s3", type: "summary" }),
    makeStep({ id: "s4", type: "recall", correctAnswer: undefined })
  ];
  const lesson = makeLesson(steps);

  const score = scoreLessonSession(lesson, [
    { stepId: "s1", answer: true, isCorrect: true },
    { stepId: "s2", answer: "a", isCorrect: true },
    { stepId: "s4", answer: "bad", isCorrect: false }
  ]);

  assert.equal(score, 0.5);
});

test("feedbackForLessonStep and perfectBonusXpForLesson use current lesson rules", () => {
  const step = makeStep({ explanation: "Specific feedback" });
  assert.equal(feedbackForLessonStep(step, false), "Specific feedback");
  assert.equal(feedbackForLessonStep(makeStep({ explanation: "" }), false), "Review the source card and try again.");
  assert.equal(perfectBonusXpForLesson(makeLesson([step]), 1), 5);
  assert.equal(perfectBonusXpForLesson(makeLesson([step]), 0.75), 0);
});

test("order_steps rejects the right elements in the wrong order", () => {
  const step = makeStep({
    type: "order_steps",
    choices: [],
    correctAnswer: ["chunk", "embed", "index", "retrieve"]
  });

  assert.equal(validateLessonStepAnswer(step, ["embed", "chunk", "index", "retrieve"]), false);
});

test("order_steps accepts the exact sequence", () => {
  const step = makeStep({
    type: "order_steps",
    choices: [],
    correctAnswer: ["chunk", "embed", "index", "retrieve"]
  });

  assert.equal(validateLessonStepAnswer(step, ["chunk", "embed", "index", "retrieve"]), true);
});

test("match_pairs rejects a wrong pairing", () => {
  const step = makeStep({
    type: "match_pairs",
    choices: [],
    correctAnswer: { BM25: "lexical", HNSW: "vector index", MMR: "diversity" }
  });

  assert.equal(
    validateLessonStepAnswer(step, { BM25: "vector index", HNSW: "lexical", MMR: "diversity" }),
    false
  );
});

test("match_pairs accepts the correct pairing regardless of key order", () => {
  const step = makeStep({
    type: "match_pairs",
    choices: [],
    correctAnswer: { BM25: "lexical", HNSW: "vector index" }
  });

  assert.equal(validateLessonStepAnswer(step, { HNSW: "vector index", BM25: "lexical" }), true);
});

test("cloze rejects blanks filled in the wrong order", () => {
  const step = makeStep({
    type: "cloze",
    choices: [],
    correctAnswer: ["precision", "recall"]
  });

  assert.equal(validateLessonStepAnswer(step, ["recall", "precision"]), false);
});

test("true_false grades against the expected boolean", () => {
  const step = makeStep({ type: "true_false", choices: [], correctAnswer: true });

  assert.equal(validateLessonStepAnswer(step, true), true);
  assert.equal(validateLessonStepAnswer(step, false), false);
});

test("cloze with a single blank ignores case and surrounding space", () => {
  const step = makeStep({ type: "cloze", choices: [], correctAnswer: "reranking" });

  assert.equal(validateLessonStepAnswer(step, "  Reranking "), true);
  assert.equal(validateLessonStepAnswer(step, "chunking"), false);
});
