import type { Lesson, LessonSession, LessonStep } from "../db/client.js";

function normalizeAnswer(value: unknown): string {
  if (Array.isArray(value)) {
    return value.map(String).map((part) => part.toLowerCase().trim()).sort().join("|");
  }

  return String(value ?? "").toLowerCase().trim();
}

function asPairRecord(value: unknown): Record<string, unknown> | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
}

export function validateLessonStepAnswer(step: LessonStep, answer: unknown): boolean {
  if (step.type === "explain" || step.type === "summary") {
    return true;
  }

  if (step.type === "recall" && step.expectedTerms.length > 0) {
    const normalized = normalizeAnswer(answer);
    const matches = step.expectedTerms.filter((term) => normalized.includes(term.toLowerCase())).length;
    return matches >= step.minimumTermsRequired;
  }

  if (step.type === "scenario" || step.type === "drill") {
    return normalizeAnswer(answer).length >= 12;
  }

  if (step.type === "match_pairs") {
    const expected = asPairRecord(step.correctAnswer);
    const given = asPairRecord(answer);

    if (!expected || !given) {
      return false;
    }

    const expectedKeys = Object.keys(expected);

    if (expectedKeys.length === 0 || expectedKeys.length !== Object.keys(given).length) {
      return false;
    }

    return expectedKeys.every((key) => normalizeAnswer(expected[key]) === normalizeAnswer(given[key]));
  }

  if (step.type === "order_steps" || (step.type === "cloze" && Array.isArray(step.correctAnswer))) {
    const expected = Array.isArray(step.correctAnswer) ? step.correctAnswer.map(String) : [];
    const given = Array.isArray(answer) ? answer.map(String) : [];

    if (expected.length === 0 || expected.length !== given.length) {
      return false;
    }

    return expected.every((value, index) => normalizeAnswer(value) === normalizeAnswer(given[index]));
  }

  return normalizeAnswer(step.correctAnswer) === normalizeAnswer(answer);
}

export function scoreLessonSession(lesson: Lesson, attempts: LessonSession["attempts"]): number {
  const gradedAttempts = attempts.filter((attempt) => {
    const attemptedStep = lesson.steps.find((candidate) => candidate.id === attempt.stepId);
    return attemptedStep?.type !== "explain" && attemptedStep?.type !== "summary";
  });

  if (gradedAttempts.length === 0) {
    return 1;
  }

  return gradedAttempts.filter((attempt) => attempt.isCorrect).length / gradedAttempts.length;
}

export function feedbackForLessonStep(step: LessonStep, isCorrect: boolean): string {
  return step.explanation || (isCorrect ? "Correct." : "Review the source card and try again.");
}

export function perfectBonusXpForLesson(lesson: Lesson, sessionScore: number): number {
  return sessionScore === 1 ? lesson.perfectBonusXp : 0;
}
