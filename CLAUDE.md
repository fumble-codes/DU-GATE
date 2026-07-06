@AGENTS.md

# Dugate — Full Architecture

## Stack

- **Frontend**: Next.js 16 App Router, TypeScript, TailwindCSS v4, shadcn/ui patterns
- **Database**: PostgreSQL (Supabase)
- **Auth**: Supabase Auth (email/password + OAuth)
- **Payments**: Razorpay (planned)
- **Deploy**: Vercel

---

## Database Architecture

### Layer 1 — Question Bank (frozen, schema.sql)

```
subjects → chapters → questions → options
                              → question_concepts → concepts
                              → question_attachments
                              → question_groups
                              → mock_questions → mock_tests
```

### Layer 2 — User Ecosystem (migrations/)

```
auth.users (Supabase managed)
    │
    └── profiles (role, username)
    │
    ├── subscriptions → plans (what user paid for)
    │
    ├── payments (Razorpay records)
    │
    ├── question_attempts (per-question right/wrong/time)
    │
    └── mock_attempts (per-mock scores)
```

---

## How All Tables Connect

```
AUTH LAYER:
  Supabase Auth ──→ auth.users (auto-created on signup)
                        │
                        ▼
                   profiles.id = auth.users.id
                   profiles.role = 'ADMIN' | 'USER'
                   profiles.is_teacher = true | false

SUBSCRIPTION LAYER:
  plans (Free / Pro Monthly / Pro Yearly)
    │
  subscriptions.user_id → auth.users.id
  subscriptions.plan_id → plans.id
  subscriptions.status = active | expired | cancelled

  payments.user_id → auth.users.id
  payments.subscription_id → subscriptions.id

ANALYTICS LAYER (what users do):
  question_attempts.user_id → auth.users.id
  question_attempts.question_id → questions.id
  question_attempts.is_correct = true | false
  → JOIN question_concepts to find weak concepts

  mock_attempts.user_id → auth.users.id
  mock_attempts.mock_test_id → mock_tests.id
```

---

## The `profiles` Table Alone Is NOT Enough

| What you need | Table | Purpose |
|--------------|-------|---------|
| Who is this user? | `profiles` | role, name |
| What did they pay? | `subscriptions` + `payments` | plan, expiry, history |
| What questions did they get wrong? | `question_attempts` | per-question analytics |
| Which concepts are they weak at? | question_attempts → question_concepts → concepts | JOIN query |
| What mocks did they take? | `mock_attempts` | mock scores + history |

All the analytics queries work because the question bank is **relational** — a single JOIN across `question_attempts` + `question_concepts` + `concepts` tells you exactly which concepts a student is weak at.

---

## Admin CMS (Phase 1 — Complete)

```
src/app/(admin)/layout.tsx ─── verifyAdmin() guard
src/app/(admin)/admin/page.tsx ─── Dashboard (live)
src/app/(admin)/admin/questions/page.tsx ─── Placeholder
src/app/(admin)/admin/imports/page.tsx ─── Placeholder
src/app/(admin)/admin/mocks/page.tsx ─── Placeholder
src/app/(admin)/admin/concepts/page.tsx ─── Placeholder
src/app/(admin)/admin/media/page.tsx ─── Placeholder
src/app/(admin)/admin/settings/page.tsx ─── Placeholder
```

Auth flow: Middleware (session + role) → Layout (verifyAdmin double-check)

---

## Environment (fixed)

```
frontend/.env.local:
  NEXT_PUBLIC_SUPABASE_URL = https://dfmkzlinmjbsqetzxpdt.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbG...
  SUPABASE_SERVICE_ROLE_KEY = eyJhbG...
```

---

## Next Steps

1. Run `database/schema.sql` in Supabase SQL Editor (if not done)
2. Run `database/migrations/001_profiles.sql`
3. Create an admin user via SQL
4. Run `database/migrations/002_user_ecosystem.sql` when ready for subscriptions + analytics
5. Enable Google OAuth in Supabase dashboard
