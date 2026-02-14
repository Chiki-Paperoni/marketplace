# Phase 3: Angular Frontend

**Phase objective:** Build complete Angular SPA with all customer, vendor, and admin features.

---

## Epic 3.1: Angular Core Setup

**Tasks:**

- [ ] **NG-SETUP-1:** Configure Tailwind CSS
  - Install and configure Tailwind
  - Set up custom theme colors
  - Add global styles

- [ ] **NG-SETUP-2:** Set up routing
  - Configure main routes
  - Add route guards (AuthGuard, RoleGuard)
  - Set up lazy loading

- [ ] **NG-SETUP-3:** Create core services
  - AuthService (login, register, logout)
  - ApiService (HTTP client wrapper)
  - LocalStorageService
  - Create HTTP interceptor for JWT

- [ ] **NG-SETUP-4:** Create shared components
  - Header component
  - Footer component
  - Loading spinner
  - Error message component
  - Button component
  - Input component

**Acceptance Criteria:**

- Tailwind works with custom theme
- Routing and guards configured
- API calls include JWT token
- Shared components reusable

---

## Epic 3.2: Authentication Features

**Tasks:**

- [ ] **NG-AUTH-1:** Build login page
- [ ] **NG-AUTH-2:** Build registration page
- [ ] **NG-AUTH-3:** Build forgot/reset password
- [ ] **NG-AUTH-4:** Add auth state management

**Acceptance Criteria:**

- Users can register and login
- JWT stored in localStorage
- Auth state persists on refresh
- Guards protect routes

---

## Epic 3.3: Public Pages (Customer)

**Tasks:**

- [ ] **NG-PUB-1:** Build homepage
- [ ] **NG-PUB-2:** Build product listing page
- [ ] **NG-PUB-3:** Build product detail page
- [ ] **NG-PUB-4:** Build search results page
- [ ] **NG-PUB-5:** Build vendor profile page

**Acceptance Criteria:**

- All pages responsive
- Data fetches from API
- Navigation works smoothly
- Loading and error states shown

See [Public pages](../features/public-pages.md) for feature details.

---

## Epic 3.4: Shopping Cart & Checkout

**Tasks:**

- [ ] **NG-CART-1:** Build cart page
- [ ] **NG-CART-2:** Add cart state management
- [ ] **NG-CHECKOUT-1:** Build checkout flow
- [ ] **NG-CHECKOUT-2:** Build order confirmation
- [ ] **NG-CHECKOUT-3:** Add address management

**Acceptance Criteria:**

- Cart updates optimistically
- Checkout flow is smooth
- Orders created successfully
- Confirmation page shows correct info

---

## Epic 3.5: Customer Dashboard

**Tasks:**

- [ ] **NG-DASH-1:** Build dashboard layout
- [ ] **NG-DASH-2:** Build orders section
- [ ] **NG-DASH-3:** Build profile section
- [ ] **NG-DASH-4:** Build addresses section

**Acceptance Criteria:**

- Dashboard navigation works
- Orders display correctly
- Profile updates save
- Addresses CRUD works

---

## Epic 3.6: Vendor Dashboard

**Tasks:**

- [ ] **NG-VENDOR-1:** Build vendor layout
- [ ] **NG-VENDOR-2:** Build products management
- [ ] **NG-VENDOR-3:** Build orders management
- [ ] **NG-VENDOR-4:** Build analytics page
- [ ] **NG-VENDOR-5:** Build vendor profile

**Acceptance Criteria:**

- Vendors can CRUD products
- Product form validation works
- Images upload successfully
- Orders can be managed
- Analytics display correctly

---

## Epic 3.7: Admin Panel

**Tasks:**

- [ ] **NG-ADMIN-1:** Build admin layout
- [ ] **NG-ADMIN-2:** Build users management
- [ ] **NG-ADMIN-3:** Build vendors management
- [ ] **NG-ADMIN-4:** Build products overview
- [ ] **NG-ADMIN-5:** Build analytics

**Acceptance Criteria:**

- Admin can view all data
- User management works
- Vendor approval flow works
- Analytics display correctly

---

## Phase 3 Deliverables

- Complete Angular SPA
- All user roles implemented
- Cart and checkout working
- Vendor and admin panels
- Responsive design
- Deployable (e.g. Vercel)

**Definition of Done:**

- All pages implemented
- API integration complete
- Forms validated
- Error handling in place
- Loading states shown
- Deployable and documented (per Phase 5)
