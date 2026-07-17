-- 002_profiles.sql
-- ───────────────────────────────────────────────────────────
-- Run ORDER: 3 of 6. Safe to re-run (IF NOT EXISTS / OR REPLACE).
--
-- Profiles table (app-owned user record) + the auto-create trigger
-- that fires on every Supabase Auth signup.
--
-- Includes the fix formerly shipped as 003_fix_profile_trigger.sql:
--   • SET search_path = public  → trigger reliably finds public.profiles
--     (root cause of "Database error saving new user" on Google OAuth)
--   • COALESCE falls back to 'name' (Google metadata) before ''
--
-- update_updated_at_column() is defined in 001_content.sql and reused here.

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN')),
    username TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

DROP TRIGGER IF EXISTS set_profiles_updated_at ON profiles;
CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-create a profile row whenever a new auth user is created.
-- SECURITY DEFINER + SET search_path = public → runs as owner, finds
-- public.profiles reliably, and bypasses RLS (so signup cannot be blocked
-- by the INSERT policy in 004_rls.sql).
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, username, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(
            NEW.raw_user_meta_data->>'username',
            NEW.raw_user_meta_data->>'full_name',
            NEW.raw_user_meta_data->>'name',
            ''
        ),
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();
