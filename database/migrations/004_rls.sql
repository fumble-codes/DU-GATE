-- 004_rls.sql
-- ───────────────────────────────────────────────────────────
-- Run ORDER: 5 of 6. Idempotent (DROP POLICY IF EXISTS + CREATE).
--
-- Row Level Security for every app-owned table.
--
-- WHY: the app's browser + server Supabase clients use the ANON key.
-- Without RLS, the public anon role has full read/write to every row.
-- RLS is the only thing between the anon key and the entire database.
--
-- MODEL:
--   • profiles / user-data tables → user sees & edits ONLY their own row;
--     ADMIN (role in profiles) sees all.
--   • content tables (questions, chapters, mocks, …) → public READ,
--     ADMIN write.
--
-- is_admin() is SECURITY DEFINER + SET search_path = public so it reads
-- profiles as the owner (bypassing RLS) — this prevents infinite
-- recursion between the profiles SELECT policy and the helper.

CREATE OR REPLACE FUNCTION is_admin(uid uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM profiles WHERE id = uid AND role = 'ADMIN'
    );
$$;

-- ── profiles ──────────────────────────────────────────────────
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS profiles_select ON profiles;
CREATE POLICY profiles_select ON profiles
    FOR SELECT USING (auth.uid() = id OR is_admin(auth.uid()));

DROP POLICY IF EXISTS profiles_insert ON profiles;
CREATE POLICY profiles_insert ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id OR is_admin(auth.uid()));

DROP POLICY IF EXISTS profiles_update ON profiles;
CREATE POLICY profiles_update ON profiles
    FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- ── user ecosystem (owner-scoped) ────────────────────────────
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS subscriptions_select ON subscriptions;
CREATE POLICY subscriptions_select ON subscriptions
    FOR SELECT USING (user_id = auth.uid() OR is_admin(auth.uid()));
DROP POLICY IF EXISTS subscriptions_write ON subscriptions;
CREATE POLICY subscriptions_write ON subscriptions
    FOR INSERT WITH CHECK (user_id = auth.uid() OR is_admin(auth.uid()));
DROP POLICY IF EXISTS subscriptions_update ON subscriptions;
CREATE POLICY subscriptions_update ON subscriptions
    FOR UPDATE USING (user_id = auth.uid() OR is_admin(auth.uid()))
    WITH CHECK (user_id = auth.uid() OR is_admin(auth.uid()));

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS payments_select ON payments;
CREATE POLICY payments_select ON payments
    FOR SELECT USING (user_id = auth.uid() OR is_admin(auth.uid()));
DROP POLICY IF EXISTS payments_insert ON payments;
CREATE POLICY payments_insert ON payments
    FOR INSERT WITH CHECK (user_id = auth.uid() OR is_admin(auth.uid()));

ALTER TABLE question_attempts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS question_attempts_select ON question_attempts;
CREATE POLICY question_attempts_select ON question_attempts
    FOR SELECT USING (user_id = auth.uid() OR is_admin(auth.uid()));
DROP POLICY IF EXISTS question_attempts_insert ON question_attempts;
CREATE POLICY question_attempts_insert ON question_attempts
    FOR INSERT WITH CHECK (user_id = auth.uid());

ALTER TABLE mock_attempts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS mock_attempts_select ON mock_attempts;
CREATE POLICY mock_attempts_select ON mock_attempts
    FOR SELECT USING (user_id = auth.uid() OR is_admin(auth.uid()));
DROP POLICY IF EXISTS mock_attempts_insert ON mock_attempts;
CREATE POLICY mock_attempts_insert ON mock_attempts
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- ── content (public read, admin write) ──────────────────────
-- Enabled on every content table; a single DO block attaches the same
-- two policies (read-for-all, write-for-admin) to each.
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE options ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE mock_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE mock_questions ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE
    t text;
BEGIN
    FOREACH t IN ARRAY ARRAY[
        'subjects','chapters','concepts','question_groups','questions','options',
        'question_concepts','question_attachments','mock_tests','mock_questions'
    ] LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I_read ON %I;', t, t);
        EXECUTE format('CREATE POLICY %I_read ON %I FOR SELECT USING (true);', t, t);

        EXECUTE format('DROP POLICY IF EXISTS %I_admin_write ON %I;', t, t);
        EXECUTE format(
            'CREATE POLICY %I_admin_write ON %I FOR ALL '
            'USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));',
            t, t
        );
    END LOOP;
END $$;
