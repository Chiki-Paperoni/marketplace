# Phase 4: Next.js Frontend

**Sprint Goal:** Replicate Angular functionality in Next.js, learning React patterns

---

## Epic 4.1: Next.js Core Setup

**Story Points:** 8

**Tasks:**

- [ ] **NEXT-SETUP-1:** Configure app structure (2 points)
- [ ] **NEXT-SETUP-2:** Set up React Query (2 points)
- [ ] **NEXT-SETUP-3:** Set up Zustand (2 points)
- [ ] **NEXT-SETUP-4:** Create shared components (2 points)

**Acceptance Criteria:**

- React Query configured
- State management working
- Shared components reusable

---

## Epic 4.2: Authentication (Client Components)

**Story Points:** 8

**Tasks:**

- [ ] **NEXT-AUTH-1:** Build login page (2 points)
- [ ] **NEXT-AUTH-2:** Build register page (3 points)
- [ ] **NEXT-AUTH-3:** Build password reset (2 points)
- [ ] **NEXT-AUTH-4:** Add auth middleware (1 point)

**Acceptance Criteria:**

- Auth flow matches Angular version
- Token stored and persisted
- Protected routes work

---

## Epic 4.3: Public Pages (Mix of Server & Client)

**Story Points:** 13

**Tasks:**

- [ ] **NEXT-PUB-1:** Build homepage (Server Component) (3 points)
- [ ] **NEXT-PUB-2:** Build product listing (Server Component) (4 points)
- [ ] **NEXT-PUB-3:** Build product detail (Server Component) (3 points)
- [ ] **NEXT-PUB-4:** Build search (Server Component) (2 points)
- [ ] **NEXT-PUB-5:** Build vendor profile (Server Component) (1 point)

**Acceptance Criteria:**

- Server Components fetch data
- Client Components handle interactions
- SEO-friendly (view page source shows HTML)
- Same functionality as Angular

---

## Epic 4.4: Cart & Checkout (Client Components)

**Story Points:** 13

**Tasks:**

- [ ] **NEXT-CART-1:** Build cart page (3 points)
- [ ] **NEXT-CART-2:** Cart state with React Query (2 points)
- [ ] **NEXT-CHECKOUT-1:** Build checkout flow (5 points)
- [ ] **NEXT-CHECKOUT-2:** Order confirmation (2 points)
- [ ] **NEXT-CHECKOUT-3:** Address management (1 point)

**Acceptance Criteria:**

- Cart syncs with backend
- Checkout flow smooth
- Orders created successfully
- Matches Angular functionality

---

## Epic 4.5: Customer Dashboard (Client Components)

**Story Points:** 8

**Tasks:**

- [ ] **NEXT-DASH-1:** Build dashboard layout (2 points)
- [ ] **NEXT-DASH-2:** Orders section (3 points)
- [ ] **NEXT-DASH-3:** Profile section (2 points)
- [ ] **NEXT-DASH-4:** Addresses section (1 point)

**Acceptance Criteria:**

- Dashboard fully functional
- React Query handles caching
- Matches Angular version

---

## Epic 4.6: Vendor Dashboard (Client Components)

**Story Points:** 13

**Tasks:**

- [ ] **NEXT-VENDOR-1:** Vendor layout (2 points)
- [ ] **NEXT-VENDOR-2:** Products management (5 points)
- [ ] **NEXT-VENDOR-3:** Orders management (3 points)
- [ ] **NEXT-VENDOR-4:** Analytics (2 points)
- [ ] **NEXT-VENDOR-5:** Vendor profile (1 point)

**Acceptance Criteria:**

- All vendor features work
- Image uploads functional
- Charts render correctly

---

## Epic 4.7: Admin Panel (Client Components)

**Story Points:** 8

**Tasks:**

- [ ] **NEXT-ADMIN-1:** Admin layout (1 point)
- [ ] **NEXT-ADMIN-2:** Users management (3 points)
- [ ] **NEXT-ADMIN-3:** Vendors management (2 points)
- [ ] **NEXT-ADMIN-4:** Products overview (1 point)
- [ ] **NEXT-ADMIN-5:** Analytics (1 point)

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
- Deployed and accessible (when you choose to deploy)
