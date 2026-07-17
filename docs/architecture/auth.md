# Authentication & Authorization — Architecture Reference

> **Agent routing:** Any auth/security work MUST load [`architecture-agents.md`](./architecture-agents.md) first — it defines the IAM persona, directives, and response structure.
> **Status tracking:** see [`auth-checkpoint.md`](./auth-checkpoint.md) for phased progress and the issue log.

This document is the **permanent source of truth** for how identity works in DUGATE. It describes the intended (auth-enabled) design. The current demo state (auth disabled) is noted in §9.

---

## 1. Scope & Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router), TypeScript, React 19 |
| Identity provider | Supabase Auth (hosted GoTrue) |
| DB | Supabase Postgres 15+ |
| SSR cookie bridge | `@supabase/ssr` v0.12.0 |
| Client SDK | `@supabase/supabase-js` v2.x |
| Host | Vercel (root dir `frontend/`) |
| Request gate | `src/proxy.ts` (Next.js 16 proxy convention — replaces deprecated `middleware.ts`) |

Auth methods: **email + password**, **Google OAuth (OIDC / Authorization Code + PKCE)**. No magic link in active UI (schema agnostic).

---

## 2. `<architecture_analysis>`

**Standard:** OAuth 2.0 Authorization Code grant **with PKCE** (Supabase default for SPAs), OIDC id-token for claims. Session represented as Supabase JWT in HttpOnly cookies (NOT localStorage — see §7 threat model).

**Boundaries (Modularity directive):**
- **Token issuance / verification** — owned by Supabase Auth (GoTrue). App never issues its own JWTs.
- **Session transport** — `@supabase/ssr` cookie adapter (`getAll`/`setAll`) in `proxy.ts` (server) and `supabase-browser.ts` (client).
- **User management / profile** — `profiles` table + `handle_new_user()` trigger (DB-side).
- **Authorization (RBAC)** — `profiles.role` checked in `proxy.ts` (route gate) and `lib/admin/guard.ts` (server component).

**Security trade-offs:**
- Using Supabase-managed cookies means we inherit GoTrue's JWT signing/rotation; we do NOT implement refresh-token logic ourselves (correct — less attack surface).
- `proxy.ts` runs in **Node.js runtime** (Next.js 16 default for `proxy.ts`), so we can safely call `createServerClient` without Edge crypto constraints.
- Admin authorization is enforced **twice** (proxy + server-component guard) — defense in depth, but risks drift; keep both in sync.

**Edge cases to handle:**
- Google OAuth user with no `full_name` → trigger falls back to `name` → `''` (see §4 migration).
- Existing users created before the trigger existed → need manual `INSERT INTO profiles`.
- Session cookie absent/expired on a protected route → proxy redirects to `/auth/login?redirectTo=<path>`.
- OAuth `redirectTo` open-redirect — Supabase only allows registered Redirect URLs, so `window.location.origin` must be in Supabase Auth settings.
- Role change (USER→ADMIN) must go through DB, never client-settable (RLS + trigger enforce).

---

## 3. Data Model & Database Schema

### 3.1 `auth.users` (Supabase-managed)

Supabase Auth owns this table. Columns we depend on:
- `id uuid PK` — referenced by `profiles.id`
- `email text`
- `raw_user_meta_data jsonb` — Google sends `{ full_name | name, avatar_url, email, email_verified }`
- `role text` — Postgres role, NOT app role (leave as `authenticated`/`anon`)

We **never** write to `auth.users` directly.

### 3.2 `profiles` (app-owned)

Defined in `database/migrations/001_profiles.sql`:

```sql
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN')),
  username TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK → `auth.users(id)` | cascade delete; one profile per auth user |
| `role` | text, `NOT NULL DEFAULT 'USER'`, CHECK `IN ('USER','ADMIN')` | RBAC source of truth |
| `username` | text nullable | display name; seeded from `raw_user_meta_data` |
| `avatar_url` | text nullable | from OAuth provider |
| `created_at` | timestamptz | audit |

### 3.3 Auto-profile trigger

`database/migrations/001_profiles.sql` (hardened in `003_fix_profile_trigger.sql`):

```sql
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
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
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

- `SECURITY DEFINER` + `SET search_path = public` → runs as owner, finds `public.profiles` reliably (fixes the `Database error saving new user` failure).
- `AFTER INSERT` → fires after Supabase creates the auth user; if it throws, the whole signup rolls back (hence the robustness matters).

### 3.4 Environment variables

| Var | Scope | Purpose | Leak risk |
|-----|-------|---------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | client+server | Project URL | Low (public) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client+server | Anon JWT (RLS-scoped) | Low (public, RLS-bounded) |
| `SUPABASE_SERVICE_ROLE_KEY` | server only | Bypasses RLS | **CRITICAL — never ship to client, never commit** |

> The service role key was leaked in an earlier commit and **regenerated**. The new value lives only in `frontend/.env.local` (gitignored) and must be set in Vercel Dashboard. Anon key is safe to expose (RLS enforces access).

---

## 4. `<data_flow>`

### 4.1 Email + Password login

```
User → /auth/login → fill form
  → supabase.auth.signInWithPassword({ email, password })        [supabase-browser.ts]
  → GoTrue verifies → sets sb-access-token / sb-refresh-token cookies (HttpOnly)
  → router.push(redirectTo)  (default /dashboard)
Proxy (/dashboard): getSession() → session present → allow
```

### 4.2 Google OAuth (Authorization Code + PKCE)

```
User → click "Continue with Google"
  → supabase.auth.signInWithOAuth({ provider:"google",
      options:{ redirectTo: `${origin}/auth/callback` } })       [login/page.tsx]
  → Supabase returns Google consent URL → browser redirects
  → Google consent → Google redirects to Supabase callback (with auth code)
  → Supabase exchanges code → redirects to our redirectTo + ?code=...
  → GET /auth/callback/route.ts
       → supabase.auth.exchangeCodeForSession(code)             [callback/route.ts]
       → sets session cookies on the Response
       → redirect to next (default "/")
Proxy (/dashboard or "/"): getSession() → session → allow
```

> Error handling: `login/page.tsx` / `signup/page.tsx` now destructure `{ error }` and display it. Previously silent.

### 4.3 Session lifecycle (cookies)

- Supabase SSR stores JWT in **HttpOnly, Secure, SameSite=Lax** cookies (`sb-<ref>-auth-token`, `sb-<ref>-auth-refresh-token`).
- **Server** (`proxy.ts`, `callback/route.ts`): `createServerClient` reads cookies via `getAll`, writes via `setAll` onto the `NextResponse`.
- **Client** (`supabase-browser.ts`): `createBrowserClient` mirrors the same cookies; `onAuthStateChange` keeps `AuthProvider` in sync.
- Refresh token is rotated automatically by GoTrue; we only transport it.

### 4.4 Proxy gate (`src/proxy.ts`)

Matcher: `/admin/:path*`, `/dashboard/:path*`, `/auth/login`, `/auth/signup`.

```
request → proxy(request)
  → if env missing & protected → /auth/login?redirectTo
  → createServerClient (try/catch)
  → getSession()
  → isProtected && !session        → redirect /auth/login?redirectTo
  → isProtected && session:
        query profiles.role
        /admin && role≠ADMIN        → /403
  → isAuth && session              → redirect /dashboard
  → else NextResponse.next()
```

### 4.5 Role propagation

```
auth.users.id
  → profiles.id  (trigger on signup)
  → profiles.role  (USER | ADMIN)
       → proxy.ts:    blocks /admin if ≠ ADMIN
       → guard.ts:    server-component re-check for (admin)/* routes
       → context.tsx: role in React state (UI conditional rendering)
```

### 4.6 Admin guard (`src/lib/admin/guard.ts` → `(admin)/layout.tsx`)

```
layout renders → verifyAdmin()
  → createClient() (server) → getUser()
  → no user        → redirect /auth/login
  → profiles.role ≠ ADMIN → redirect /403
  → else { user }
```

---

## 5. Component / File Map

| File | Role |
|------|------|
| `src/proxy.ts` | Request-time authz gate (Node runtime). Currently disabled pass-through; real impl preserved in comments. |
| `src/app/auth/login/page.tsx` | Email/password + Google OAuth (error-handled). |
| `src/app/auth/signup/page.tsx` | Email signup + Google OAuth + "verify email" UI. |
| `src/app/auth/callback/route.ts` | OAuth/PKCE `exchangeCodeForSession`; sets cookies. |
| `src/lib/auth/context.tsx` | `AuthProvider`: `user`, `role`, `signOut`, `loading`. |
| `src/lib/db/supabase-browser.ts` | `createBrowserClient` (client). Noop fallback if env missing. |
| `src/lib/db/supabase-server.ts` | `createClient` (server). Throws clear error if env missing. |
| `src/lib/admin/guard.ts` | Server-side `verifyAdmin()` (user + role check). |
| `src/components/providers.tsx` | Wraps app in `AuthProvider` only if Supabase env present. |
| `src/app/(admin)/layout.tsx` | Admin shell; calls `verifyAdmin()` (currently commented out). |
| `src/app/403/page.tsx` | Forbidden screen for non-admin hitting `/admin`. |
| `database/migrations/001_profiles.sql` | `profiles` table + trigger. |
| `database/migrations/003_fix_profile_trigger.sql` | Hardened trigger (search_path + name fallback). **Must be run on DB.** |
| `vercel.json` | `{ "framework": "nextjs" }` (root dir set in Vercel Dashboard). |

---

## 6. Configuration Checklist

**Supabase Auth settings (Dashboard → Authentication → URL Configuration):**
- Site URL: `https://dugate.vercel.app`
- Redirect URLs must include: `https://dugate.vercel.app/auth/callback`
- Google provider: Client ID + Secret filled, enabled.

**Vercel project env:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (new regenerated value — server only)

**Local (`.env.local`, gitignored):** same three vars.

---

## 7. Threat Model & Security Notes

| Threat | Mitigation |
|--------|-----------|
| Session hijacking / XSS token theft | JWT in **HttpOnly** cookies (not `localStorage`); XSS cannot read them. Dashboard was migrated off localStorage (`getSession`) to `useAuth()`. |
| CSRF | `SameSite=Lax` cookies; state-changing calls go through Supabase signed requests. |
| Open redirect via `redirectTo`/`next` | Supabase only honors registered Redirect URLs; our values are origin-bound. |
| Privilege escalation (USER→ADMIN) | `role` only settable via DB/`profiles` RLS; client cannot set it. Double-checked in proxy + guard. |
| Service-role key leak | Key regenerated; never exposed to client; RLS still bounds anon access. |
| Brute force on `/auth/login` | Rely on Supabase rate-limiting; consider CAPTCHA on signup. |
| `Database error saving new user` | Fixed by `003` migration (`search_path` + metadata fallback). **Run it.** |

---

## 8. `<verification_and_tests>`

**Unit / integration:**
- Trigger: insert into `auth.users` with Google-style `raw_user_meta_data` (`name` only) → assert `profiles` row created with `username=''`, no error.
- `verifyAdmin()`: USER → redirect `/403`; no session → `/auth/login`; ADMIN → pass.
- `proxy.ts`: unauthenticated `/dashboard` → 307 to `/auth/login?redirectTo=/dashboard`; USER → `/admin` → `/403`; ADMIN → `/admin` → 200.

**Adversarial:**
- Expired / malformed / tampered JWT in `sb-*` cookie → GoTrue rejects → treated as no session.
- Forged `profiles.role='ADMIN'` via client → RLS + trigger ignore client input.
- `redirectTo=https://evil.com` → Supabase rejects (not a registered Redirect URL).
- Missing OAuth `state` / bad PKCE verifier → Supabase errors before code exchange.

---

## 9. Current State (demo) & Re-enable

**Disabled (current):** `proxy.ts` returns `NextResponse.next()` (impl in comments); `verifyAdmin()` commented out in `(admin)/layout.tsx`. All routes public.

**Re-enable (Phase 8 in checkpoint):**
1. Run `003_fix_profile_trigger.sql` in Supabase SQL Editor (unblocks Google OAuth).
2. Restore `proxy.ts` real implementation + matcher.
3. Restore `verifyAdmin()` in `(admin)/layout.tsx`.
4. Confirm Vercel env has the regenerated `SUPABASE_SERVICE_ROLE_KEY`.
5. Verify Supabase Auth Site URL + Redirect URLs.
6. Test Google OAuth + email/password end-to-end on production.

---

## 10. References

- `auth-checkpoint.md` — phased progress + issue log
- `architecture-agents.md` — IAM persona + directives
- `database/migrations/001_profiles.sql`, `003_fix_profile_trigger.sql`
- Supabase SSR: cookie `getAll`/`setAll` API (v0.12.0)
- Next.js 16 `proxy.ts` convention (replaces `middleware.ts`)
