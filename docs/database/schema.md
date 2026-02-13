# Database Schema

## Users Table

```prisma
model User {
  id            String   @id @default(uuid())
  email         String   @unique
  password      String
  firstName     String
  lastName      String
  role          Role     @default(CUSTOMER)
  status        Status   @default(ACTIVE)
  emailVerified Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  profile       Profile?
  vendorProfile VendorProfile?
  orders        Order[]
  reviews       Review[]
  cartItems     CartItem[]
  addresses     Address[]
}

enum Role {
  CUSTOMER
  VENDOR
  ADMIN
}

enum Status {
  ACTIVE
  SUSPENDED
  PENDING
}
```

## Profile Table

```prisma
model Profile {
  id          String   @id @default(uuid())
  userId      String   @unique
  user        User     @relation(fields: [userId], references: [id])
  phone       String?
  dateOfBirth DateTime?
  avatar      String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## VendorProfile Table

```prisma
model VendorProfile {
  id              String   @id @default(uuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])
  businessName    String
  displayName     String
  description     String?
  logo            String?
  banner          String?
  businessAddress String
  phone           String
  website         String?
  approvalStatus  ApprovalStatus @default(PENDING)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  products        Product[]
}

enum ApprovalStatus {
  PENDING
  APPROVED
  REJECTED
}
```

## Product Table

```prisma
model Product {
  id          String   @id @default(uuid())
  name        String
  description String
  price       Decimal  @db.Decimal(10, 2)
  compareAtPrice Decimal? @db.Decimal(10, 2)
  cost        Decimal? @db.Decimal(10, 2)
  sku         String?  @unique
  barcode     String?
  stock       Int      @default(0)
  images      String[] // Array of URLs
  status      ProductStatus @default(DRAFT)
  vendorId    String
  vendor      VendorProfile @relation(fields: [vendorId], references: [id])
  categoryId  String?
  category    Category? @relation(fields: [categoryId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  orderItems  OrderItem[]
  cartItems   CartItem[]
  reviews     Review[]
}

enum ProductStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}
```

## Category Table

```prisma
model Category {
  id          String   @id @default(uuid())
  name        String   @unique
  slug        String   @unique
  description String?
  parentId    String?
  parent      Category? @relation("CategoryToCategory", fields: [parentId], references: [id])
  children    Category[] @relation("CategoryToCategory")
  products    Product[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Order Table

```prisma
model Order {
  id              String      @id @default(uuid())
  orderNumber     String      @unique // e.g., "ORD-20240215-001"
  userId          String
  user            User        @relation(fields: [userId], references: [id])
  status          OrderStatus @default(PENDING)
  subtotal        Decimal     @db.Decimal(10, 2)
  tax             Decimal     @db.Decimal(10, 2)
  shipping        Decimal     @db.Decimal(10, 2)
  total           Decimal     @db.Decimal(10, 2)
  shippingAddressId String
  shippingAddress Address     @relation(fields: [shippingAddressId], references: [id])
  paymentMethod   String
  notes           String?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  
  items           OrderItem[]
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  REFUNDED
}
```

## OrderItem Table

```prisma
model OrderItem {
  id         String  @id @default(uuid())
  orderId    String
  order      Order   @relation(fields: [orderId], references: [id])
  productId  String
  product    Product @relation(fields: [productId], references: [id])
  quantity   Int
  price      Decimal @db.Decimal(10, 2) // Price at time of purchase
  subtotal   Decimal @db.Decimal(10, 2) // quantity * price
  createdAt  DateTime @default(now())
}
```

## CartItem Table

```prisma
model CartItem {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  quantity  Int      @default(1)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@unique([userId, productId]) // User can't have duplicate products in cart
}
```

## Address Table

```prisma
model Address {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  fullName    String
  addressLine1 String
  addressLine2 String?
  city        String
  state       String
  postalCode  String
  country     String   @default("Ukraine")
  phone       String
  isDefault   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  orders      Order[]
}
```

## Review Table

```prisma
model Review {
  id        String   @id @default(uuid())
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  rating    Int      // 1-5 stars
  comment   String?
  vendorReply String? // Vendor can respond to reviews
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@unique([productId, userId]) // User can only review a product once
}
```
