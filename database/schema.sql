CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TYPE question_type AS ENUM (
    'STANDARD',
    'ASSERTION_REASON',
    'STATEMENT_BASED',
    'MATCH_THE_FOLLOWING',
    'CASE_STUDY',
    'CASE_STUDY_CHILD'
);

CREATE TYPE difficulty_level AS ENUM (
    'EASY',
    'MEDIUM',
    'HARD'
);

CREATE TYPE question_status AS ENUM (
    'DRAFT',
    'PUBLISHED',
    'ARCHIVED'
);

CREATE TYPE attachment_type AS ENUM (
    'IMAGE',
    'TABLE',
    'GRAPH',
    'SVG',
    'LATEX',
    'OTHER'
);

CREATE TYPE group_type AS ENUM (
    'CASE_STUDY',
    'READING_COMPREHENSION',
    'SHARED_INSTRUCTIONS',
    'SHARED_TABLE',
    'SHARED_IMAGE',
    'SHARED_GRAPH'
);

CREATE TABLE subjects (
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
COMMENT ON TABLE subjects IS 'Stores all supported CUET subjects';
COMMENT ON COLUMN subjects.id IS 'Primary key';
COMMENT ON COLUMN subjects.name IS 'Subject name';
COMMENT ON COLUMN subjects.slug IS 'URL-friendly identifier';
COMMENT ON COLUMN subjects.display_order IS 'Sort order for listing';
COMMENT ON COLUMN subjects.is_active IS 'Whether the subject is active';
COMMENT ON COLUMN subjects.created_at IS 'Timestamp when created';
COMMENT ON COLUMN subjects.updated_at IS 'Timestamp when last updated';

CREATE TABLE chapters (
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
COMMENT ON TABLE chapters IS 'Stores chapters inside a subject';
COMMENT ON COLUMN chapters.id IS 'Primary key';
COMMENT ON COLUMN chapters.subject_id IS 'Reference to parent subject';
COMMENT ON COLUMN chapters.name IS 'Chapter name';
COMMENT ON COLUMN chapters.slug IS 'URL-friendly identifier';
COMMENT ON COLUMN chapters.display_order IS 'Sort order within subject';
COMMENT ON COLUMN chapters.is_active IS 'Whether the chapter is active';
COMMENT ON COLUMN chapters.created_at IS 'Timestamp when created';
COMMENT ON COLUMN chapters.updated_at IS 'Timestamp when last updated';
CREATE INDEX idx_chapters_subject_id ON chapters(subject_id);

CREATE TABLE concepts (
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
COMMENT ON TABLE concepts IS 'Stores reusable learning concepts independent of chapters';
COMMENT ON COLUMN concepts.id IS 'Primary key';
COMMENT ON COLUMN concepts.name IS 'Concept name';
COMMENT ON COLUMN concepts.slug IS 'URL-friendly identifier';
COMMENT ON COLUMN concepts.description IS 'Optional description of the concept';
COMMENT ON COLUMN concepts.display_order IS 'Sort order for listing';
COMMENT ON COLUMN concepts.is_active IS 'Whether the concept is active';
COMMENT ON COLUMN concepts.created_at IS 'Timestamp when created';
COMMENT ON COLUMN concepts.updated_at IS 'Timestamp when last updated';

CREATE TABLE question_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_type group_type NOT NULL,
    title TEXT,
    body TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE question_groups IS 'Stores content shared across multiple questions (case study passages, shared tables, images, graphs, etc.)';
COMMENT ON COLUMN question_groups.id IS 'Primary key';
COMMENT ON COLUMN question_groups.group_type IS 'Type of shared content group';
COMMENT ON COLUMN question_groups.title IS 'Human-readable title for shared content used in CMS';
COMMENT ON COLUMN question_groups.body IS 'Shared content used by grouped questions';
COMMENT ON COLUMN question_groups.created_at IS 'Timestamp when created';
COMMENT ON COLUMN question_groups.updated_at IS 'Timestamp when last updated';

CREATE TABLE questions (
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
COMMENT ON TABLE questions IS 'Main Question Bank — every question exists exactly once';
COMMENT ON COLUMN questions.id IS 'Primary key';
COMMENT ON COLUMN questions.chapter_id IS 'Reference to parent chapter';
COMMENT ON COLUMN questions.question_group_id IS 'Optional reference to shared content group';
COMMENT ON COLUMN questions.body IS 'Main question text';
COMMENT ON COLUMN questions.explanation IS 'Answer explanation';
COMMENT ON COLUMN questions.marks IS 'Marks awarded for correct answer';
COMMENT ON COLUMN questions.difficulty IS 'Difficulty level';
COMMENT ON COLUMN questions.status IS 'Publication status';
COMMENT ON COLUMN questions.question_type IS 'Rendering layout';
COMMENT ON COLUMN questions.display_order IS 'Presentation order within chapter';
COMMENT ON COLUMN questions.created_at IS 'Timestamp when created';
COMMENT ON COLUMN questions.updated_at IS 'Timestamp when last updated';
CREATE INDEX idx_questions_chapter_id ON questions(chapter_id);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
CREATE INDEX idx_questions_status ON questions(status);
CREATE INDEX idx_questions_question_type ON questions(question_type);
CREATE INDEX idx_questions_question_group_id ON questions(question_group_id);
CREATE INDEX idx_questions_created_at ON questions(created_at);
CREATE INDEX idx_questions_updated_at ON questions(updated_at);
CREATE INDEX idx_questions_body_search ON questions USING GIN (body gin_trgm_ops);
CREATE INDEX idx_questions_filters ON questions (chapter_id, status, difficulty);

CREATE TABLE options (
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
COMMENT ON TABLE options IS 'Stores answer choices for questions';
COMMENT ON COLUMN options.id IS 'Primary key';
COMMENT ON COLUMN options.question_id IS 'Reference to parent question';
COMMENT ON COLUMN options.body IS 'Option text';
COMMENT ON COLUMN options.is_correct IS 'Whether this option is correct';
COMMENT ON COLUMN options.display_order IS 'Display order within question';
COMMENT ON COLUMN options.created_at IS 'Timestamp when created';
COMMENT ON COLUMN options.updated_at IS 'Timestamp when last updated';
CREATE INDEX idx_options_question_id ON options(question_id);

CREATE TABLE question_concepts (
    question_id UUID NOT NULL,
    concept_id UUID NOT NULL,
    CONSTRAINT fk_question_concepts_question FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    CONSTRAINT fk_question_concepts_concept FOREIGN KEY (concept_id) REFERENCES concepts(id) ON DELETE RESTRICT,
    CONSTRAINT pk_question_concepts PRIMARY KEY (question_id, concept_id)
);
COMMENT ON TABLE question_concepts IS 'Many-to-many junction between questions and concepts';
COMMENT ON COLUMN question_concepts.question_id IS 'Reference to question';
COMMENT ON COLUMN question_concepts.concept_id IS 'Reference to concept';
CREATE INDEX idx_question_concepts_concept_id ON question_concepts(concept_id);

CREATE TABLE question_attachments (
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
COMMENT ON TABLE question_attachments IS 'Stores references to external assets in Supabase Storage';
COMMENT ON COLUMN question_attachments.id IS 'Primary key';
COMMENT ON COLUMN question_attachments.question_id IS 'Reference to parent question';
COMMENT ON COLUMN question_attachments.attachment_type IS 'Type of attachment (image, table, graph, svg, latex, other)';
COMMENT ON COLUMN question_attachments.storage_path IS 'Supabase Storage path';
COMMENT ON COLUMN question_attachments.caption IS 'Optional caption for the attachment';
COMMENT ON COLUMN question_attachments.display_order IS 'Display order within question';
COMMENT ON COLUMN question_attachments.created_at IS 'Timestamp when created';
COMMENT ON COLUMN question_attachments.updated_at IS 'Timestamp when last updated';
CREATE INDEX idx_question_attachments_question_id ON question_attachments(question_id);

CREATE TABLE mock_tests (
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
COMMENT ON TABLE mock_tests IS 'Stores metadata for mock tests';
COMMENT ON COLUMN mock_tests.id IS 'Primary key';
COMMENT ON COLUMN mock_tests.subject_id IS 'Subject filter used when building mock';
COMMENT ON COLUMN mock_tests.title IS 'Mock test title';
COMMENT ON COLUMN mock_tests.description IS 'Optional admin description of the mock';
COMMENT ON COLUMN mock_tests.instructions IS 'Instructions displayed to students';
COMMENT ON COLUMN mock_tests.duration IS 'Duration in minutes';
COMMENT ON COLUMN mock_tests.total_marks IS 'Total marks for the mock test';
COMMENT ON COLUMN mock_tests.negative_marking IS 'Negative marking deduction per wrong answer';
COMMENT ON COLUMN mock_tests.is_published IS 'Whether the mock test is published';
COMMENT ON COLUMN mock_tests.created_at IS 'Timestamp when created';
COMMENT ON COLUMN mock_tests.updated_at IS 'Timestamp when last updated';
CREATE INDEX idx_mock_tests_is_published ON mock_tests(is_published);
CREATE INDEX idx_mock_tests_subject_id ON mock_tests(subject_id);

CREATE TABLE mock_questions (
    mock_test_id UUID NOT NULL,
    question_id UUID NOT NULL,
    display_order INTEGER NOT NULL CHECK (display_order > 0),
    CONSTRAINT fk_mock_questions_test FOREIGN KEY (mock_test_id) REFERENCES mock_tests(id) ON DELETE CASCADE,
    CONSTRAINT fk_mock_questions_question FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE RESTRICT,
    CONSTRAINT pk_mock_questions PRIMARY KEY (mock_test_id, question_id),
    CONSTRAINT uq_mock_questions_test_display UNIQUE (mock_test_id, display_order)
);
COMMENT ON TABLE mock_questions IS 'Many-to-many junction between mock tests and questions';
COMMENT ON COLUMN mock_questions.mock_test_id IS 'Reference to mock test';
COMMENT ON COLUMN mock_questions.question_id IS 'Reference to question';
COMMENT ON COLUMN mock_questions.display_order IS 'Display order within mock test';
CREATE INDEX idx_mock_questions_question_id ON mock_questions(question_id);
CREATE INDEX idx_mock_questions_display_order ON mock_questions(mock_test_id, display_order);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_subjects_updated_at BEFORE UPDATE ON subjects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_chapters_updated_at BEFORE UPDATE ON chapters FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_concepts_updated_at BEFORE UPDATE ON concepts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_question_groups_updated_at BEFORE UPDATE ON question_groups FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_questions_updated_at BEFORE UPDATE ON questions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_options_updated_at BEFORE UPDATE ON options FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_question_attachments_updated_at BEFORE UPDATE ON question_attachments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_mock_tests_updated_at BEFORE UPDATE ON mock_tests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
