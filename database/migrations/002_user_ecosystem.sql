-- ===========================================
-- Migration: Complete User Ecosystem
-- Run AFTER schema.sql and 001_profiles.sql
-- ===========================================

-- 1. SUBSCRIPTION PLANS (what we sell)
CREATE TABLE plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  duration_days INTEGER NOT NULL,
  features JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. USER SUBSCRIPTIONS (who bought what)
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES plans(id),
  razorpay_subscription_id TEXT,
  razorpay_order_id TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled', 'trialing')),
  starts_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- 3. PAYMENT HISTORY (Razorpay records)
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  subscription_id UUID REFERENCES subscriptions(id),
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  amount NUMERIC(10,2),
  currency TEXT DEFAULT 'INR',
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. QUESTION ATTEMPTS (per-question analytics)
CREATE TABLE question_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  selected_option_id UUID REFERENCES options(id),
  is_correct BOOLEAN,
  time_spent_seconds INTEGER,
  attempted_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_qa_user ON question_attempts(user_id);
CREATE INDEX idx_qa_question ON question_attempts(question_id);
CREATE INDEX idx_qa_correct ON question_attempts(user_id, is_correct);

-- 5. MOCK ATTEMPTS (per-mock analytics)
CREATE TABLE mock_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mock_test_id UUID NOT NULL REFERENCES mock_tests(id) ON DELETE CASCADE,
  score NUMERIC(10,2),
  total_marks NUMERIC(10,2),
  correct INTEGER,
  incorrect INTEGER,
  skipped INTEGER,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);
CREATE INDEX idx_ma_user ON mock_attempts(user_id);

-- Seed default plans
INSERT INTO plans (name, description, price, duration_days, features) VALUES
  ('Free', 'Basic access to practice questions', 0, 9999, '{"mock_tests": false, "analytics": false, "questions_per_day": 20}'),
  ('Pro Monthly', 'Full access - monthly', 299, 30, '{"mock_tests": true, "analytics": true, "questions_per_day": -1}'),
  ('Pro Yearly', 'Full access - yearly', 1999, 365, '{"mock_tests": true, "analytics": true, "questions_per_day": -1}');
