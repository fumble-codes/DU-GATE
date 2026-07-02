# Database

PostgreSQL schema for Dugate's Question Bank.

## Files

- `schema.sql` — Production schema: tables, enums, constraints, indexes, triggers

## Conventions

- UUID primary keys
- Explicit FK constraint names (`fk_*`)
- Explicit unique constraint names (`uq_*`)
- Check constraints for data integrity
- `updated_at` triggers on every table
- Soft deletes via `is_active` columns
- Slug columns validated lowercase
