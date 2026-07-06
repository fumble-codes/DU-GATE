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

## Auth System (Complete)

### Roles
- **USER** — default role on signup (email/password or Google)
- **ADMIN** — set manually via SQL (`UPDATE profiles SET role='ADMIN' WHERE ...`)

### Auth Flows
```
Email signup:
  /auth/signup → supabase.auth.signUp() + emailRedirectTo
               → Trigger auto-creates profile row
               → "Check your email" UI shown
               → User clicks confirmation link → /auth/callback → exchangeCodeForSession()

Google OAuth:
  /auth/signup or /auth/login → "Continue with Google" button
                              → supabase.auth.signInWithOAuth({ provider: "google" })
                              → Google sign-in → Supabase creates user (auto-confirmed)
                              → Trigger auto-creates profile with avatar_url
                              → /auth/callback → exchangeCodeForSession()

Login:
  /auth/login → supabase.auth.signInWithPassword()
              → If unconfirmed email: "Check your email for a confirmation link"
              → If confirmed: session set → redirect to ?redirectTo or /

Admin guard:
  middleware.ts → checks session + profile.role === 'ADMIN'
  verifyAdmin() → double-check in server components
```

### Files
- `src/app/auth/signup/page.tsx` — email + Google signup, check-email success UI
- `src/app/auth/login/page.tsx` — email + Google login, confirmation error message
- `src/app/auth/callback/route.ts` — handles code exchange for both flows
- `src/lib/auth/context.tsx` — client-side AuthProvider with `user`, `role`, `loading`, `signOut`
- `src/lib/admin/guard.ts` — server-side admin verification
- `src/middleware.ts` — Edge-level session + role check
- `database/migrations/001_profiles.sql` — profiles table + auto-create trigger

---

## Environment

```
frontend/.env.local:
  NEXT_PUBLIC_SUPABASE_URL = https://dfmkzlinmjbsqetzxpdt.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY = ...
  SUPABASE_SERVICE_ROLE_KEY = ...
  GROQ_API_KEY = ...
  NEXT_PUBLIC_APP_URL = https://cuetpioneer.vercel.app

Vercel (Settings → Environment Variables):
  Same vars as above
```

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

---

## Next Steps

1. Run `database/migrations/002_user_ecosystem.sql` for subscriptions + analytics (when ready)
2. Build Question Bank CRUD in `/admin/questions`
3. Build Import page in `/admin/imports` (DOCX parser)
4. Enable Google OAuth in Supabase dashboard (already done ✅)
