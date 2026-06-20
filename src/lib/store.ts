import type { User, TestResult } from "@/types";

const STORAGE_PREFIX = "cuetpioneer";

function getStore<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}_${key}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setStore<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`${STORAGE_PREFIX}_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error("Storage error:", e);
  }
}

export function getSession(): User | null {
  return getStore<User>("session");
}

export function setSession(user: User | null): void {
  setStore("session", user);
}

export function getUsers(): Record<string, string> {
  return getStore<Record<string, string>>("users") || {};
}

export function setUsers(users: Record<string, string>): void {
  setStore("users", users);
}

export function getTestResults(): TestResult[] {
  return getStore<TestResult[]>("results") || [];
}

export function addTestResult(result: TestResult): void {
  const results = getTestResults();
  results.push(result);
  setStore("results", results);
}

export function getSavedQuestions(): string[] {
  return getStore<string[]>("saved") || [];
}

export function toggleSavedQuestion(id: string): boolean {
  const saved = getSavedQuestions();
  const idx = saved.indexOf(id);
  if (idx > -1) {
    saved.splice(idx, 1);
    setStore("saved", saved);
    return false;
  }
  saved.push(id);
  setStore("saved", saved);
  return true;
}

export function getChapterProgress(): Record<string, number> {
  return getStore<Record<string, number>>("progress") || {};
}

export function updateChapterProgress(chapterId: string, percent: number): void {
  const progress = getChapterProgress();
  progress[chapterId] = Math.min(100, Math.max(0, percent));
  setStore("progress", progress);
}
