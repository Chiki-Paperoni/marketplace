# High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────┐       ┌──────────────────┐      │
│  │  Angular SPA     │       │  Next.js App     │      │
│  │  (Port 4200)     │       │  (Port 4201)     │      │
│  │                  │       │                  │      │
│  │  - Standalone    │       │  - App Router    │      │
│  │  - Signals       │       │  - Server Comp.  │      │
│  │  - RxJS          │       │  - React Query   │      │
│  │  - Tailwind      │       │  - Tailwind      │      │
│  └────────┬─────────┘       └────────┬─────────┘      │
│           │                          │                │
└───────────┼──────────────────────────┼────────────────┘
            │                          │
            └──────────┬───────────────┘
                       │ HTTP/REST
                       ↓
┌─────────────────────────────────────────────────────────┐
│                     API LAYER                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │           NestJS REST API (Port 3000)            │  │
│  │                                                  │  │
│  │  Modules:                                        │  │
│  │  - Authentication (JWT)                          │  │
│  │  - Products                                      │  │
│  │  - Orders                                        │  │
│  │  - Users/Vendors                                 │  │
│  │  - Cart                                          │  │
│  │  - Admin                                         │  │
│  │                                                  │  │
│  │  Features:                                       │  │
│  │  - Swagger/OpenAPI Auto-generation              │  │
│  │  - JWT Authentication                            │  │
│  │  - Role-based Access Control                    │  │
│  │  - File Upload (Cloudinary)                     │  │
│  │  - Email Service                                 │  │
│  └──────────────────┬───────────────────────────────┘  │
│                     │                                  │
└─────────────────────┼──────────────────────────────────┘
                      │ Prisma ORM
                      ↓
┌─────────────────────────────────────────────────────────┐
│                   DATA LAYER                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │            PostgreSQL Database                   │  │
│  │                                                  │  │
│  │  Tables:                                         │  │
│  │  - Users (customers, vendors, admin)             │  │
│  │  - Products                                      │  │
│  │  - Orders                                        │  │
│  │  - Order Items                                   │  │
│  │  - Cart Items                                    │  │
│  │  - Categories                                    │  │
│  │  - Reviews                                       │  │
│  │  - Vendor Profiles                               │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  SHARED LIBRARIES                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  - @marketplace/shared/types (TypeScript interfaces)    │
│  - @marketplace/shared/utils (Shared functions)         │
│  - @marketplace/api-client (Auto-generated API client)  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```
