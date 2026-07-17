-- 003_user_ecosystem.sql
-- ───────────────────────────────────────────────────────────
-- Run ORDER: 4 of 6. Safe to re-run (IF NOT EXISTS / OR REPLACE).
--
-- Billing + analytics for the user side of the app.
-- Depends on: 001_content.sql (questions, mock_tests, options)
--            002_profiles.sql (auth.users.id already referenced by profiles)
--
-- Improvement over the old 002_user_ecosystem.sql: mutable tables
-- (plans, subscriptions, payments) now carry updated_at + triggers,
-- matching the schema convention ("updated_at on every table").
-- Plan seed data moved to 005_seed.sql.

CREATE TABLE IF NOT EXISTS plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    duration_days INTEGER NOT NULL,
    features JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES plans(id),
    razorpay_subscription_id TEXT,
    razorpay_order_id TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled', 'trialing')),
    starts_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id),
    subscription_id UUID REFERENCES subscriptions(id),
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    amount NUMERIC(10,2),
    currency TEXT DEFAULT 'INR',
    status TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS question_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    selected_option_id UUID REFERENCES options(id),
    is_correct BOOLEAN,
    time_spent_seconds INTEGER,
    attempted_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_qa_user ON question_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_qa_question ON question_attempts(question_id);
CREATE INDEX IF NOT EXISTS idx_qa_correct ON question_attempts(user_id, is_correct);

CREATE TABLE IF NOT EXISTS mock_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    mock_test_id UUID NOT NULL REFERENCES mock_tests(id) ON DELETE CASCADE,
    score NUMERIC(10,2),
    total_marks NUMERIC(10,2),
    correct INTEGER,
    incorrect INTEGER,
    skipped INTEGER,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_ma_user ON mock_attempts(user_id);

-- updated_at triggers for the mutable user tables
DROP TRIGGER IF EXISTS set_plans_updated_at ON plans;
CREATE TRIGGER set_plans_updated_at BEFORE UPDATE ON plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_subscriptions_updated_at ON subscriptions;
CREATE TRIGGER set_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_payments_updated_at ON payments;
CREATE TRIGGER set_payments_updated_at BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_question_attempts_updated_at ON question_attempts;
CREATE TRIGGER set_question_attempts_updated_at BEFORE UPDATE ON question_attempts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_mock_attempts_updated_at ON mock_attempts;
CREATE TRIGGER set_mock_attempts_updated_at BEFORE UPDATE ON mock_attempts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
