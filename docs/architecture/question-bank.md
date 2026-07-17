# Dugate Question Bank Database Specification v1.0

> **Agent routing:** For any auth/security-related work, load [`architecture-agents.md`](./architecture-agents.md) first.

> Status: Frozen
> Purpose: Canonical specification for Dugate's Question Bank architecture.
> Every AI agent, developer and backend service should treat this file as the source of truth.

---

# Philosophy

Dugate follows a **Single Source of Truth** architecture.

Questions exist exactly once.

Every feature references those questions instead of duplicating them.

Examples:

- Chapter Practice
- Mock Tests
- AI Analysis
- Weak Concepts
- Revision
- Bookmarks
- Adaptive Learning

All use the same Question Bank.

---

# High Level Flow

DOCX

↓

Parser

↓

Question Bank

↓

Student Features

↓

Analytics / AI

---

# Database Structure

subjects
│
└── chapters
        │
        └── questions
                ├── options
                ├── question_concepts
                │          │
                │          ▼
                │      concepts
                │
                ├── question_attachments
                │
                └── mock_questions
                          │
                          ▼
                     mock_tests

Shared content

question_groups

↓

questions

---

# Tables

## subjects

Stores CUET subjects.

Examples

- Accountancy
- Economics
- Business Studies
- English
- General Test

One subject contains many chapters.

---

## chapters

Stores chapters.

Each chapter belongs to exactly one subject.

Example

Accountancy

↓

Partnership

↓

Questions

---

## concepts

Concepts are NOT chapters.

Concepts represent learning ideas.

Examples

- Goodwill
- Journal Entry
- Ratio Analysis
- Depreciation

One question may belong to multiple concepts.

One concept may belong to thousands of questions.

---

## questions

Core table.

Every question exists exactly once.

Stores

- body
- explanation
- marks
- difficulty
- status
- question type

Questions never store options inside them.

Questions never store concept names.

Questions only reference IDs.

---

## options

Stores answer options.

Supports

- 4 options
- 5 options
- future expansion

Correct option is determined by

is_correct = true

---

## question_concepts

Junction table.

Connects questions and concepts.

Example

Question

↓

Goodwill

↓

Admission

↓

Journal Entry

---

## question_groups

Stores content shared across multiple questions.

Examples

- Case Study Passage
- Reading Comprehension
- Shared Instructions
- Shared Table
- Shared Graph

Questions reference a group when needed.

Normal MCQs have group_id = NULL.

---

## question_attachments

Stores external assets.

Examples

- Images
- Graphs
- SVG
- Tables
- Formula Images

Files live inside Supabase Storage.

Database stores only the storage path.

---

## mock_tests

Stores metadata.

Examples

- Title
- Duration
- Total Marks
- Published

Mocks never duplicate questions.

---

## mock_questions

Connects

Mock

↓

Questions

This allows one question to appear in multiple mocks.

---

# Supported Question Types

STANDARD

ASSERTION_REASON

STATEMENT_BASED

MATCH_THE_FOLLOWING

CASE_STUDY

CASE_STUDY_CHILD

These are rendering layouts.

All still behave as objective questions.

---

# Supported Difficulty Levels

EASY

MEDIUM

HARD

---

# Question Lifecycle

Teacher

↓

Writes DOCX

↓

Parser

↓

Validation

↓

Question inserted

↓

Options inserted

↓

Concept links inserted

↓

Attachments linked

↓

Published

---

# DOCX Format

The parser expects

&Subject

#Chapter

Question Number

Question Body

Options

Correct Answer

Concepts

Difficulty

Explanation

Question End

Example

&Accountancy

#Partnership

1.

What is Goodwill?

A.

...

=B

##Goodwill

##Admission

!M

::

Explanation

@@

---

# Parser Responsibilities

The parser is responsible for

- Reading DOCX
- Parsing symbols
- Validating content
- Creating missing concepts if approved
- Uploading attachments
- Linking concepts
- Inserting options

The parser NEVER creates

- Mock Tests
- PYQs
- Analytics
- User Data

It only populates the Question Bank.

---

# Mock Builder

Teachers create mocks using filters.

Example

Subject

↓

Chapter

↓

Concept

↓

Difficulty

↓

Question Type

↓

Add Questions

Questions are referenced.

Never duplicated.

---

# Student Flow

Student opens Practice.

↓

Questions fetched by chapter.

Student opens Mock.

↓

Questions fetched using mock_questions.

Student finishes mock.

↓

Attempts stored separately.

Question Bank never changes.

---

# Future Modules

The following are intentionally NOT part of the Question Bank.

- Users
- Attempts
- Analytics
- AI Insights
- Payments
- Leaderboards
- Colleges
- PYQs

Each will be implemented as independent modules.

---

# Guiding Principle

One Question.

Many Features.

Zero Duplication.
