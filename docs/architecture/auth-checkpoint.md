# Auth Implementation Checkpoint

> Living status log for the DUGATE authentication/authorization module.
> For the IAM persona + directives that govern how we design/fix auth, see [`architecture-agents.md`](./architecture-agents.md).
> For the permanent architecture reference (routes, data flow, threat model), see [`auth.md`](./auth.md).

**Convention:** Each phase has a status — `done` / `in-progress` / `blocked` / `planned`. When a phase completes or an issue surfaces, append to the log below. Keep this file the single source of truth for "where are we on auth".

---

## Phase Summary

| # | Phase | Status | Owner commit |
|---|-------|--------|--------------|
| 1 | Migrate `middleware.ts` → `proxy.ts` (Next.js 16) | done | `1b4800d` |
| 2 | Fix 500 `MIDDLEWARE_INVOCATION_FAILED` on login | done | `1b4800d` |
| 3 | Fix Google OAuth silent failure (no error shown) | done | `7cf0167` |
| 4 | Dashboard: use Supabase session instead of localStorage | done | `7cf0167` |
| 5 | Purge leaked `SUPABASE_SERVICE_ROLE_KEY` from git history | done | `7cf0167` |
| 6 | Fix Google OAuth `Database error saving new user` (profile trigger) | blocked — SQL written, NOT run on DB | `37d5e1a` |
| 7 | Disable auth for demo (proxy pass-through + admin guard off) | done | `cb8aca3` |
| 8 | Re-enable auth (restore proxy + admin guard) | in-progress — code restored, needs deploy + SQL | — |

---

## Phase Detail

### Phase 1 — Migrate `middleware.ts` → `proxy.ts` ✅ done
- Next.js 16 deprecated `middleware.ts`; `proxy.ts` is the replacement (Node.js runtime default).
- Created `frontend/src/proxy.ts` with `createServerClient()` wrapped in try/catch, cookie sync on `setAll`, matcher covering `/admin`, `/dashboard`, `/auth/login`, `/auth/signup`.
- `/dashboard` added to matcher; `/admin` vs `/dashboard` role split (admin requires `ADMIN`, dashboard requires any auth).

### Phase 2 — Fix 500 `MIDDLEWARE_INVOCATION_FAILED` ✅ done
- Root cause: `createServerClient()` was not in try/catch; if it threw (bad env var format / cookie API incompatibility), the exception bubbled up unhandled → `MIDDLEWARE_INVOCATION_FAILED`.
- Fix: wrapped client construction in try/catch; on failure, redirect protected paths to `/auth/login`, else pass through.

### Phase 3 — Fix Google OAuth silent failure ✅ done
- Root cause: `handleGoogleSignIn` did `await supabase.auth.signInWithOAuth(...)` with no error handling — any failure was silently swallowed, button did nothing.
- Fix (`login/page.tsx`, `signup/page.tsx`): `setLoading(true)` → destructure `{ error }` → `setError(error.message)` → `setLoading(false)`. Button now disabled during redirect and shows errors.

### Phase 4 — Dashboard uses Supabase session ✅ done
- Root cause: `dashboard/page.tsx` used `getSession()` from localStorage (`@/lib/store`), not real auth.
- Fix: replaced with `useAuth()` from `@/lib/auth/context`; username derives from `user_metadata.username` → `full_name` → email prefix → `"there"`.

### Phase 5 — Purge leaked service role key ✅ done
- `SUPABASE_SERVICE_ROLE_KEY` (and anon key) were committed in `STATUS.md` in `1b4800d`.
- Key was regenerated in Supabase Dashboard (old key is dead).
- Fix: rebased `main`, removed keys from `STATUS.md`; `b912faf` became empty and was skipped. New key lives only in `.env.local` (gitignored) — must still be added to Vercel Dashboard.

### Phase 6 — Fix Google OAuth `Database error saving new user` ⛔ blocked
- **Symptom:** after Google consent, redirect returns `#error=server_error&error_code=unexpected_failure&error_description=Database+error+saving+new+user`.
- **Root cause:** `handle_new_user()` trigger on `auth.users` failed when creating the `profiles` row for a Google OAuth user. Two likely causes: (a) function search_path didn't include `public`, so `profiles` wasn't found; (b) Google metadata uses `name` not `full_name`, causing NULL/empty mismatches.
- **Fix written** (`database/migrations/003_fix_profile_trigger.sql`): `CREATE OR REPLACE FUNCTION handle_new_user()` with `SET search_path = public` and broader `COALESCE` fallbacks (`username` → `full_name` → `name` → `''`).
- **Blocker:** SQL NOT yet run in Supabase SQL Editor. Must run before OAuth works for new Google users.

### Phase 7 — Disable auth for demo ✅ done
- `proxy.ts` body replaced with `return NextResponse.next()` (full impl preserved in comments).
- `(admin)/layout.tsx`: `await verifyAdmin()` commented out.
- Result: all routes publicly accessible; dashboard renders with default/mock data.

### Phase 8 — Re-enable auth (in-progress)
- `proxy.ts` real implementation restored + matcher active (`/admin/:path*`, `/dashboard/:path*`, `/auth/login`, `/auth/signup`).
- `verifyAdmin()` restored in `(admin)/layout.tsx`.
- Build passes (`npm run build` → `ƒ Proxy (Middleware)`).
- **Still required before production works:**
  1. Run `003_fix_profile_trigger.sql` in Supabase SQL Editor (unblocks Google OAuth).
  2. Confirm `SUPABASE_SERVICE_ROLE_KEY` is set in Vercel Dashboard (regenerated key).
  3. Confirm Supabase Auth Site URL `https://cuetpioneer.vercel.app` + Redirect URL `https://cuetpioneer.vercel.app/auth/callback`.
  4. Deploy + test Google OAuth + email/password end-to-end.

---

## Issue / Resolution Log

| Date | Issue | Resolution | Phase |
|------|-------|------------|-------|
| 2026-07 | Login 500s `MIDDLEWARE_INVOCATION_FAILED` | Proxy migration + try/catch on client | 1, 2 |
| 2026-07 | Google OAuth button did nothing | Added error handling + loading state | 3 |
| 2026-07 | `SUPABASE_SERVICE_ROLE_KEY` leaked in git | Regenerated key + rebased history | 5 |
| 2026-07 | Google OAuth `Database error saving new user` | `003_fix_profile_trigger.sql` written (NOT run) | 6 |
| 2026-07 | Need to demo app without login | Disabled proxy + admin guard | 7 |

---

## Next Action

**Run `database/migrations/003_fix_profile_trigger.sql` in Supabase SQL Editor** to unblock Phase 6, then proceed to Phase 8 (re-enable auth).
