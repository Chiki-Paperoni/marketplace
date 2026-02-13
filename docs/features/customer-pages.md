# Customer Pages (Authentication Required)

## 7. Shopping Cart (`/cart`)

**Purpose:** Review and manage cart items

**Features:**

- Cart items list:
  - Product image
  - Product name
  - Vendor name
  - Price (unit)
  - Quantity selector (+ / -)
  - Subtotal
  - Remove button
- Cart summary:
  - Subtotal
  - Estimated tax
  - Shipping (calculated at checkout)
  - Total
- Proceed to checkout button
- Continue shopping link
- Empty cart state
- Save for later (optional)

**State Management:**

- Cart items (Zustand/Signals)
- Quantity updates (optimistic)
- Remove items (optimistic)

---

## 8. Checkout Flow (`/checkout`)

**Purpose:** Complete purchase

### Step 1: Shipping Address (`/checkout/shipping`)

- Saved addresses (select from list)
- Add new address form:
  - Full name
  - Address line 1
  - Address line 2
  - City
  - State/Province
  - Postal code
  - Country
  - Phone number
- Set as default checkbox
- Continue to payment button

### Step 2: Payment (`/checkout/payment`)

- Payment method selection:
  - Credit/Debit card (Stripe integration — UI only for demo)
  - PayPal (UI only)
  - Cash on delivery
- Billing address (same as shipping or different)
- Order summary sidebar
- Continue to review button

### Step 3: Review & Place Order (`/checkout/review`)

- Order summary:
  - Items list
  - Quantities
  - Prices
- Shipping address display
- Payment method display
- Order totals:
  - Subtotal
  - Tax
  - Shipping
  - Total
- Place order button
- Terms and conditions checkbox
- Edit buttons for each section

### Order Confirmation (`/checkout/confirmation/:orderId`)

- Order number
- Estimated delivery date
- Order summary
- Shipping address
- Payment method
- Print receipt button
- Continue shopping button
- Track order link

---

## 9. Customer Dashboard (`/dashboard`)

**Purpose:** Customer account overview

### Overview Tab

- Welcome message
- Quick stats:
  - Total orders
  - Pending orders
  - Total spent
- Recent orders (last 5)
- Recommended products based on history

### Orders Tab (`/dashboard/orders`)

- Order list with filters:
  - Status (All, Pending, Processing, Shipped, Delivered, Cancelled)
  - Date range
- Each order shows:
  - Order number
  - Date
  - Status badge
  - Total amount
  - View details button
- Pagination

### Order Detail (`/dashboard/orders/:id`)

- Order information:
  - Order number
  - Date placed
  - Status timeline
  - Items list with images
  - Shipping address
  - Payment method
  - Order totals
- Track shipment button (if shipped)
- Cancel order button (if applicable)
- Download invoice
- Reorder button

### Profile Tab (`/dashboard/profile`)

- Personal information form:
  - Name
  - Email (readonly, with verify status)
  - Phone
  - Date of birth (optional)
- Change password section
- Email preferences
- Save button

### Addresses Tab (`/dashboard/addresses`)

- Saved addresses list
- Each address card:
  - Full address
  - Default badge (if default)
  - Edit button
  - Delete button
  - Set as default button
- Add new address button

### Wishlist Tab (`/dashboard/wishlist`)

- Saved products grid
- Add to cart button
- Remove from wishlist
- Product availability status
