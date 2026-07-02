export type QuestionType =
  | 'STANDARD'
  | 'ASSERTION_REASON'
  | 'STATEMENT_BASED'
  | 'MATCH_THE_FOLLOWING'
  | 'CASE_STUDY'
  | 'CASE_STUDY_CHILD';

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';

export type QuestionStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type AttachmentType = 'IMAGE' | 'TABLE' | 'GRAPH' | 'SVG' | 'LATEX' | 'OTHER';

export type GroupType =
  | 'CASE_STUDY'
  | 'READING_COMPREHENSION'
  | 'SHARED_INSTRUCTIONS'
  | 'SHARED_TABLE'
  | 'SHARED_IMAGE'
  | 'SHARED_GRAPH';

export interface Subject {
  id: string;
  name: string;
  slug: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Chapter {
  id: string;
  subject_id: string;
  name: string;
  slug: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Concept {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuestionGroup {
  id: string;
  group_type: GroupType;
  title: string | null;
  body: string;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  chapter_id: string;
  question_group_id: string | null;
  body: string;
  explanation: string | null;
  marks: number;
  difficulty: DifficultyLevel;
  status: QuestionStatus;
  question_type: QuestionType;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Option {
  id: string;
  question_id: string;
  body: string;
  is_correct: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface QuestionConcept {
  question_id: string;
  concept_id: string;
}

export interface QuestionAttachment {
  id: string;
  question_id: string;
  attachment_type: AttachmentType;
  storage_path: string;
  caption: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface MockTest {
  id: string;
  subject_id: string;
  title: string;
  description: string | null;
  instructions: string | null;
  duration: number;
  total_marks: number;
  negative_marking: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface MockQuestion {
  mock_test_id: string;
  question_id: string;
  display_order: number;
}

export interface DashboardMetrics {
  totalQuestions: number;
  totalConcepts: number;
  activeSubjects: number;
  publishedMocks: number;
}
