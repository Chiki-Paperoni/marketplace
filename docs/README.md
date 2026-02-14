# Multi-Vendor Marketplace — Documentation

**Project codename:** Marketplace  
**Type:** Full-stack multi-vendor e-commerce platform  
**Architecture:** Monorepo with NestJS API and dual frontend (Angular + Next.js)

This folder contains the product and technical specifications, organized by area.

---

## 📂 Documentation index

| Area | Document | Description |
|------|----------|-------------|
| **Vision** | [Overview](vision/overview.md) | Goals, differentiators, learning objectives |
| **Architecture** | [High-level architecture](architecture/high-level-architecture.md) | Client, API, data layer, shared libs |
| | [Technology stack](architecture/technology-stack.md) | Monorepo, backend, frontends, tools, deployment |
| **Users** | [Roles & permissions](users-and-permissions/roles-and-permissions.md) | Customer, vendor, admin capabilities |
| **Features** | [Public pages](features/public-pages.md) | Homepage, products, search, auth pages |
| | [Customer pages](features/customer-pages.md) | Cart, checkout, dashboard |
| | [Vendor pages](features/vendor-pages.md) | Vendor dashboard, products, orders, analytics |
| | [Admin pages](features/admin-pages.md) | Admin dashboard, users, vendors, settings |
| **Data** | [Database schema](database/schema.md) | Prisma models and relationships |
| **Development** | [Phase 1: Learning & foundation](development/phase-1-learning-and-foundation.md) | Learning, project setup, shared libs |
| | [Phase 2: Backend](development/phase-2-backend.md) | Database, auth, products, orders, Swagger |
| | [Phase 3: Angular frontend](development/phase-3-angular-frontend.md) | Angular SPA implementation |
| | [Phase 4: Next.js frontend](development/phase-4-nextjs-frontend.md) | Next.js implementation |
| | [Phase 5: Polish & deployment](development/phase-5-polish-and-deployment.md) | UX, performance, testing, deploy, docs |
| | [Development scope](development/sprint-metrics.md) | Phase scope summary and review checklist |
| **Design** | [Design system](design/design-system.md) | Colors, typography, spacing |
| **Configuration** | [Environment variables](configuration/environment-variables.md) | Backend, Angular, Next.js env config |
| **Testing** | [Testing strategy](testing/testing-strategy.md) | Backend, frontend, E2E |
| **Project** | [Success metrics](project/success-metrics.md) | Technical, learning, portfolio goals |
| | [Risk management](project/risk-management.md) | Risks and mitigations |
| | [Definition of done](project/definition-of-done.md) | Project-wide DoD |
| | [Final checklist](project/final-checklist.md) | Pre-completion checklist |
| | [Resources](project/resources.md) | Docs, learning, tools |
| | [Interview talking points](project/interview-talking-points.md) | Architecture and tech Q&A |
| | [Notes & adjustments](project/notes-and-adjustments.md) | Progress and learnings |

---

## Quick links by role

- **Starting the project** → [Phase 1: Learning & foundation](development/phase-1-learning-and-foundation.md)
- **Backend work** → [Phase 2: Backend](development/phase-2-backend.md) + [Database schema](database/schema.md)
- **Angular app** → [Phase 3: Angular frontend](development/phase-3-angular-frontend.md) + [Features](features/)
- **Next.js app** → [Phase 4: Next.js frontend](development/phase-4-nextjs-frontend.md) + [Features](features/)
- **Before shipping** → [Phase 5: Polish & deployment](development/phase-5-polish-and-deployment.md) + [Final checklist](project/final-checklist.md)
