# Technology Stack

## Monorepo Management

- **Nx** — Workspace management, task orchestration, caching
- **pnpm** — Fast, disk-efficient package manager
- **TypeScript** — End-to-end type safety

## Backend Stack (NestJS API)

```json
{
  "framework": "NestJS 10+",
  "language": "TypeScript 5.4+",
  "database": "PostgreSQL 15+",
  "orm": "Prisma 5.x",
  "authentication": "Passport JWT",
  "validation": "class-validator, class-transformer",
  "documentation": "@nestjs/swagger (OpenAPI 3.0)",
  "file-storage": "Cloudinary / AWS S3",
  "email": "@nestjs-modules/mailer",
  "testing": "Jest",
  "linting": "ESLint"
}
```

**Key Dependencies:**

- `@nestjs/core`, `@nestjs/common` — Core framework
- `@nestjs/swagger` — API documentation generation
- `@nestjs/jwt`, `@nestjs/passport` — Authentication
- `@nestjs/config` — Environment configuration
- `@prisma/client`, `prisma` — Database ORM
- `class-validator` — DTO validation
- `bcrypt` — Password hashing

## Frontend Stack #1 (Angular)

```json
{
  "framework": "Angular 17+",
  "language": "TypeScript 5.4+",
  "architecture": "Standalone Components",
  "state-management": "Signals + RxJS",
  "http-client": "HttpClient with Interceptors",
  "styling": "Tailwind CSS 3.4+",
  "ui-components": "Angular Material (optional) or custom",
  "forms": "Reactive Forms",
  "routing": "Angular Router",
  "testing": "Jasmine, Karma",
  "linting": "ESLint"
}
```

**Key Dependencies:**

- `@angular/core`, `@angular/common` — Core framework
- `@angular/router` — Routing
- `@angular/forms` — Reactive forms
- `rxjs` — Reactive programming
- `tailwindcss` — Utility-first CSS
- `@angular/material` (optional) — UI components

## Frontend Stack #2 (Next.js)

```json
{
  "framework": "Next.js 14+ (App Router)",
  "language": "TypeScript 5.4+",
  "rendering": "Server Components + Client Components",
  "state-management": "Zustand",
  "data-fetching": "@tanstack/react-query (React Query)",
  "styling": "Tailwind CSS 3.4+",
  "ui-components": "shadcn/ui (optional) or custom",
  "forms": "react-hook-form + zod",
  "image-optimization": "next/image",
  "testing": "Vitest, React Testing Library",
  "linting": "ESLint"
}
```

**Key Dependencies:**

- `next`, `react`, `react-dom` — Core framework
- `@tanstack/react-query` — Server state management
- `zustand` — Client state management
- `react-hook-form` — Form handling
- `zod` — Validation schema
- `tailwindcss` — Utility-first CSS
- `axios` — HTTP client

## Shared Libraries

```json
{
  "types": "@marketplace/shared/types",
  "utils": "@marketplace/shared/utils",
  "api-client": "@marketplace/api-client (auto-generated)",
  "code-generation": "orval (OpenAPI → TypeScript)"
}
```

## Development Tools

- **Orval** — API client code generation from OpenAPI spec
- **Prettier** — Code formatting
- **ESLint** — Code linting
- **Husky** — Git hooks
- **Commitlint** — Conventional commits

## Deployment & Infrastructure

- **Backend**: Railway / Render (free tier)
- **Angular Frontend**: Vercel / Netlify
- **Next.js Frontend**: Vercel (native support)
- **Database**: Neon.tech / Supabase (PostgreSQL)
- **File Storage**: Cloudinary (free tier)
- **Domain**: Custom domain with subdomains
