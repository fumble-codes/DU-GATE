-- 005_seed.sql
-- ───────────────────────────────────────────────────────────
-- Run ORDER: 6 of 6. Idempotent (skips rows whose plan name exists).
--
-- Default subscription plans. Moved here from the old 002_user_ecosystem.sql
-- so schema (003) and seed data (005) are separate concerns.

INSERT INTO plans (name, description, price, duration_days, features)
SELECT v.name, v.description, v.price, v.duration_days, v.features
FROM (VALUES
    ('Free', 'Basic access to practice questions', 0, 9999, '{"mock_tests": false, "analytics": false, "questions_per_day": 20}'::jsonb),
    ('Pro Monthly', 'Full access - monthly', 299, 30, '{"mock_tests": true, "analytics": true, "questions_per_day": -1}'::jsonb),
    ('Pro Yearly', 'Full access - yearly', 1999, 365, '{"mock_tests": true, "analytics": true, "questions_per_day": -1}'::jsonb)
) AS v(name, description, price, duration_days, features)
WHERE NOT EXISTS (SELECT 1 FROM plans WHERE plans.name = v.name);
