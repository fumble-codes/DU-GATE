# Dugate — Auth System Status

## What's Not Working

### 1. Login button 500s — `MIDDLEWARE_INVOCATION_FAILED` (CRITICAL)

| Symptom | Root Cause | File:Line |
|---------|-----------|-----------|
| Clicking "Log in" or "Sign in" → 500 | `createServerClient()` constructor not in try/catch — if it throws (bad env var format, cookie API incompatibility with Next.js 16 Edge Runtime), exception is unhandled | `src/middleware.ts:22-33` |
| Build warns middleware deprecated | Next.js 16 requires `proxy.ts` instead of `middleware.ts` | build log |
| `@supabase/ssr` v0.12.0 `getAll/setAll` cookie API | May have edge cases with Next.js 16 Edge Runtime (request.cookies.getAll() format) | `src/middleware.ts:24-31` |

**Why it crashes**: The try/catch only wraps `getSession()` (line 37). If `createServerClient()` itself throws — e.g., `request.cookies.getAll()` returns unexpected format, or env var values on Vercel are present but malformed — the exception bubbles up unhandled → `MIDDLEWARE_INVOCATION_FAILED`.

### 2. "Get Started" → dashboard (public, no auth check)

| Symptom | Detail |
|---------|--------|
| "Get Started" in nav links to `/dashboard` | `src/components/landing/nav/nav.tsx:101` — plain `<Link>` |
| "Start Practicing Free" in hero links to `/dashboard` | `src/components/landing/hero/hero.tsx:227` — plain `<Link>` |
| `/dashboard` NOT in middleware matcher | Matcher only covers `/admin/:path*`, `/auth/login`, `/auth/signup` |
| Anyone can access `/dashboard` | No auth gate at all — logged out users see it |

### 3. Dashboard uses localStorage, not Supabase

| Symptom | Detail |
|---------|--------|
| `getSession()` from `@/lib/store` (localStorage) | `src/app/dashboard/page.tsx:25,144` — not Supabase auth |
| No `useAuth()` hook used | Auth state completely ignored |
| All data is hardcoded mock | Stats, activities, subjects — none come from Supabase |
| Username defaults to "Priyansh" | Not from real user data |
| No real Supabase queries | Dashboard is fully disconnected from backend |

### 4. Landing page nav has no auth-awareness

| Symptom | Detail |
|---------|--------|
| "Log in" always visible | Even when user is logged in |
| "Get Started" always visible | Should ideally show user state |
| `useAuth()` not used in nav/hero | No conditional rendering based on auth |

### 5. Email signup → login fails

| Symptom | Detail |
|---------|--------|
| "Invalid login credentials" | Email confirmation required but flow drops session |

### 6. Google OAuth

Not tested end-to-end yet.

### 7. Env vars on Vercel — WRONG NAMES (ROOT CAUSE OF MANY ISSUES)

Vercel Dashboard currently has these vars (added ~42m ago):

| Vercel Var Name | Value | Code expects | Match? |
|----------------|-------|-------------|--------|
| `PUBLISHABLE_KEY` | `sb_publishable_...` | `NEXT_PUBLIC_SUPABASE_URL` | ❌ wrong name + wrong format |
| `SECRET_KEY` | `sb_secret_...` | `SUPABASE_SERVICE_ROLE_KEY` | ❌ wrong name |
| `ANON_KEY` | `eyJhbGci...anon...` | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ❌ wrong name (value is correct) |
| `SERVICE_ROLE_KEY` | `eyJhbGci...anon...` (SAME as ANON_KEY!) | `SUPABASE_SERVICE_ROLE_KEY` | ❌ wrong name + wrong value (this is the anon key, not service role) |

**`NEXT_PUBLIC_SUPABASE_URL` is MISSING entirely** — the Supabase project URL `https://dfmkzlinmjbsqetzxpdt.supabase.co` is not set under any name.

**Action**: Delete the 4 wrong-named vars above. Add these correctly:

| Var Name | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (from `.env.local`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon/public key (from `.env.local`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (from `.env.local` — **rotate immediately, was leaked in git**) |

### 8. Supabase URL config

- Site URL must be `https://cuetpioneer.vercel.app` in Supabase Auth settings
- Redirect URLs must include `https://cuetpioneer.vercel.app/auth/callback`

### 9. Profile/SQL

- Auto-profile trigger only affects new signups
- Existing users need manual row: `INSERT INTO profiles (id, role) VALUES ('<auth_user_id>', 'USER');`
- Admin promotion: `UPDATE profiles SET role = 'ADMIN' WHERE id = (SELECT id FROM auth.users WHERE email = 'your@email.com');`

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

### Current session — Proxy migration + env var fix

| File | What |
|------|------|
| `src/middleware.ts` | **DELETED** — deprecated in Next.js 16 |
| `src/proxy.ts` | **CREATED** — migrated from middleware.ts, Node.js runtime default, `createServerClient()` in try/catch, cookie sync on setAll, `/dashboard` added to matcher, `/admin` vs `/dashboard` role split |
| `src/app/auth/login/page.tsx` | Changed default `redirectTo` from `/` to `/dashboard` |
| Vercel Dashboard | Must delete wrong-named env vars (`PUBLISHABLE_KEY`, `SECRET_KEY`, `ANON_KEY`, `SERVICE_ROLE_KEY`) and add correct ones (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) |

---

## File Index (auth-relevant)

| File | Purpose | Last commit |
|------|---------|-------------|
| `src/middleware.ts` | Edge gatekeeper — session + role check | `1316a6c` |
| `src/lib/auth/context.tsx` | Client-side AuthProvider (user, role, signOut) | `4e5b397` |
| `src/lib/admin/guard.ts` | Server-side `verifyAdmin()` | `b2af4e5` |
| `src/lib/db/supabase-browser.ts` | Browser Supabase client (noop fallback) | `16698a7` |
| `src/lib/db/supabase-server.ts` | Server Supabase client (env guard) | `b2af4e5` |
| `src/lib/db/store.ts` | localStorage store (legacy — NOT Supabase) | `afd6393` |
| `src/app/auth/login/page.tsx` | Login form + Google button | `4e5b397` |
| `src/app/auth/signup/page.tsx` | Signup form + Google + check-email UI | `4e5b397` |
| `src/app/auth/callback/route.ts` | Code exchange (email confirm + OAuth) | `b2af4e5` |
| `src/components/providers.tsx` | Wraps AuthProvider (checks env) | `16698a7` |
| `src/app/layout.tsx` | Root layout | `b2af4e5` |
| `src/app/page.tsx` | Landing page | `4b762ac` |
| `src/components/landing/nav/nav.tsx` | Nav bar (Log in + Get Started links) | `4b762ac` |
| `src/components/landing/hero/hero.tsx` | Hero section (Start Practicing Free link) | `4b762ac` |
| `src/app/dashboard/page.tsx` | Dashboard (uses localStorage, not Supabase) | `afd6393` |
| `src/app/(admin)/layout.tsx` | Admin layout | `4b762ac` |
| `src/components/admin/admin-sidebar.tsx` | Admin sidebar with signOut | `4b762ac` |
| `src/lib/store.ts` | Re-export for localStorage store | `afd6393` |
| `database/migrations/001_profiles.sql` | Profiles table + trigger | `4e5b397` |
| `database/migrations/002_user_ecosystem.sql` | Plans, subscriptions, analytics | `16698a7` |
| `vercel.json` | Tells Vercel frontend is in `frontend/` | `6493d53` |
| `frontend/.env.local` | Local env vars (gitignored) | `16698a7` |
| `frontend/src/proxy.ts` | Proxy (Next.js 16) — session + role check, migrated from middleware.ts | this session |
| `frontend/next.config.ts` | Next.js config (empty — no env validation) | — |

---

## Remaining Blockers

### P0 — Must fix to unblock login

1. **✅ FIXED: Migrated middleware.ts → proxy.ts** — `src/proxy.ts` created with `createServerClient()` in try/catch, supabaseResponse cookie refresh on setAll, `/dashboard` added to matcher, `/admin` vs `/dashboard` role check split. TypeScript compiles clean.
2. **Fix Vercel env vars** — Delete `PUBLISHABLE_KEY`, `SECRET_KEY`, `ANON_KEY`, `SERVICE_ROLE_KEY`. Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` with correct values (see section 7 above). Values are in `.env.local`.

### P1 — Auth flow

3. **Supabase URL config** — Site URL must be `https://cuetpioneer.vercel.app`, Redirect URLs must include it
4. **Manual admin SQL** — `UPDATE profiles SET role = 'ADMIN' WHERE id = (SELECT id FROM auth.users WHERE email = 'your@email.com');`
5. **Existing users need profile rows** — `INSERT INTO profiles (id, role) VALUES ('<auth_user_id>', 'USER');` for users created before trigger

### P2 — Dashboard & landing

6. **✅ FIXED: `/dashboard` now protected by proxy** — Proxy matcher includes `/dashboard/:path*`. Unauthenticated users get redirected to `/auth/login?redirectTo=/dashboard`. Login page default redirect changed from `/` to `/dashboard`.
7. **Dashboard uses localStorage, not Supabase** — Needs integration with `useAuth()` and real Supabase queries
8. **Landing page nav has no auth-awareness** — Should conditionally show user state after login
