# Local development workflow

How to start working on the project day to day (backend + database).

---

## What persists vs what you run again

| Done once (or rarely) | Persists / when to repeat |
|-----------------------|----------------------------|
| `prisma init` | Already done. No need to run again. |
| `prisma migrate dev --name init` | **Database keeps the tables.** Only run again when you **change `schema.prisma`** and need a new migration. |
| `prisma db seed` | **Data is stored in the DB** (Docker volume). Only run again when you want to **reset or reseed** (e.g. `prisma migrate reset` or manual reseed). |
| Docker Postgres | **Data persists** in the `postgres_data` volume. When you stop Docker and come back later, the same DB and data are still there. |

So: you do **not** re-run init, migrate, or seed every time you start coding. You only need the DB running and the backend (and, if generated is gitignored, `prisma generate` after a fresh clone/pull).

---

## Starting development (e.g. “tomorrow”)

From the **workspace root** (`marketplace/`):

1. **Start the database** (if not already running):
   ```bash
   pnpm run dev:db
   ```
   Or: `docker compose up -d`

2. **Regenerate Prisma client** (only if the `prisma/generated` folder is missing, e.g. after a fresh clone or after pulling changes that don’t include generated files because they’re gitignored):
   ```bash
   pnpm run backend:generate
   ```
   Or: `cd apps/backend && npx prisma generate`

3. **Start the NestJS backend**:
   ```bash
   pnpm run dev:backend
   ```
   Or: `pnpm nx run backend:serve`

Then open: **http://localhost:3000/api** (see [Ports](#ports) below).

You do **not** need to run migrate or seed again unless you changed the schema or want to reset/reseed the DB.

---

## Ports and where they’re set

| Service        | Port | Where it’s configured |
|----------------|------|------------------------|
| **PostgreSQL** | 5432 | `docker-compose.yml` → `ports: "5432:5432"` |
| **NestJS API** | 3000 | `apps/backend/.env` → `PORT=3000` and `apps/backend/src/main.ts` → `process.env.PORT \|\| 3000` |
| **Angular**    | 4200 | Referenced in backend `.env` as `FRONTEND_URL` (Angular default is 4200) |

- API base URL: **http://localhost:3000/api** (global prefix is `api`).
- To change the backend port: set `PORT` in `apps/backend/.env`.

---

## pnpm scripts (workspace root)

From `marketplace/`:

| Script               | Command (under the hood)              | Use when |
|----------------------|----------------------------------------|----------|
| `pnpm run dev:db`   | `docker compose up -d`                 | Start Postgres for local dev. |
| `pnpm run dev:backend` | `nx run backend:serve`               | Start the NestJS backend. |
| `pnpm run backend:generate` | `pnpm --filter @org/backend exec prisma generate` | (Re)generate Prisma client (e.g. after clone or schema change). |
| `pnpm run backend:seed` | `pnpm --filter @org/backend run seed` | Run the seed script (when you want to reseed). |

Backend app also has (run from `apps/backend` or via filter):

- `pnpm run seed` → `prisma db seed`

---

## When you change the Prisma schema

1. Create and apply a migration:
   ```bash
   cd apps/backend
   npx prisma migrate dev --name your_migration_name
   ```
2. Regenerate the client (often done automatically by `migrate dev`):
   ```bash
   pnpm run backend:generate
   ```
3. Optionally reseed:
   ```bash
   pnpm run backend:seed
   ```

---

## Stopping for the day

- You can leave Docker running (Postgres keeps data), or stop it:
  ```bash
  docker compose down
  ```
- Stop the NestJS server with `Ctrl+C`.
- Commit and push as usual. No need to re-run init/migrate/seed the next time unless you changed schema or want a fresh DB.
