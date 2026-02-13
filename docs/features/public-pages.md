# Public Pages (No Authentication Required)

## 1. Homepage (`/`)

**Purpose:** Landing page and product discovery

**Features:**

- Hero section with featured products
- Product categories grid
- Featured vendors
- Latest products carousel
- Search bar (global)
- Navigation menu
- Footer with links

**Components:**

- Hero banner
- Product grid (featured)
- Category cards
- Vendor spotlight
- Newsletter signup

---

## 2. Product Listing Page (`/products`)

**Purpose:** Browse all products with filtering

**Features:**

- Product grid/list view toggle
- Filters:
  - Price range (min-max slider)
  - Categories (multi-select)
  - Vendor (multi-select)
  - Rating (stars)
  - In stock only
- Sorting:
  - Price (low to high / high to low)
  - Newest first
  - Best rating
  - Most popular
- Pagination (load more / numbered pages)
- Search bar
- Breadcrumbs

**State Management:**

- Filter state
- Sort state
- Page state
- Product cache (React Query)

---

## 3. Product Detail Page (`/products/:id`)

**Purpose:** View single product in detail

**Features:**

- Product image gallery (zoom, thumbnails)
- Product title and description
- Price display
- Vendor information (with link to vendor profile)
- Stock availability
- Add to cart button (with quantity selector)
- Product specifications/details
- Customer reviews section:
  - Average rating
  - Review list with pagination
  - Filter reviews by rating
- Related products
- Breadcrumbs

**Additional Features:**

- Share product (social media)
- Add to wishlist (if authenticated)
- Report product (if authenticated)

---

## 4. Vendor Profile Page (`/vendors/:id`)

**Purpose:** View vendor store and products

**Features:**

- Vendor banner/logo
- Vendor description
- Rating and review count
- Product grid (vendor's products only)
- Filter by category
- Sort options
- Contact vendor button
- Vendor stats:
  - Total products
  - Member since
  - Average rating
  - Total sales (optional)

---

## 5. Search Results Page (`/search?q=...`)

**Purpose:** Display search results

**Features:**

- Search query display
- Result count
- Product grid
- Same filters as product listing
- Sort options
- "No results" state with suggestions
- Recent searches (if authenticated)

---

## 6. Authentication Pages

### Login (`/login`)

**Features:**

- Email/password form
- "Remember me" checkbox
- "Forgot password" link
- Social login (optional: Google, Facebook)
- Link to register page
- Error messages
- Redirect after login

### Register (`/register`)

**Features:**

- Multi-step form:
  - Step 1: Account type (Customer / Vendor)
  - Step 2: Personal info (name, email, password)
  - Step 3: Address (for customers)
  - Step 4: Business info (for vendors)
- Email verification
- Password strength indicator
- Terms and conditions checkbox
- Link to login page

### Forgot Password (`/forgot-password`)

**Features:**

- Email input
- Send reset link
- Confirmation message
- Link back to login

### Reset Password (`/reset-password/:token`)

**Features:**

- New password form
- Password confirmation
- Password strength indicator
- Success message with redirect to login
