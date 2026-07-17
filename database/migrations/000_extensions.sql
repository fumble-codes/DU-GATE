-- 000_extensions.sql
-- ───────────────────────────────────────────────────────────
-- Run ORDER: 1 of 6. Safe to re-run (CREATE EXTENSION IF NOT EXISTS).
-- Enables Postgres extensions used by later migrations
-- (pgcrypto → gen_random_uuid(), pg_trgm → question search index).

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
