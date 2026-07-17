-- 001_content.sql
-- ───────────────────────────────────────────────────────────
-- Run ORDER: 2 of 6. Fully idempotent (safe to re-run).
--
-- Core Question Bank schema: subjects, chapters, concepts, questions,
-- options, mock tests, and their junctions. This is the content domain
-- (public-read, admin-write — RLS added in 004_rls.sql).
--
-- Design preserved from the original schema.sql (UUID PKs, explicit
-- fk_/uq_ constraint names, enums, GIN trigram search, updated_at
-- triggers). No structural changes — only relocated into the ordered set.

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'question_type') THEN
        CREATE TYPE question_type AS ENUM (
            'STANDARD',
            'ASSERTION_REASON',
            'STATEMENT_BASED',
            'MATCH_THE_FOLLOWING',
            'CASE_STUDY',
            'CASE_STUDY_CHILD'
        );
    END IF;
END;
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'difficulty_level') THEN
        CREATE TYPE difficulty_level AS ENUM (
            'EASY',
            'MEDIUM',
            'HARD'
        );
    END IF;
END;
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'question_status') THEN
        CREATE TYPE question_status AS ENUM (
            'DRAFT',
            'PUBLISHED',
            'ARCHIVED'
        );
    END IF;
END;
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'attachment_type') THEN
        CREATE TYPE attachment_type AS ENUM (
            'IMAGE',
            'TABLE',
            'GRAPH',
            'SVG',
            'LATEX',
            'OTHER'
        );
    END IF;
END;
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'group_type') THEN
        CREATE TYPE group_type AS ENUM (
            'CASE_STUDY',
            'READING_COMPREHENSION',
            'SHARED_INSTRUCTIONS',
            'SHARED_TABLE',
            'SHARED_IMAGE',
            'SHARED_GRAPH'
        );
    END IF;
END;
$$;

CREATE TABLE IF NOT EXISTS subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_subjects_name UNIQUE (name),
    CONSTRAINT uq_subjects_slug UNIQUE (slug),
    CONSTRAINT ck_subjects_slug_lowercase CHECK (slug = lower(slug))
);

CREATE TABLE IF NOT EXISTS chapters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT fk_chapters_subject FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE RESTRICT,
    CONSTRAINT uq_chapters_subject_name UNIQUE (subject_id, name),
    CONSTRAINT uq_chapters_subject_slug UNIQUE (subject_id, slug),
    CONSTRAINT ck_chapters_slug_lowercase CHECK (slug = lower(slug))
);
CREATE INDEX IF NOT EXISTS idx_chapters_subject_id ON chapters(subject_id);

CREATE TABLE IF NOT EXISTS concepts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_concepts_name UNIQUE (name),
    CONSTRAINT uq_concepts_slug UNIQUE (slug),
    CONSTRAINT ck_concepts_slug_lowercase CHECK (slug = lower(slug))
);

CREATE TABLE IF NOT EXISTS question_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_type group_type NOT NULL,
    title TEXT,
    body TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_id UUID NOT NULL,
    question_group_id UUID,
    body TEXT NOT NULL,
    explanation TEXT,
    marks INTEGER NOT NULL CHECK (marks > 0),
    difficulty difficulty_level NOT NULL,
    status question_status NOT NULL DEFAULT 'DRAFT',
    question_type question_type NOT NULL,
    display_order INTEGER NOT NULL CHECK (display_order > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT fk_questions_chapter FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE RESTRICT,
    CONSTRAINT fk_questions_group FOREIGN KEY (question_group_id) REFERENCES question_groups(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS idx_questions_chapter_id ON questions(chapter_id);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty);
CREATE INDEX IF NOT EXISTS idx_questions_status ON questions(status);
CREATE INDEX IF NOT EXISTS idx_questions_question_type ON questions(question_type);
CREATE INDEX IF NOT EXISTS idx_questions_question_group_id ON questions(question_group_id);
CREATE INDEX IF NOT EXISTS idx_questions_created_at ON questions(created_at);
CREATE INDEX IF NOT EXISTS idx_questions_updated_at ON questions(updated_at);
CREATE INDEX IF NOT EXISTS idx_questions_body_search ON questions USING GIN (body gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_questions_filters ON questions (chapter_id, status, difficulty);

CREATE TABLE IF NOT EXISTS options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL,
    body TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER NOT NULL CHECK (display_order > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT fk_options_question FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    CONSTRAINT uq_options_question_display UNIQUE (question_id, display_order)
);
CREATE INDEX IF NOT EXISTS idx_options_question_id ON options(question_id);

CREATE TABLE IF NOT EXISTS question_concepts (
    question_id UUID NOT NULL,
    concept_id UUID NOT NULL,
    CONSTRAINT fk_question_concepts_question FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    CONSTRAINT fk_question_concepts_concept FOREIGN KEY (concept_id) REFERENCES concepts(id) ON DELETE RESTRICT,
    CONSTRAINT pk_question_concepts PRIMARY KEY (question_id, concept_id)
);
CREATE INDEX IF NOT EXISTS idx_question_concepts_concept_id ON question_concepts(concept_id);

CREATE TABLE IF NOT EXISTS question_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL,
    attachment_type attachment_type NOT NULL,
    storage_path TEXT NOT NULL,
    caption TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT fk_question_attachments_question FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_question_attachments_question_id ON question_attachments(question_id);

CREATE TABLE IF NOT EXISTS mock_tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    instructions TEXT,
    duration INTEGER NOT NULL CHECK (duration > 0),
    total_marks INTEGER NOT NULL CHECK (total_marks > 0),
    negative_marking NUMERIC(4,2) NOT NULL DEFAULT 1.00,
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT fk_mock_tests_subject FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE RESTRICT
);
CREATE INDEX IF NOT EXISTS idx_mock_tests_is_published ON mock_tests(is_published);
CREATE INDEX IF NOT EXISTS idx_mock_tests_subject_id ON mock_tests(subject_id);

CREATE TABLE IF NOT EXISTS mock_questions (
    mock_test_id UUID NOT NULL,
    question_id UUID NOT NULL,
    display_order INTEGER NOT NULL CHECK (display_order > 0),
    CONSTRAINT fk_mock_questions_test FOREIGN KEY (mock_test_id) REFERENCES mock_tests(id) ON DELETE CASCADE,
    CONSTRAINT fk_mock_questions_question FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE RESTRICT,
    CONSTRAINT pk_mock_questions PRIMARY KEY (mock_test_id, question_id),
    CONSTRAINT uq_mock_questions_test_display UNIQUE (mock_test_id, display_order)
);
CREATE INDEX IF NOT EXISTS idx_mock_questions_question_id ON mock_questions(question_id);
CREATE INDEX IF NOT EXISTS idx_mock_questions_display_order ON mock_questions(mock_test_id, display_order);

-- Shared updated_at trigger (used by 002/003 as well)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_subjects_updated_at ON subjects;
CREATE TRIGGER set_subjects_updated_at BEFORE UPDATE ON subjects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_chapters_updated_at ON chapters;
CREATE TRIGGER set_chapters_updated_at BEFORE UPDATE ON chapters FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_concepts_updated_at ON concepts;
CREATE TRIGGER set_concepts_updated_at BEFORE UPDATE ON concepts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_question_groups_updated_at ON question_groups;
CREATE TRIGGER set_question_groups_updated_at BEFORE UPDATE ON question_groups FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_questions_updated_at ON questions;
CREATE TRIGGER set_questions_updated_at BEFORE UPDATE ON questions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_options_updated_at ON options;
CREATE TRIGGER set_options_updated_at BEFORE UPDATE ON options FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_question_attachments_updated_at ON question_attachments;
CREATE TRIGGER set_question_attachments_updated_at BEFORE UPDATE ON question_attachments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_mock_tests_updated_at ON mock_tests;
CREATE TRIGGER set_mock_tests_updated_at BEFORE UPDATE ON mock_tests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
