# Vendor Pages (Vendor Role Required)

## 10. Vendor Dashboard (`/vendor/dashboard`)

**Purpose:** Vendor business management

### Overview Tab

- Key metrics cards:
  - Total sales (this month)
  - Total products
  - Pending orders
  - Average rating
- Sales chart (last 30 days)
- Recent orders (last 10)
- Low stock alerts
- Recent reviews

### Products Tab (`/vendor/products`)

- Products table/grid with:
  - Product image
  - Name
  - Price
  - Stock
  - Status (Published/Draft)
  - Actions (Edit, Delete, Duplicate)
- Filters:
  - Status
  - Category
  - Stock level
- Add new product button
- Bulk actions (delete, publish, unpublish)
- Search products

### Add/Edit Product (`/vendor/products/new`, `/vendor/products/:id/edit`)

**Multi-tab form:**

**Basic Information Tab:**

- Product name (required)
- Description (rich text editor)
- Category (dropdown)
- Status (Draft/Published toggle)

**Pricing & Inventory Tab:**

- Price (required)
- Compare at price (optional, for showing discount)
- Cost per item (optional, for profit tracking)
- Stock quantity
- SKU (optional)
- Barcode (optional)
- Track inventory checkbox
- Continue selling when out of stock checkbox

**Images Tab:**

- Image uploader (drag & drop or click)
- Multiple images support
- Set featured image
- Reorder images (drag & drop)
- Delete images
- Alt text for each image

**Variants Tab (Optional):**

- Add variant options (Size, Color, Material, etc.)
- Generate variant combinations
- Set price/stock for each variant
- Variant images

**SEO Tab:**

- Page title
- Meta description
- URL slug (auto-generated, editable)

**Save as draft / Publish buttons**

### Orders Tab (`/vendor/orders`)

- Orders table with:
  - Order number
  - Customer name
  - Date
  - Items (count)
  - Total amount
  - Status
  - Actions
- Filters:
  - Status (Pending, Processing, Shipped, Delivered, Cancelled)
  - Date range
  - Search by order number or customer
- Order detail modal/page:
  - Customer information
  - Items ordered (vendor's products only)
  - Shipping address
  - Order notes
  - Update status dropdown
  - Print packing slip

### Analytics Tab (`/vendor/analytics`)

- Date range selector
- Revenue chart (daily/weekly/monthly)
- Top selling products (table)
- Sales by category (pie chart)
- Conversion metrics:
  - Product views
  - Add to cart rate
  - Purchase rate
- Export data button (CSV)

### Profile Tab (`/vendor/profile`)

- Vendor information form:
  - Business name
  - Display name
  - Description (about your store)
  - Logo upload
  - Banner image upload
  - Business address
  - Contact email
  - Phone number
  - Website (optional)
  - Social media links
- Save button

### Reviews Tab (`/vendor/reviews`)

- Reviews list for all vendor's products
- Each review shows:
  - Product name
  - Customer name (or anonymous)
  - Rating (stars)
  - Review text
  - Date
  - Respond button (vendor can reply)
- Filter by:
  - Rating
  - Product
  - Date range
- Average rating display
