# Phase 4: Next.js Frontend

**Phase objective:** Deliver Next.js SPA with feature parity to the Angular frontend (customer, vendor, and admin).

---

## Epic 4.1: Next.js Core Setup

**Tasks:**

- [ ] **NEXT-SETUP-1:** Configure app structure
- [ ] **NEXT-SETUP-2:** Set up React Query
- [ ] **NEXT-SETUP-3:** Set up Zustand
- [ ] **NEXT-SETUP-4:** Create shared components

**Acceptance Criteria:**

- React Query configured
- State management working
- Shared components reusable

---

## Epic 4.2: Authentication (Client Components)

**Tasks:**

- [ ] **NEXT-AUTH-1:** Build login page
- [ ] **NEXT-AUTH-2:** Build register page
- [ ] **NEXT-AUTH-3:** Build password reset
- [ ] **NEXT-AUTH-4:** Add auth middleware

**Acceptance Criteria:**

- Auth flow matches Angular version
- Token stored and persisted
- Protected routes work

---

## Epic 4.3: Public Pages (Mix of Server & Client)

**Tasks:**

- [ ] **NEXT-PUB-1:** Build homepage (Server Component)
- [ ] **NEXT-PUB-2:** Build product listing (Server Component)
- [ ] **NEXT-PUB-3:** Build product detail (Server Component)
- [ ] **NEXT-PUB-4:** Build search (Server Component)
- [ ] **NEXT-PUB-5:** Build vendor profile (Server Component)

**Acceptance Criteria:**

- Server Components fetch data
- Client Components handle interactions
- SEO-friendly (view page source shows HTML)
- Same functionality as Angular

---

## Epic 4.4: Cart & Checkout (Client Components)

**Tasks:**

- [ ] **NEXT-CART-1:** Build cart page
- [ ] **NEXT-CART-2:** Cart state with React Query
- [ ] **NEXT-CHECKOUT-1:** Build checkout flow
- [ ] **NEXT-CHECKOUT-2:** Order confirmation
- [ ] **NEXT-CHECKOUT-3:** Address management

**Acceptance Criteria:**

- Cart syncs with backend
- Checkout flow smooth
- Orders created successfully
- Matches Angular functionality

---

## Epic 4.5: Customer Dashboard (Client Components)

**Tasks:**

- [ ] **NEXT-DASH-1:** Build dashboard layout
- [ ] **NEXT-DASH-2:** Orders section
- [ ] **NEXT-DASH-3:** Profile section
- [ ] **NEXT-DASH-4:** Addresses section

**Acceptance Criteria:**

- Dashboard fully functional
- React Query handles caching
- Matches Angular version

---

## Epic 4.6: Vendor Dashboard (Client Components)

**Tasks:**

- [ ] **NEXT-VENDOR-1:** Vendor layout
- [ ] **NEXT-VENDOR-2:** Products management
- [ ] **NEXT-VENDOR-3:** Orders management
- [ ] **NEXT-VENDOR-4:** Analytics
- [ ] **NEXT-VENDOR-5:** Vendor profile

**Acceptance Criteria:**

- All vendor features work
- Image uploads functional
- Charts render correctly

---

## Epic 4.7: Admin Panel (Client Components)

**Tasks:**

- [ ] **NEXT-ADMIN-1:** Admin layout
- [ ] **NEXT-ADMIN-2:** Users management
- [ ] **NEXT-ADMIN-3:** Vendors management
- [ ] **NEXT-ADMIN-4:** Products overview
- [ ] **NEXT-ADMIN-5:** Analytics

**Acceptance Criteria:**

- Admin panel complete
- Matches Angular functionality
- All actions work

---

## Phase 4 Deliverables

- Complete Next.js app
- Same features as Angular
- Server Components for SEO
- Client Components for interactivity
- React Query for data fetching
- Deployable (e.g. Vercel)

**Definition of Done:**

- Feature parity with Angular app
- Server Components used where appropriate
- React Query caching works
- Forms validated with zod
- Deployable and documented (per Phase 5)
