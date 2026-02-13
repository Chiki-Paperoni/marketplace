# Phase 1: Learning & Foundation

**Sprint Goal:** Set up development environment, learn React/Next.js basics, initialize monorepo

---

## Epic 1.1: Learning React & Next.js

**Story Points:** 13

**Tasks:**

- [ ] **LEARN-1:** Complete React official tutorial (3 points)
  - Read "Learn React" docs
  - Build tic-tac-toe example
  - Understand JSX, components, props, state
  - Practice hooks: useState, useEffect

- [ ] **LEARN-2:** Learn React ecosystem basics (3 points)
  - Understand React vs Angular differences
  - Learn about virtual DOM
  - Study component lifecycle
  - Practice with 2-3 small components

- [ ] **LEARN-3:** Complete Next.js tutorial (4 points)
  - Read Next.js App Router docs
  - Understand Server vs Client Components
  - Learn about routing and navigation
  - Study data fetching patterns
  - Build sample blog app from tutorial

- [ ] **LEARN-4:** Study NestJS basics (3 points)
  - Review NestJS documentation
  - Understand modules, controllers, services
  - Learn dependency injection
  - Compare with Angular architecture

**Acceptance Criteria:**

- Can explain React hooks to someone
- Can create Server and Client Components
- Can build basic CRUD API in NestJS
- Understand monorepo concepts

---

## Epic 1.2: Project Setup

**Story Points:** 8

**Tasks:**

- [ ] **SETUP-1:** Initialize Nx workspace (2 points)
  ```bash
  npx create-nx-workspace@latest marketplace --preset=empty --packageManager=pnpm
  ```
  - Install Nx plugins
  - Configure pnpm workspace

- [ ] **SETUP-2:** Create NestJS backend app (2 points)
  ```bash
  pnpm nx g @nx/nest:app api
  ```
  - Set up basic structure
  - Configure environment variables
  - Set up ESLint and Prettier

- [ ] **SETUP-3:** Create Angular frontend app (2 points)
  ```bash
  pnpm nx g @nx/angular:app frontend-angular --style=css --routing --standalone
  ```
  - Configure Tailwind CSS
  - Set up basic routing
  - Configure environment files

- [ ] **SETUP-4:** Create Next.js frontend app (2 points)
  ```bash
  pnpm nx g @nx/next:app frontend-nextjs --style=css --appDir
  ```
  - Configure Tailwind CSS
  - Set up basic routing
  - Configure environment files

**Acceptance Criteria:**

- All three apps can run simultaneously
- Monorepo structure is clean and organized
- ESLint and Prettier work across all apps
- Can run `pnpm dev` to start all apps

---

## Epic 1.3: Shared Libraries Setup

**Story Points:** 5

**Tasks:**

- [ ] **LIB-1:** Create shared types library (2 points)
  ```bash
  pnpm nx g @nx/js:lib shared/types --buildable
  ```
  - Create base interfaces (User, Product, Order)
  - Export from index
  - Set up TypeScript paths

- [ ] **LIB-2:** Create shared utils library (2 points)
  ```bash
  pnpm nx g @nx/js:lib shared/utils --buildable
  ```
  - Add date formatters
  - Add price formatters
  - Add validation utilities

- [ ] **LIB-3:** Create API client library structure (1 point)
  ```bash
  pnpm nx g @nx/js:lib api-client --buildable
  ```
  - Set up folder structure
  - Create mutator.ts for custom fetch
  - Add README

**Acceptance Criteria:**

- Types can be imported in all three apps
- Utils functions work in both frontends
- TypeScript autocomplete works

---

## Phase 1 Deliverables

- Nx monorepo with 3 apps running
- Shared libraries set up
- Basic understanding of React/Next.js
- Development environment ready

**Definition of Done:**

- All apps start without errors
- Can import shared types in all apps
- Git repo initialized with proper .gitignore
- README.md created
