# Database Architecture — Issues & Fixes

> Audit of `database/` as it currently stands. This document explains what is broken in the
> database layer (structure, ordering, security) and what the concrete fix is.
>
> Scope: `database/schema.sql`, `database/seed.sql`, `database/migrations/001_profiles.sql`,
> `database/migrations/002_user_ecosystem.sql`, `database/migrations/003_fix_profile_trigger.sql`.
> See also `auth.md` and `auth-checkpoint.md` for the auth-specific pieces.

---

## TL;DR

The **schema design is good** — normalized, UUID-keyed, well-indexed, with enums and `updated_at`
triggers. The problems are in **how the schema is delivered** (two competing conventions, fragile
ordering, a stale/hotfix file) and in a **missing security layer (no Row Level Security)**.

Priority fixes, highest leverage first:

1. No RLS policies anywhere → **security gap**, not just cleanliness.
2. `003` is a hotfix that makes `001` stale and contradictory.
3. Mixed `schema.sql` + `migrations/` conventions with implicit ordering.
4. `002` couples the "user ecosystem" to the "content" schema via cross-migration FKs.
5. Inconsistent `updated_at` triggers / empty `seed.sql`.

---

## 1. No Row Level Security (CRITICAL)

**What's broken:** Not a single table has `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` or any
policy. The app's server client (`lib/db/supabase-server.ts`) and browser client
(`lib/db/supabase-browser.ts`) both use the **anon key**. With RLS off, the anon role can read and
write **every row in every table** — including other users' `profiles`, `subscriptions`,
`payments`, and `question_attempts`.

This is a real exploit surface, not a style nit:
- Anyone with the anon key (public, in the bundle) can `SELECT * FROM profiles`,
  `UPDATE subscriptions SET status='active'`, or read every `payment` row.
- Supabase's own protection here is RLS. Without it, "anon" == "full DB access".

**Why it slipped through:** `schema.sql` was written as a monolithic "run once" file with no
security layer, and `migrations/` focused on tables, not access control.

**The fix:** Enable RLS on every app-owned table and add least-privilege policies. The anon key
should only ever see:
- a user's **own** `profiles` row (and admins see all),
- a user's **own** attempts/subscriptions,
- **public** content (questions, chapters, mocks) — read-only.

Example policy pattern:

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles: self read/write"
  ON profiles FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Admin override (role lives in profiles, checked via a SECURITY DEFINER helper to avoid recursion)
CREATE POLICY "profiles: admin read all"
  ON profiles FOR SELECT
  USING (is_admin(auth.uid()));
```

`question_attempts`, `mock_attempts`, `subscriptions`, `payments` get the same
`auth.uid() = user_id` ownership policy. Content tables (`questions`, `chapters`, `subjects`,
`mocks`) get a broad `FOR SELECT` policy so the app can read them.

> Note: `auth.users` is managed by Supabase (RLS already enforced there). We only add RLS to our
> own tables.

---

## 2. `003_fix_profile_trigger.sql` makes `001` stale & contradictory

**What's broken:** `003` does `CREATE OR REPLACE FUNCTION handle_new_user()` with two corrections:
- `SET search_path = public` (root cause of the `Database error saving new user` failure),
- a `name` fallback in the `COALESCE` chain (Google sends `name`, not `full_name`).

But `001_profiles.sql` still defines the **old, broken** version of the same function (no
`search_path`, no `name` fallback). So:
- Running `001` on a fresh DB gives you the broken trigger again.
- `003` only "fixes" it if applied after `001` — but `003` is a *repair script*, not a real
  migration. If someone rebuilds from `001`, the bug returns.

**The fix:** Fold `003`'s corrections into the canonical `profiles` definition and delete `003`
(or keep it only as a clearly-labeled one-time repair, never as part of the ordered set). The
`profiles` table + `handle_new_user()` should live in exactly **one** place, and that place should
already contain the fix.

```sql
-- canonical, correct, single source of truth
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
```

---

## 3. Two competing conventions + implicit ordering

**What's broken:** The repo mixes two delivery models:
- `schema.sql` — a monolithic "run once" file (per `README.md`: "Run once").
- `migrations/001`, `002`, `003` — an incremental, ordered set.

These conflict. `README.md` tells you to "run `schema.sql` once" and "run `seed.sql`", while the
`migrations/` folder implies a sequential apply. There is **no explicit ordering** between
`schema.sql` and the migrations, yet:
- `002_user_ecosystem.sql` references `questions`, `mock_tests`, `options` — which only exist if
  `schema.sql` ran first.
- `001_profiles.sql` creates `profiles`, which `schema.sql` does **not** contain.

Result: a fresh database breaks depending on run order. There is no single, deterministic path
from empty DB → working DB.

**The fix:** Pick **one** convention. For Supabase, the standard is an ordered `migrations/`
folder where each file is independently runnable and order is explicit in the filename
(`000_`, `001_`, ...). Demote `schema.sql` to a *generated snapshot* (or split it into ordered
migrations). Then a fresh DB is rebuilt by applying files in filename order, deterministically.

Recommended layout:

```
database/migrations/
  000_extensions.sql        -- pgcrypto, pg_trgm
  001_content.sql          -- subjects, chapters, concepts, questions, options, mocks, ...
  002_profiles.sql         -- profiles + handle_new_user()  (contains the 003 fix)
  003_user_ecosystem.sql   -- plans, subscriptions, payments, attempts  (was 002)
  004_rls.sql              -- ENABLE RLS + policies for all tables
  005_seed.sql             -- default plans + seed data
```

Each file `CREATE OR REPLACE` / `CREATE TABLE IF NOT EXISTS` so re-running is safe.

---

## 4. `002` couples the user ecosystem to the content schema

**What's broken:** `002_user_ecosystem.sql` defines `question_attempts` with
`REFERENCES questions(id)` and `mock_attempts` with `REFERENCES mock_tests(id)`. Those tables are
owned by `schema.sql` (content domain). The "user ecosystem" migration therefore **cannot run
without the content schema already existing**, and you can't evolve/extract the question bank
independently.

**The fix:** Either (a) accept the coupling but make ordering explicit (content migration before
user-ecosystem migration, as in the layout above), or (b) if you ever split the question bank into
its own service, move attempts into the user-ecosystem migration and reference content by ID only
(keep the FK, but document the cross-boundary dependency). For now, (a) is sufficient — just make
the dependency explicit in filename order and a header comment.

---

## 5. Inconsistent `updated_at` + empty `seed.sql`

**What's broken:**
- `schema.sql` puts `updated_at` triggers on content tables (subjects, chapters, questions, …) but
  `profiles`, `subscriptions`, `payments` (in the migrations) have **no** `updated_at` column or
  trigger — inconsistent with the documented convention ("`updated_at` triggers on every table",
  `README.md`).
- `seed.sql` is empty (only a header comment). Plan seeds are hardcoded inside `002`, mixing
  "schema" and "data" responsibility.

**The fix:**
- Add `updated_at TIMESTAMPTZ DEFAULT now()` + the `set_*_updated_at` trigger to `profiles`,
  `subscriptions`, `payments`.
- Move the plan `INSERT`s out of `002` and into a dedicated `005_seed.sql` (or keep them in
  `002` but clearly label them as seed data). `seed.sql` at root should either be populated or
  removed to avoid confusion with the migration-based seed.

---

## Proposed end state (checklist)

| # | Issue | Fix | Severity |
|---|-------|-----|----------|
| 1 | No RLS on any table | `004_rls.sql`: `ENABLE ROW LEVEL SECURITY` + ownership policies | **Critical** |
| 2 | `003` contradicts `001` | Fold fix into canonical `profiles` def; delete/relabel `003` | High |
| 3 | Mixed `schema.sql` + `migrations/` + implicit order | Single ordered `migrations/` set; `schema.sql` → snapshot | High |
| 4 | `002` cross-migration FKs to content | Explicit ordering; document boundary | Medium |
| 5 | Missing `updated_at` on user tables; empty `seed.sql` | Add triggers; move seeds to `005_seed.sql` | Low |

---

## What NOT to change

The core `schema.sql` **design is good** — keep it:
- UUID PKs, explicit `fk_*`/`uq_*` constraint names, `CHECK` constraints, lowercase slug checks.
- Enums (`question_type`, `difficulty_level`, `question_status`, …).
- GIN trigram search index on `questions.body`, composite filter indexes.
- `ON DELETE` semantics (RESTRICT on content, CASCADE on user data) are correct.

The refactor is about **delivery + security**, not redesign.

---

## Next step

If approved, refactor `database/` into the ordered `migrations/` set above (keeping the existing
schema design intact), add `004_rls.sql`, and fold the `003` fix into `002_profiles.sql`. No table
redesign required.
