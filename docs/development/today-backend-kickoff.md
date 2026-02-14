# Backend kickoff — plan for today

**Goal:** Complete Epic 2.1 (Database & Prisma setup) so the backend has a working database, schema, migration, and seed.

**Reference:** [Phase 2: Backend](phase-2-backend.md) · [Database schema](../database/schema.md) · [Environment variables](../configuration/environment-variables.md)

---

## Prerequisites

- Nx monorepo and `apps/backend` (NestJS) already exist.
- You need a PostgreSQL instance (choose one):
  - **Neon.tech** (cloud): sign up → create project → copy connection string.
  - **Local:** Docker or local Postgres; connection string like  
    `postgresql://postgres:postgres@localhost:5432/marketplace`.

---

## Today’s checklist

### 1. DB-1 — PostgreSQL and env

- [ ] Create a PostgreSQL database (Neon or local).
- [ ] In `apps/backend/`, create `.env` (and add to `.gitignore` if not already).
- [ ] Set `DATABASE_URL` in `.env` (see [Environment variables](../configuration/environment-variables.md)).

### 2. DB-2 — Prisma in the backend

**Nx vs pnpm:** In an Nx monorepo you use **both**, for different things:
- **pnpm** = add/remove npm packages (dependencies). There is no `nx add prisma`; you use the package manager with a filter so the dependency goes to the right project.
- **Nx** = run tasks (`pnpm nx run backend:serve`), generate code (`pnpm nx g @nx/nest:library ...`), add Nx plugins (`pnpm nx add @nx/nest`). Nx does not install arbitrary npm packages.

**Where to install:** In the **backend app** (`apps/backend/`). Only the backend uses Prisma; keeping the dependency there keeps `npx prisma` and `prisma/schema.prisma` in the same place.

- [ ] From **workspace root** (`marketplace/`), add Prisma to the backend project (pnpm, with filter):  
  `pnpm add -D prisma --filter @org/backend`  
  `pnpm add @prisma/client --filter @org/backend`
- [ ] From **backend app** so the schema lives there:  
  `cd apps/backend && npx prisma init`
- [ ] Confirm `apps/backend/prisma/schema.prisma` exists and `datasource db` uses `env("DATABASE_URL")`.

### 3. DB-3 — Define schema

- [ ] Replace the contents of `apps/backend/prisma/schema.prisma` with the full schema from [Database schema](../database/schema.md) (User, Profile, VendorProfile, Product, Category, Order, OrderItem, CartItem, Address, Review; all enums and relations).
- [ ] Fix generator if needed: `generator client { provider = "prisma-client-js" }`.

### 4. DB-4 — Migrate and seed

- [ ] Run: `npx prisma migrate dev --name init` (from `apps/backend/`).
- [ ] Add a `prisma/seed.ts` (or `seed.js`) that creates at least:
  - 1 admin user, 1 customer, 1 vendor (with VendorProfile), 1–2 categories, a few products.
- [ ] In `apps/backend/package.json` add:  
  `"prisma": { "seed": "ts-node prisma/seed.ts" }`  
  (or use `tsx prisma/seed.ts` if you prefer; ensure the path is relative to `apps/backend`.)
- [ ] Run: `npx prisma db seed`.
- [ ] Run: `npx prisma studio` and confirm all tables and seed data.

### 5. Wire Prisma into NestJS (today or next session)

- [x] Create a `PrismaService` that extends `PrismaClient` and is provided in a global or core module.
- [x] Inject `PrismaService` in `AppService` and add a simple health/DB check (e.g. `prisma.$queryRaw\`SELECT 1\``) so you know the app talks to the DB.

---

## Done for today when

- `prisma migrate dev` runs without errors.
- `prisma db seed` runs and Prisma Studio shows data.
- Backend starts and (if you added the health check) can hit the database.

**Next session:** Epic 2.2 — Authentication (Passport JWT, register/login, guards).
