@AGENTS.md

# Dugate Project — Session Cache

## Project Structure

Monorepo with `frontend/` (Next.js 16 App Router) and `backend/` workspaces.

## Architecture

- **Database**: PostgreSQL (Supabase). Schema frozen at `database/schema.sql`.
- **Auth**: Supabase Auth + `profiles` table (role: ADMIN/USER).
- **Question Bank**: Single source of truth. Questions exist exactly once.
- **Parser**: DOCX → Tokenizer → Normalizer → Validator → Importer → DB.

## Admin CMS (Phase 1 — Complete)

Scaffolded under `src/app/(admin)/` route group. All admin pages at `/admin/*`.

### Files Created

```
src/types/admin.ts                              ← DB-aligned TypeScript types
src/lib/admin/guard.ts                          ← verifyAdmin() server function
src/lib/admin/index.ts                          ← barrel export
src/components/admin/admin-sidebar.tsx           ← Client component, 7 nav items
src/components/admin/admin-breadcrumbs.tsx       ← Breadcrumb nav component
src/components/admin/index.ts                   ← barrel export
src/app/(admin)/layout.tsx                      ← Admin shell with guard + sidebar
src/app/(admin)/admin/page.tsx                  ← Dashboard with real Supabase queries
src/app/(admin)/admin/questions/page.tsx        ← Placeholder
src/app/(admin)/admin/imports/page.tsx          ← Placeholder
src/app/(admin)/admin/mocks/page.tsx            ← Placeholder
src/app/(admin)/admin/mocks/new/page.tsx        ← Placeholder
src/app/(admin)/admin/concepts/page.tsx         ← Placeholder
src/app/(admin)/admin/media/page.tsx            ← Placeholder
src/app/(admin)/admin/settings/page.tsx         ← Placeholder
src/app/403/page.tsx                            ← Forbidden page
```

### Files Modified

```
src/middleware.ts                               ← Added admin role=ADMIN guard
```

### Files Deleted

```
src/app/admin/                                  ← Old client-side admin (fully removed)
src/app/(admin)/.gitkeep                        ← Replaced by real files
```

## Authorization Flow

```
Request → /admin/*
  → Middleware: checks session + profiles.role === 'ADMIN'
    → No session → /auth/login
    → Role ≠ ADMIN → /403
  → (admin) Layout: verifyAdmin() double-checks
    → Renders AdminSidebar + children
```

## Admin Modules (Coming in Phases 2+)

| Route | Module | Status |
|-------|--------|--------|
| `/admin` | Dashboard | ✅ Live (real queries) |
| `/admin/questions` | Question Bank | 🔲 Placeholder |
| `/admin/imports` | Imports | 🔲 Placeholder |
| `/admin/mocks` | Mock Builder | 🔲 Placeholder |
| `/admin/concepts` | Concepts | 🔲 Placeholder |
| `/admin/media` | Media | 🔲 Placeholder |
| `/admin/settings` | Settings | 🔲 Placeholder |

## Design System

- Colors: CSS custom properties in `frontend/src/app/globals.css`
- Components: `@phosphor-icons/react`, custom UI kit in `src/components/ui/`
- Typography: `Plus Jakarta Sans`, scale 42/20/14/12px
- Layout: 240px sidebar, 32px padding, radius 24/16/12/999px

## Key Constraints

1. Never redesign the architecture.
2. Never invent new database tables.
3. Never bypass existing schema.
4. No `dangerouslySetInnerHTML`, no `eval`, no `any`.
5. All writes must happen on the server.
6. Never trust client-side validation.
7. Server components preferred over client components.

## Next.js Version Notice

This is Next.js 16 (not stable). Breaking changes may exist. Check `node_modules/next/dist/docs/` before writing code.
