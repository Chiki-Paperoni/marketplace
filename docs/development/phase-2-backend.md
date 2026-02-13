# Phase 2: Backend Development

**Sprint Goal:** Build complete NestJS REST API with authentication, database, and Swagger docs

---

## Epic 2.1: Database & Prisma Setup

**Story Points:** 8

**Tasks:**

- [ ] **DB-1:** Set up PostgreSQL database (2 points)
  - Create Neon.tech account
  - Create database instance
  - Get connection string
  - Add to .env file

- [ ] **DB-2:** Initialize Prisma (2 points)
  ```bash
  cd apps/api
  npx prisma init
  ```
  - Configure Prisma schema
  - Set up database URL
  - Create initial schema

- [ ] **DB-3:** Define database schema (3 points)
  - Create User model with roles
  - Create Product model
  - Create Order model
  - Create all other models (see [Database schema](../database/schema.md))
  - Add relationships
  - Add indexes

- [ ] **DB-4:** Run migrations and seed data (1 point)
  ```bash
  npx prisma migrate dev --name init
  npx prisma db seed
  ```
  - Create seed script with sample data
  - Test data integrity

**Acceptance Criteria:**

- Database schema matches design
- Migrations run successfully
- Seed data populates database
- Prisma Studio shows all tables

---

## Epic 2.2: Authentication Module

**Story Points:** 13

**Tasks:**

- [ ] **AUTH-1:** Set up Passport JWT (3 points)
  - Install dependencies
  - Create auth module
  - Configure JWT strategy
  - Set up guards

- [ ] **AUTH-2:** Implement registration endpoint (3 points)
  - POST /auth/register
  - Validate input (email, password strength)
  - Hash password with bcrypt
  - Create user in database
  - Return JWT token

- [ ] **AUTH-3:** Implement login endpoint (2 points)
  - POST /auth/login
  - Validate credentials
  - Return JWT token
  - Handle errors

- [ ] **AUTH-4:** Implement password reset flow (3 points)
  - POST /auth/forgot-password (send email with token)
  - POST /auth/reset-password/:token
  - Validate reset token
  - Update password

- [ ] **AUTH-5:** Add role-based guards (2 points)
  - Create RolesGuard
  - Create decorators (@Roles, @Public)
  - Test with different roles

**Acceptance Criteria:**

- Users can register and login
- JWT tokens are generated and validated
- Password reset works end-to-end
- Role-based access control works

---

## Epic 2.3: Products Module

**Story Points:** 13

**Tasks:**

- [ ] **PROD-1:** Create products module structure (2 points)
  - Generate module, controller, service
  - Create DTOs (CreateProductDto, UpdateProductDto)
  - Add Swagger decorators

- [ ] **PROD-2:** Implement CRUD endpoints (5 points)
  - GET /products (list with pagination, filters)
  - GET /products/:id (single product)
  - POST /products (create — vendor only)
  - PATCH /products/:id (update — vendor only)
  - DELETE /products/:id (delete — vendor only)

- [ ] **PROD-3:** Add search and filtering (3 points)
  - Search by name/description
  - Filter by category
  - Filter by price range
  - Filter by vendor
  - Sort by price, date, rating

- [ ] **PROD-4:** Add image upload (3 points)
  - Integrate Cloudinary
  - POST /products/:id/images
  - DELETE /products/:id/images/:imageId
  - Set featured image

**Acceptance Criteria:**

- All CRUD operations work
- Vendors can only manage their own products
- Search and filters return correct results
- Images upload successfully to Cloudinary

---

## Epic 2.4: Orders Module

**Story Points:** 13

**Tasks:**

- [ ] **ORDER-1:** Create orders module (2 points)
  - Generate module, controller, service
  - Create DTOs
  - Add Swagger decorators

- [ ] **ORDER-2:** Implement order creation (4 points)
  - POST /orders
  - Validate cart items
  - Check stock availability
  - Calculate totals (subtotal, tax, shipping)
  - Create order and order items
  - Decrease product stock
  - Clear cart

- [ ] **ORDER-3:** Implement order retrieval (3 points)
  - GET /orders (list user's orders)
  - GET /orders/:id (single order detail)
  - GET /vendor/orders (vendor's orders)
  - Add filters (status, date range)

- [ ] **ORDER-4:** Implement order status updates (2 points)
  - PATCH /orders/:id/status
  - Validate status transitions
  - Only vendor can update their orders
  - Send email notifications (optional)

- [ ] **ORDER-5:** Add order cancellation (2 points)
  - POST /orders/:id/cancel
  - Restore product stock
  - Update order status

**Acceptance Criteria:**

- Customers can place orders
- Stock is properly managed
- Vendors can see and update their orders
- Order history works correctly

---

## Epic 2.5: Additional Modules

**Story Points:** 8

**Tasks:**

- [ ] **CART-1:** Implement cart module (3 points)
  - GET /cart (get current user's cart)
  - POST /cart/items (add item)
  - PATCH /cart/items/:id (update quantity)
  - DELETE /cart/items/:id (remove item)

- [ ] **USER-1:** Implement users module (2 points)
  - GET /users/profile (get current user)
  - PATCH /users/profile (update profile)
  - GET /users/:id (public profile)

- [ ] **VENDOR-2:** Implement vendor module (2 points)
  - POST /vendors/apply (apply to become vendor)
  - GET /vendors/:id (public vendor profile)
  - PATCH /vendors/profile (update vendor profile)

- [ ] **ADMIN-1:** Implement admin endpoints (1 point)
  - GET /admin/users (list all users)
  - PATCH /admin/vendors/:id/approve (approve vendor)
  - GET /admin/stats (platform statistics)

**Acceptance Criteria:**

- Cart operations work smoothly
- User profiles can be updated
- Vendor application workflow works
- Admin can manage users and vendors

---

## Epic 2.6: Swagger & API Client Generation

**Story Points:** 5

**Tasks:**

- [ ] **SWAGGER-1:** Configure Swagger (2 points)
  - Set up SwaggerModule in main.ts
  - Add API metadata (title, description, version)
  - Configure bearer auth
  - Generate openapi.json on startup

- [ ] **SWAGGER-2:** Add Swagger decorators to all endpoints (2 points)
  - Add @ApiTags to controllers
  - Add @ApiOperation to methods
  - Add @ApiResponse with types
  - Add @ApiBearerAuth where needed

- [ ] **GEN-1:** Set up Orval for API client generation (1 point)
  - Install Orval
  - Create orval.config.ts
  - Generate initial API client
  - Add npm script for generation

**Acceptance Criteria:**

- Swagger UI accessible at /api/docs
- All endpoints documented
- API client auto-generated from OpenAPI spec
- Both frontends can import API client

---

## Phase 2 Deliverables

- Complete NestJS REST API
- Authentication with JWT
- All CRUD operations
- Swagger documentation
- Auto-generated API client
- Database with seed data
- API deployable (e.g. Railway)

**Definition of Done:**

- All endpoints tested with Postman/Thunder Client
- Swagger docs are complete and accurate
- API client generates without errors
- Database migrations are clean
- API is deployed and accessible (when you choose to deploy)
