# Database

PostgreSQL schema for Dugate's Question Bank.

## Files

- `schema.sql` — Production schema: tables, enums, constraints, 
indexes, triggers

# Database

## schema.sql

Creates the production database.

Run once.

## seed.sql

Seeds lookup data.

Can safely be re-run.

Questions are NOT inserted here.

Questions come from the parser.

## Conventions

- UUID primary keys
- Explicit FK constraint names (`fk_*`)
- Explicit unique constraint names (`uq_*`)
- Check constraints for data integrity
- `updated_at` triggers on every table
- Soft deletes via `is_active` columns
- Slug columns validated lowercase
