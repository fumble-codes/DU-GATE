import type { User, TestResult, Question, TestDefinition, TestAttempt, Subject } from "@/types";

const P = "cuetpioneer";

function getStore<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`${P}_${key}`);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function setStore<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(`${P}_${key}`, JSON.stringify(value)); }
  catch (e) { console.error("Storage error:", e); }
}

/* ── Session / Users ── */
export function getSession(): User | null { return getStore<User>("session"); }
export function setSession(user: User | null): void { setStore("session", user); }
export function getUsers(): Record<string, string> { return getStore<Record<string, string>>("users") || {}; }
export function setUsers(users: Record<string, string>): void { setStore("users", users); }

/* ── Mock Question Bank ── */
export function getMockQuestions(): Question[] { return getStore<Question[]>("mock_questions") || []; }
export function addMockQuestions(questions: Question[]): void {
  setStore("mock_questions", [...getMockQuestions(), ...questions]);
}
export function getMockQuestion(id: string): Question | undefined {
  return getMockQuestions().find(q => q.id === id);
}

/* ── PYQ Question Bank ── */
export function getPyqQuestions(): Question[] { return getStore<Question[]>("pyq_questions") || []; }
export function addPyqQuestions(questions: Question[]): void {
  setStore("pyq_questions", [...getPyqQuestions(), ...questions]);
}
export function getPyqQuestion(id: string): Question | undefined {
  return getPyqQuestions().find(q => q.id === id);
}
export function getPyqQuestionsBySubject(subject: Subject): Question[] {
  return getPyqQuestions().filter(q => q.subject === subject);
}
export function getPyqQuestionsByChapter(subject: Subject, chapter: string): Question[] {
  return getPyqQuestions().filter(q => q.subject === subject && q.chapter === chapter);
}

/* ── Question lookup (either bank) ── */
export function getQuestion(id: string): Question | undefined {
  return getMockQuestion(id) || getPyqQuestion(id);
}

export function getQuestions(ids: string[]): Question[] {
  const all = [...getMockQuestions(), ...getPyqQuestions()];
  const map = new Map(all.map(q => [q.id, q]));
  return ids.map(id => map.get(id)).filter(Boolean) as Question[];
}

/* ── Clear all data ── */
export function clearAll(): void {
  const keys = Object.keys(localStorage).filter(k => k.startsWith(`${P}_`));
  keys.forEach(k => localStorage.removeItem(k));
}

/* ── Test Definitions ── */
export function getTestDefinitions(): TestDefinition[] { return getStore<TestDefinition[]>("tests") || []; }
export function getTestDefinition(id: string): TestDefinition | undefined {
  return getTestDefinitions().find(t => t.id === id);
}
export function addTestDefinition(test: TestDefinition): void {
  setStore("tests", [...getTestDefinitions(), test]);
}

/* ── Test Attempts ── */
export function getAttempts(): TestAttempt[] { return getStore<TestAttempt[]>("attempts") || []; }
export function getAttempt(id: string): TestAttempt | undefined {
  return getAttempts().find(a => a.id === id);
}
export function getInProgressAttempts(): TestAttempt[] {
  return getAttempts().filter(a => a.status === "in-progress");
}
export function saveAttempt(attempt: TestAttempt): void {
  const attempts = getAttempts();
  const idx = attempts.findIndex(a => a.id === attempt.id);
  if (idx > -1) attempts[idx] = attempt;
  else attempts.push(attempt);
  setStore("attempts", attempts);
}

/* ── Submit attempt (compute scores, persist result + errors) ── */
export function submitAttempt(
  attemptId: string,
  answers: Record<string, number | null>,
  markedForReview: string[],
  timeTaken: number,
): TestAttempt {
  const attempt = getAttempt(attemptId);
  if (!attempt) throw new Error(`Attempt ${attemptId} not found`);

  const test = getTestDefinition(attempt.testId);
  const questions = test ? getQuestions(test.questionIds) : [];

  let correct = 0;
  let incorrect = 0;
  let skipped = 0;

  for (const q of questions) {
    const selected = answers[q.id];
    if (selected === null || selected === undefined) skipped++;
    else if (selected === q.correctAnswer) correct++;
    else incorrect++;
  }

  const marksPerQ = test?.marksPerQuestion ?? 5;
  const negative = test?.negativeMarking ?? 0;
  const score = (correct * marksPerQ) - (incorrect * negative);
  const total = questions.length * marksPerQ;
  const skippedCalc = questions.length - correct - incorrect;

  const completed: TestAttempt = {
    ...attempt,
    status: "completed",
    submittedAt: new Date().toISOString(),
    answers,
    markedForReview,
    score,
    total,
    correct,
    incorrect,
    skipped: skippedCalc,
    timeTaken,
  };

  saveAttempt(completed);

  /* Save error questions for library */
  const errors = questions
    .filter(q => answers[q.id] !== null && answers[q.id] !== undefined && answers[q.id] !== q.correctAnswer)
    .map(q => q.id);
  if (errors.length > 0) {
    const existing = getErrorQuestions();
    const merged = [...new Set([...existing, ...errors])];
    setStore("errors", merged);
  }

  /* Save TestResult for dashboard compatibility */
  const result: TestResult = {
    id: attempt.id,
    type: attempt.type,
    title: attempt.title,
    score: completed.score,
    total: completed.total,
    correct: completed.correct,
    incorrect: completed.incorrect,
    skipped: completed.skipped,
    answers: completed.answers,
    timeTaken: completed.timeTaken,
    date: completed.submittedAt || new Date().toISOString(),
  };
  const results = getTestResults();
  results.push(result);
  setStore("results", results);

  return completed;
}

/* ── Test Results (legacy, dashboard compat) ── */
export function getTestResults(): TestResult[] { return getStore<TestResult[]>("results") || []; }

/* ── Saved Questions ── */
export function getSavedQuestions(): string[] { return getStore<string[]>("saved") || []; }
export function toggleSavedQuestion(id: string): boolean {
  const saved = getSavedQuestions();
  const idx = saved.indexOf(id);
  if (idx > -1) { saved.splice(idx, 1); setStore("saved", saved); return false; }
  saved.push(id); setStore("saved", saved); return true;
}

/* ── Error Questions ── */
export function getErrorQuestions(): string[] { return getStore<string[]>("errors") || []; }
export function addErrorQuestion(id: string): void {
  const errors = getErrorQuestions();
  if (!errors.includes(id)) { errors.push(id); setStore("errors", errors); }
}
export function removeErrorQuestion(id: string): void {
  const errors = getErrorQuestions().filter(e => e !== id);
  setStore("errors", errors);
}
export function clearErrorQuestions(): void { setStore("errors", []); }

/* ── Chapter Progress ── */
export function getChapterProgress(): Record<string, number> {
  return getStore<Record<string, number>>("progress") || {};
}
export function updateChapterProgress(chapterId: string, percent: number): void {
  const progress = getChapterProgress();
  progress[chapterId] = Math.min(100, Math.max(0, percent));
  setStore("progress", progress);
}
