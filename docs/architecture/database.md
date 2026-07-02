# Database Specification

> Status: Frozen
> Version: 1.0
> Database: PostgreSQL (Supabase)
> Architecture: Relational Database
> Purpose: Defines Dugate's production database architecture and design decisions.

---

# Overview

The Dugate database is designed around a single principle:

> Every question exists exactly once.

Every feature references existing questions instead of creating copies.

This eliminates duplication while allowing the same question to appear in multiple products.

Examples

- Chapter Practice
- Mock Tests
- AI Analytics
- Weak Concept Practice
- Revision
- Adaptive Practice

---

# Core Modules

Current database consists of the following modules.

subjects

chapters

concepts

question_groups

questions

options

question_concepts

question_attachments

mock_tests

mock_questions

Future modules will remain independent.

---

# Database Relationships

subjects

↓

chapters

↓

questions

↓

options

↓

question_concepts

↓

concepts

↓

question_attachments

↓

mock_questions

↓

mock_tests

Question Groups exist independently.

Questions optionally reference a Question Group.

---

# Table Responsibilities

## subjects

Stores all supported CUET subjects.

One subject has many chapters.

Examples

Accountancy

Economics

Business Studies

English

General Test

---

## chapters

Stores chapters inside a subject.

Every chapter belongs to one subject.

A chapter contains many questions.

---

## concepts

Stores reusable learning concepts.

Concepts are independent of chapters.

One concept can belong to multiple chapters.

One question can contain multiple concepts.

Concepts exist only once.

---

## question_groups

Stores content shared across multiple questions.

Examples

Case Study Passage

Reading Comprehension

Shared Instructions

Shared Tables

Shared Images

Normal questions do not belong to a group.

Only grouped questions reference this table.

---

## questions

Main Question Bank.

Stores

Question Body

Question Type

Difficulty

Explanation

Marks

Display Order

Status

Questions never duplicate concepts.

Questions never duplicate options.

Questions never duplicate attachments.

Questions reference other tables using IDs.

---

## options

Stores answer choices.

Supports future expansion beyond four options.

Correct option determined using

is_correct = true

---

## question_concepts

Many-to-many relationship.

Question

↓

Concept

Allows

One Question

↓

Many Concepts

and

One Concept

↓

Many Questions

---

## question_attachments

Stores references to external assets.

Examples

Images

SVG

Graphs

Tables

Files are stored inside Supabase Storage.

Database stores only storage paths.

---

## mock_tests

Stores metadata for mocks.

Examples

Title

Duration

Published

Instructions

Total Marks

Mocks never contain question data.

---

## mock_questions

Many-to-many relationship.

Mock

↓

Questions

Allows

One Question

↓

Multiple Mocks

without duplication.

---

# Data Ownership

Only the parser inserts into

questions

options

question_concepts

question_attachments

Teachers never edit database tables directly.

Teachers interact only through the CMS.

---

# Parser Flow

DOCX

↓

Parser

↓

Validation

↓

Database

Steps

1. Detect Subject
2. Detect Chapter
3. Create Question
4. Insert Options
5. Link Concepts
6. Upload Attachments
7. Link Group (if any)
8. Save

Parser never creates

Mocks

Users

Attempts

Analytics

---

# Question Types

Supported rendering layouts

STANDARD

ASSERTION_REASON

STATEMENT_BASED

MATCH_THE_FOLLOWING

CASE_STUDY

CASE_STUDY_CHILD

Question types affect rendering only.

They do not change database architecture.

---

# Difficulty Levels

EASY

MEDIUM

HARD

---

# Question Status

DRAFT

PUBLISHED

ARCHIVED

Only published questions appear to students.

---

# Attachments

Attachments are optional.

Supported examples

Image

Graph

SVG

Table

Formula

Storage strategy

Supabase Storage

↓

Storage Path

↓

Question Attachment Record

---

# Mock Creation

Teacher selects

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

Questions

Selected questions become

mock_questions

Questions themselves remain unchanged.

---

# Design Decisions

Questions are immutable.

Question IDs never change.

Concepts are normalized.

Options are normalized.

Attachments are normalized.

Questions are never duplicated.

Mocks never duplicate questions.

Question Groups store shared content.

---

# Future Modules

The following are intentionally excluded.

Authentication

Users

Attempts

Bookmarks

Analytics

Weak Concepts

Payments

Subscriptions

College Predictor

PYQs

Leaderboard

These modules will reference the Question Bank.

They will never modify it.

---

# Source of Truth

Question Bank

↓

Everything Else

Every future module should consume the Question Bank instead of creating its own copy of questions.
