# Database

PostgreSQL schema for DUGATE's Question Bank + auth/user ecosystem.

## How to apply (fresh project)

Run the files in `migrations/` **in filename order** in the Supabase SQL Editor
(or `supabase db push`):

```
migrations/000_extensions.sql      extensions (pgcrypto, pg_trgm)
migrations/001_content.sql         question-bank tables + updated_at triggers
migrations/002_profiles.sql        profiles + auto-create trigger
migrations/003_user_ecosystem.sql  plans, subscriptions, payments, attempts
migrations/004_rls.sql             Row Level Security + policies
migrations/005_seed.sql            default subscription plans (idempotent)
```

Every file is idempotent (`IF NOT EXISTS` / `OR REPLACE` / `DROP … IF EXISTS`),
so re-running the set is safe.

## Conventions

- UUID primary keys (`gen_random_uuid()`, from `pgcrypto`)
- Explicit FK constraint names (`fk_*`) and unique constraints (`uq_*`)
- Check constraints for data integrity (slugs lowercase, marks > 0, …)
- `updated_at` triggers on **every** table (shared `update_updated_at_column()`)
- Enums for fixed vocabularies (`question_type`, `difficulty_level`, …)
- Soft deletes via `is_active` on content tables
- **Row Level Security enabled on all app-owned tables** (see `004_rls.sql`):
  - user-data tables → owner-scoped, ADMIN sees all
  - content tables → public read, ADMIN write
  - the app uses the anon key, so RLS is the boundary

## Layout

The old `schema.sql` / `seed.sql` (monolithic, run-once) are now **pointers** to
`migrations/`. The ordered migration set is the single source of truth — do not
edit the root files.

See `docs/architecture/database-issues.md` for the audit that produced this layout.
