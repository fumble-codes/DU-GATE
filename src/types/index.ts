export type Subject = "accountancy" | "business-studies" | "economics" | "english";

export type Difficulty = "easy" | "medium" | "hard";

export type TestType = "mock" | "pyq" | "practice";

export type QuestionBank = "mock" | "pyq";

export type PaletteStatus = "unseen" | "unanswered" | "answered" | "review";

export interface Question {
  id: string;
  text: string;
  options: [string, string, string, string];
  correctAnswer: 0 | 1 | 2 | 3;
  explanation: string;
  subject: Subject;
  chapter: string;
  difficulty: Difficulty;
  bank: QuestionBank;
  year?: number;
  source?: string;
}

export interface TestDefinition {
  id: string;
  title: string;
  type: TestType;
  subject: Subject;
  year?: number;
  shift?: number;
  duration: number;
  questionIds: string[];
  totalMarks: number;
  marksPerQuestion: number;
  negativeMarking: number;
  isPremium: boolean;
  createdAt: string;
}

export interface TestAttempt {
  id: string;
  testId: string;
  type: TestType;
  title: string;
  status: "in-progress" | "completed" | "reviewed";
  startedAt: string;
  submittedAt?: string;
  answers: Record<string, number | null>;
  markedForReview: string[];
  score: number;
  total: number;
  correct: number;
  incorrect: number;
  skipped: number;
  timeTaken: number;
}

export interface TestResult {
  id: string;
  type: TestType;
  title: string;
  score: number;
  total: number;
  correct: number;
  incorrect: number;
  skipped: number;
  answers: Record<string, number | null>;
  timeTaken: number;
  date: string;
}

export interface Chapter {
  id: string;
  title: string;
  subject: Subject;
  questionCount: number;
  progress: number;
}

export interface FlashcardDeck {
  id: string;
  title: string;
  subject: Subject;
  cardCount: number;
}

export interface Flashcard {
  id: string;
  deckId: string;
  front: string;
  back: string;
  difficulty?: Difficulty;
}

export interface NcertNote {
  id: string;
  subject: Subject;
  chapter: string;
  title: string;
  content: string;
}

export interface CollegeCutoff {
  college: string;
  program: "B.Com (Hons)" | "B.Com (Pass)";
  category: Category;
  cutoffScore: number;
  year: number;
}

export type Category = "UR" | "OBC" | "SC" | "ST" | "EWS" | "PwBD";

export interface User {
  username: string;
  createdAt: string;
}

export interface AppState {
  user: User | null;
  results: TestResult[];
  savedQuestions: string[];
  errorQuestions: string[];
  chapterProgress: Record<string, number>;
}
