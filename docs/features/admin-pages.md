# Admin Pages (Admin Role Required)

## 11. Admin Dashboard (`/admin/dashboard`)

**Purpose:** Platform management and oversight

### Overview Tab

- Platform metrics:
  - Total users (customers)
  - Total vendors
  - Total products
  - Total orders
  - Revenue (this month)
  - Revenue (total)
- Charts:
  - Revenue over time
  - New users over time
  - Orders over time
- Recent activity feed
- Pending approvals count

### Users Tab (`/admin/users`)

- Users table with:
  - User ID
  - Name
  - Email
  - Role (Customer/Vendor/Admin)
  - Status (Active/Suspended)
  - Registered date
  - Actions (View, Edit, Suspend, Delete)
- Filters:
  - Role
  - Status
  - Date range
- Search users
- Add new user/admin button
- User detail modal:
  - Full profile information
  - Order history (for customers)
  - Products and sales (for vendors)
  - Activity log
  - Change role
  - Suspend/Activate account

### Vendors Tab (`/admin/vendors`)

- Vendors table (same as users but filtered)
- Additional columns:
  - Approval status (Pending/Approved/Rejected)
  - Total products
  - Total sales
  - Rating
- Approve/Reject pending vendors
- View vendor application details
- Suspend vendor account
- View vendor's products and orders

### Products Tab (`/admin/products`)

- All products table with:
  - Product ID
  - Name
  - Vendor
  - Category
  - Price
  - Stock
  - Status
  - Actions (View, Edit, Delete)
- Filters:
  - Vendor
  - Category
  - Status
  - Stock level
- Search products
- Edit any product
- Delete products (with confirmation)
- Bulk actions

### Orders Tab (`/admin/orders`)

- All platform orders table
- Same columns as vendor orders + vendor name
- Filters:
  - Status
  - Vendor
  - Date range
  - Customer
- Search orders
- View order details
- Refund order (admin override)

### Categories Tab (`/admin/categories`)

- Categories list with:
  - Name
  - Slug
  - Product count
  - Status (Active/Inactive)
  - Actions (Edit, Delete)
- Add new category
- Edit category modal:
  - Name
  - Description
  - Parent category (for subcategories)
  - Icon/image (optional)
  - SEO fields
- Delete category (with reassignment of products)

### Analytics Tab (`/admin/analytics`)

- Platform-wide analytics:
  - Total revenue (all time, this month, this week)
  - Revenue by vendor (top 10)
  - Revenue by category
  - Most sold products
  - Customer acquisition chart
  - Order completion rate
  - Average order value
- Date range selector
- Export reports (CSV, PDF)

### Settings Tab (`/admin/settings`)

**General Settings:**

- Platform name
- Logo
- Favicon
- Contact email
- Support email
- Currency
- Timezone

**Email Settings:**

- SMTP configuration
- Email templates preview
- Test email functionality

**Payment Settings:**

- Stripe API keys
- PayPal credentials
- Payment methods enabled

**Shipping Settings:**

- Flat rate shipping
- Free shipping threshold
- Shipping zones (optional)

**Tax Settings:**

- Tax rate (%)
- Tax-inclusive pricing toggle

**Security Settings:**

- Enable 2FA (optional)
- Password requirements
- Session timeout
