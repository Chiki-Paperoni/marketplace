# Phase 3: Angular Frontend

**Sprint Goal:** Build complete Angular SPA with all customer, vendor, and admin features

---

## Epic 3.1: Angular Core Setup

**Story Points:** 8

**Tasks:**

- [ ] **NG-SETUP-1:** Configure Tailwind CSS (1 point)
  - Install and configure Tailwind
  - Set up custom theme colors
  - Add global styles

- [ ] **NG-SETUP-2:** Set up routing (2 points)
  - Configure main routes
  - Add route guards (AuthGuard, RoleGuard)
  - Set up lazy loading

- [ ] **NG-SETUP-3:** Create core services (3 points)
  - AuthService (login, register, logout)
  - ApiService (HTTP client wrapper)
  - LocalStorageService
  - Create HTTP interceptor for JWT

- [ ] **NG-SETUP-4:** Create shared components (2 points)
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

**Story Points:** 8

**Tasks:**

- [ ] **NG-AUTH-1:** Build login page (2 points)
- [ ] **NG-AUTH-2:** Build registration page (3 points)
- [ ] **NG-AUTH-3:** Build forgot/reset password (2 points)
- [ ] **NG-AUTH-4:** Add auth state management (1 point)

**Acceptance Criteria:**

- Users can register and login
- JWT stored in localStorage
- Auth state persists on refresh
- Guards protect routes

---

## Epic 3.3: Public Pages (Customer)

**Story Points:** 13

**Tasks:**

- [ ] **NG-PUB-1:** Build homepage (3 points)
- [ ] **NG-PUB-2:** Build product listing page (4 points)
- [ ] **NG-PUB-3:** Build product detail page (3 points)
- [ ] **NG-PUB-4:** Build search results page (2 points)
- [ ] **NG-PUB-5:** Build vendor profile page (1 point)

**Acceptance Criteria:**

- All pages responsive
- Data fetches from API
- Navigation works smoothly
- Loading and error states shown

See [Public pages](../features/public-pages.md) for feature details.

---

## Epic 3.4: Shopping Cart & Checkout

**Story Points:** 13

**Tasks:**

- [ ] **NG-CART-1:** Build cart page (3 points)
- [ ] **NG-CART-2:** Add cart state management (2 points)
- [ ] **NG-CHECKOUT-1:** Build checkout flow (5 points)
- [ ] **NG-CHECKOUT-2:** Build order confirmation (2 points)
- [ ] **NG-CHECKOUT-3:** Add address management (1 point)

**Acceptance Criteria:**

- Cart updates optimistically
- Checkout flow is smooth
- Orders created successfully
- Confirmation page shows correct info

---

## Epic 3.5: Customer Dashboard

**Story Points:** 8

**Tasks:**

- [ ] **NG-DASH-1:** Build dashboard layout (2 points)
- [ ] **NG-DASH-2:** Build orders section (3 points)
- [ ] **NG-DASH-3:** Build profile section (2 points)
- [ ] **NG-DASH-4:** Build addresses section (1 point)

**Acceptance Criteria:**

- Dashboard navigation works
- Orders display correctly
- Profile updates save
- Addresses CRUD works

---

## Epic 3.6: Vendor Dashboard

**Story Points:** 13

**Tasks:**

- [ ] **NG-VENDOR-1:** Build vendor layout (2 points)
- [ ] **NG-VENDOR-2:** Build products management (5 points)
- [ ] **NG-VENDOR-3:** Build orders management (3 points)
- [ ] **NG-VENDOR-4:** Build analytics page (2 points)
- [ ] **NG-VENDOR-5:** Build vendor profile (1 point)

**Acceptance Criteria:**

- Vendors can CRUD products
- Product form validation works
- Images upload successfully
- Orders can be managed
- Analytics display correctly

---

## Epic 3.7: Admin Panel

**Story Points:** 8

**Tasks:**

- [ ] **NG-ADMIN-1:** Build admin layout (1 point)
- [ ] **NG-ADMIN-2:** Build users management (3 points)
- [ ] **NG-ADMIN-3:** Build vendors management (2 points)
- [ ] **NG-ADMIN-4:** Build products overview (1 point)
- [ ] **NG-ADMIN-5:** Build analytics (1 point)

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
- Deployed and accessible (when you choose to deploy)
