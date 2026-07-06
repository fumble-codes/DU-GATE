# Dugate — Auth System Status

## What's Not Working

### 1. Login / Signup flow broken

| Symptom | Details |
|---------|---------|
| Login button 500s | `MIDDLEWARE_INVOCATION_FAILED` — middleware crashes |
| Email signup → login fails | "Invalid login credentials" — email confirmation required but flow drops session |
| Google OAuth | Not tested end-to-end yet |
| "Get Started" → dashboard | Links to `/dashboard` (public, not protected by middleware) |

### 2. Env vars on Vercel (recently re-uploaded, awaiting deployment)

Previously had wrong variable names: `PUBLISHABLE_KEY`, `ANON_KEY`, `SECRET_KEY` instead of `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`. User deleted all and re-uploaded `.env.local`.

### 3. Profile/SQL

The auto-profile trigger was created in Supabase. The user who existed before the trigger was created needs a manual row inserted.

---

## What We've Done

### Commit `4b762ac` — Admin CMS Phase 1

| File | What |
|------|------|
| `src/app/(admin)/layout.tsx` | Admin layout with `verifyAdmin()` guard |
| `src/app/(admin)/admin/page.tsx` | Dashboard with live Supabase queries |
| `src/app/(admin)/admin/*/page.tsx` | 7 placeholder modules |
| `src/lib/admin/guard.ts` | Server-side admin verification |
| `src/middleware.ts` | Edge session + role check |
| `src/components/admin/admin-sidebar.tsx` | Admin navigation sidebar |

### Commit `16698a7` — Fix env vars + migrations

| File | What |
|------|------|
| `frontend/.env.local` | Correct Supabase URL + keys |
| `src/lib/auth/context.tsx` | Fix import path |
| `src/app/auth/login/page.tsx` | Fix import path, add `?redirectTo` |
| `src/app/auth/signup/page.tsx` | Fix import path |
| `src/components/providers.tsx` | Fix import path |
| `database/migrations/001_profiles.sql` | Create profiles table |
| `database/migrations/002_user_ecosystem.sql` | Plans, subscriptions, analytics tables |

### Commit `afd6393` — Build fixes

| File | What |
|------|------|
| `src/lib/store.ts` | Re-export `./db/store` (fixes broken import) |
| `src/app/auth/login/page.tsx` | Wrap `useSearchParams` in `<Suspense>` |

### Commit `4e5b397` — Full auth rewrite

| File | What |
|------|------|
| `database/migrations/001_profiles.sql` | `CREATE TABLE IF NOT EXISTS` + SECURITY DEFINER trigger (auto-creates profile on signup, bypasses RLS) |
| `src/app/auth/signup/page.tsx` | Removed client-side `profiles.insert()`, added `emailRedirectTo`, Google OAuth button, "Verify your email" success UI |
| `src/app/auth/login/page.tsx` | Added Google OAuth button, better error for unconfirmed email |
| `src/lib/auth/context.tsx` | Replaced `isTeacher` with `role` (USER/ADMIN) |

### Commit `6493d53` — Vercel monorepo config

| File | What |
|------|------|
| `vercel.json` | Added `rootDirectory: "frontend"` |

### Commits `9304bd2`, `1316a6c` — Middleware hardening

| File | What |
|------|------|
| `src/middleware.ts` | Added env var check before `createServerClient`, cookies set on response object (not request), try/catch around `getSession()` |

### Commit `b2af4e5` — Auth stability fixes

| File | What |
|------|------|
| `src/lib/db/supabase-server.ts` | Added env var guard (throws with clear message instead of `!` crash) |
| `src/app/auth/callback/route.ts` | Added env var guard, cookies set on response object (session persists after email confirm / OAuth) |
| `src/lib/admin/guard.ts` | Added try/catch around `createClient()` |
| `src/app/layout.tsx` | Removed `<SeedData />` (was seeding localStorage with mock data on every load) |

---

## File Index (auth-relevant)

| File | Purpose | Last commit |
|------|---------|-------------|
| `src/middleware.ts` | Edge gatekeeper — session + role check | `1316a6c` |
| `src/lib/auth/context.tsx` | Client-side AuthProvider (user, role, signOut) | `4e5b397` |
| `src/lib/admin/guard.ts` | Server-side `verifyAdmin()` | `b2af4e5` |
| `src/lib/db/supabase-browser.ts` | Browser Supabase client (noop fallback) | `16698a7` |
| `src/lib/db/supabase-server.ts` | Server Supabase client (env guard) | `b2af4e5` |
| `src/app/auth/login/page.tsx` | Login form + Google button | `4e5b397` |
| `src/app/auth/signup/page.tsx` | Signup form + Google + check-email UI | `4e5b397` |
| `src/app/auth/callback/route.ts` | Code exchange (email confirm + OAuth) | `b2af4e5` |
| `src/components/providers.tsx` | Wraps AuthProvider (checks env) | `16698a7` |
| `src/app/layout.tsx` | Root layout | `b2af4e5` |
| `src/app/(admin)/layout.tsx` | Admin layout | `4b762ac` |
| `src/components/admin/admin-sidebar.tsx` | Admin sidebar with signOut | `4b762ac` |
| `src/lib/store.ts` | Re-export for localStorage store | `afd6393` |
| `database/migrations/001_profiles.sql` | Profiles table + trigger | `4e5b397` |
| `database/migrations/002_user_ecosystem.sql` | Plans, subscriptions, analytics | `16698a7` |
| `vercel.json` | Tells Vercel frontend is in `frontend/` | `6493d53` |
| `frontend/.env.local` | Local env vars (gitignored) | `16698a7` |

---

## Remaining Blockers

1. **Vercel env vars** — User re-uploaded `.env.local` via dashboard, awaiting deployment to confirm correct variable names
2. **Supabase URL config** — Site URL must be `https://cuetpioneer.vercel.app`, Redirect URLs must include it
3. **Manual admin SQL** — `UPDATE profiles SET role = 'ADMIN' WHERE id = (SELECT id FROM auth.users WHERE email = 'your@email.com');`
4. **Dashboard shows nothing** — Since SeedData was removed, `/dashboard` shows empty state. Needs real Supabase data or a placeholder.
