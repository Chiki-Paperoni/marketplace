# Phase 2: Backend Development

**Phase objective:** Build complete NestJS REST API with authentication, database, and Swagger documentation.

---

## Epic 2.1: Database & Prisma Setup

**Tasks:**

- [ ] **DB-1:** Set up PostgreSQL database
  - Create Neon.tech account
  - Create database instance
  - Get connection string
  - Add to .env file

- [ ] **DB-2:** Initialize Prisma
  ```bash
  cd apps/api
  npx prisma init
  ```
  - Configure Prisma schema
  - Set up database URL
  - Create initial schema

- [ ] **DB-3:** Define database schema
  - Create User model with roles
  - Create Product model
  - Create Order model
  - Create all other models (see [Database schema](../database/schema.md))
  - Add relationships
  - Add indexes

- [ ] **DB-4:** Run migrations and seed data
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

**Tasks:**

- [ ] **AUTH-1:** Set up Passport JWT
  - Install dependencies
  - Create auth module
  - Configure JWT strategy
  - Set up guards

- [ ] **AUTH-2:** Implement registration endpoint
  - POST /auth/register
  - Validate input (email, password strength)
  - Hash password with bcrypt
  - Create user in database
  - Return JWT token

- [ ] **AUTH-3:** Implement login endpoint
  - POST /auth/login
  - Validate credentials
  - Return JWT token
  - Handle errors

- [ ] **AUTH-4:** Implement password reset flow
  - POST /auth/forgot-password (send email with token)
  - POST /auth/reset-password/:token
  - Validate reset token
  - Update password

- [ ] **AUTH-5:** Add role-based guards
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

**Tasks:**

- [ ] **PROD-1:** Create products module structure
  - Generate module, controller, service
  - Create DTOs (CreateProductDto, UpdateProductDto)
  - Add Swagger decorators

- [ ] **PROD-2:** Implement CRUD endpoints
  - GET /products (list with pagination, filters)
  - GET /products/:id (single product)
  - POST /products (create — vendor only)
  - PATCH /products/:id (update — vendor only)
  - DELETE /products/:id (delete — vendor only)

- [ ] **PROD-3:** Add search and filtering
  - Search by name/description
  - Filter by category
  - Filter by price range
  - Filter by vendor
  - Sort by price, date, rating

- [ ] **PROD-4:** Add image upload
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

**Tasks:**

- [ ] **ORDER-1:** Create orders module
  - Generate module, controller, service
  - Create DTOs
  - Add Swagger decorators

- [ ] **ORDER-2:** Implement order creation
  - POST /orders
  - Validate cart items
  - Check stock availability
  - Calculate totals (subtotal, tax, shipping)
  - Create order and order items
  - Decrease product stock
  - Clear cart

- [ ] **ORDER-3:** Implement order retrieval
  - GET /orders (list user's orders)
  - GET /orders/:id (single order detail)
  - GET /vendor/orders (vendor's orders)
  - Add filters (status, date range)

- [ ] **ORDER-4:** Implement order status updates
  - PATCH /orders/:id/status
  - Validate status transitions
  - Only vendor can update their orders
  - Send email notifications (optional)

- [ ] **ORDER-5:** Add order cancellation
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

**Tasks:**

- [ ] **CART-1:** Implement cart module
  - GET /cart (get current user's cart)
  - POST /cart/items (add item)
  - PATCH /cart/items/:id (update quantity)
  - DELETE /cart/items/:id (remove item)

- [ ] **USER-1:** Implement users module
  - GET /users/profile (get current user)
  - PATCH /users/profile (update profile)
  - GET /users/:id (public profile)

- [ ] **VENDOR-2:** Implement vendor module
  - POST /vendors/apply (apply to become vendor)
  - GET /vendors/:id (public vendor profile)
  - PATCH /vendors/profile (update vendor profile)

- [ ] **ADMIN-1:** Implement admin endpoints
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

**Tasks:**

- [ ] **SWAGGER-1:** Configure Swagger
  - Set up SwaggerModule in main.ts
  - Add API metadata (title, description, version)
  - Configure bearer auth
  - Generate openapi.json on startup

- [ ] **SWAGGER-2:** Add Swagger decorators to all endpoints
  - Add @ApiTags to controllers
  - Add @ApiOperation to methods
  - Add @ApiResponse with types
  - Add @ApiBearerAuth where needed

- [ ] **GEN-1:** Set up Orval for API client generation
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
- API deployable and documented (per Phase 5)
