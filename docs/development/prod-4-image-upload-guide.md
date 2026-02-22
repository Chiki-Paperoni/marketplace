# PROD-4: Product Image Upload — Step-by-Step Guide

This guide walks you through adding **image upload** for products: Cloudinary integration, upload/delete endpoints, and a **featured image**. It’s written for developers new to backend work and follows common industry practices.

---

## Table of contents

1. [What we’re building](#1-what-were-building)
2. [Why Cloudinary (and best practices)](#2-why-cloudinary-and-best-practices)
3. [Prerequisites](#3-prerequisites)
4. [High-level design](#4-high-level-design)
5. [Step 1: Environment and Cloudinary setup](#5-step-1-environment-and-cloudinary-setup)
6. [Step 2: Database schema for product images](#6-step-2-database-schema-for-product-images)
7. [Step 3: Install dependencies](#7-step-3-install-dependencies)
8. [Step 4: Cloudinary configuration and service](#8-step-4-cloudinary-configuration-and-service)
9. [Step 5: File validation (security)](#9-step-5-file-validation-security)
10. [Step 6: DTOs and API shape](#10-step-6-dtos-and-api-shape)
11. [Step 7: Products service — image methods](#11-step-7-products-service--image-methods)
12. [Step 8: Controller endpoints](#12-step-8-controller-endpoints)
13. [Step 9: Swagger and manual testing](#13-step-9-swagger-and-manual-testing)
14. [Checklist and acceptance criteria](#14-checklist-and-acceptance-criteria)

---

## 1. What we’re building

- **POST /api/products/:id/images** — Upload one or more images for a product (vendor only). Files go to Cloudinary; URLs (and identifiers) are stored in your DB.
- **DELETE /api/products/:id/images/:imageId** — Remove an image from a product and from Cloudinary (vendor only).
- **PATCH /api/products/:id/images/:imageId/featured** (or a “set featured” body on PATCH product) — Mark one image as the “featured” image (e.g. for listing/cards).

Your existing `Product` model has `images String[]`. To support **deleting by ID** and **featured image**, the industry-standard approach is to introduce a **ProductImage** model (one row per image) instead of only an array of URLs. This guide uses that approach.

---

## 2. Why Cloudinary (and best practices)

- **Do not store binary files in your database.** Store only **URLs** (and identifiers like Cloudinary `public_id`). Files go in object storage (e.g. Cloudinary, S3).
- **Do not trust the client.** Validate **file type** (e.g. image MIME type / extension) and **file size** on the server. Reject invalid uploads with 400.
- **Use a CDN for delivery.** Cloudinary (or S3 + CloudFront) gives you URLs that are fast and cacheable.
- **Keep a stable identifier for each image.** Cloudinary returns a `public_id`; we store it so we can **delete** or **update** that asset later.
- **Limit upload size and count.** Define max file size (e.g. 5 MB) and max images per product (e.g. 10) to avoid abuse and cost.

---

## 3. Prerequisites

- NestJS backend and Products module already in place.
- A **Cloudinary** account (free tier is enough for learning).
- Basic familiarity with **env variables** and **Prisma migrations**.

---

## 4. High-level design

- **Storage:** Files → Cloudinary. Database stores **url** and **publicId** (and optionally **isFeatured**, **order**).
- **Schema:** New model `ProductImage` (id, productId, url, publicId, isFeatured, order). Product keeps `images String[]` for backward compatibility if you want, or you can later switch list/detail responses to use `ProductImage` only.
- **Auth:** Only the product’s **vendor** (or admin) can add/delete images or set featured. Reuse your existing “own product” check.
- **Validation:** Accept only image MIME types (e.g. image/jpeg, image/png, image/webp) and enforce a max file size (e.g. 5 MB).

---

## 5. Step 1: Environment and Cloudinary setup

1. **Create a Cloudinary account**  
   Go to [cloudinary.com](https://cloudinary.com), sign up, and open the **Dashboard**.

2. **Get API credentials**  
   In the Dashboard you’ll see:
   - **Cloud name**
   - **API Key**
   - **API Secret**  
   Never commit the secret; use env variables.

3. **Add env variables**  
   In your backend root (e.g. `apps/backend` or where `.env` is loaded), create or edit `.env`:

   ```env
   # Cloudinary (create these in Cloudinary Dashboard)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Optional: upload folder**  
   You can use a folder per product or a global “products” folder, e.g. `products/{productId}`. The guide will assume a folder like `marketplace/products` so all product images live under one prefix.

5. **Document env vars**  
   Add these to `docs/configuration/environment-variables.md` (or your env doc) so other devs know what to set.

---

## 6. Step 2: Database schema for product images

**Why a separate table?**  
So we can:
- Delete an image by **id** (stable UUID), not by array index.
- Store **publicId** for Cloudinary delete.
- Mark one image as **featured** and optionally **order** for display.

1. **Add the `ProductImage` model** in `prisma/schema.prisma`:

   ```prisma
   model ProductImage {
     id        String   @id @default(uuid())
     productId String
     product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
     url       String   // Cloudinary secure_url
     publicId  String   // Cloudinary public_id (needed for delete)
     isFeatured Boolean @default(false)
     order     Int      @default(0)   // display order
     createdAt DateTime @default(now())

     @@unique([productId, publicId])
     @@index([productId])
   }
   ```

2. **Update the `Product` model** — add the relation (you can keep `images String[]` for now for backward compatibility, or remove it later once everything uses `ProductImage`):

   ```prisma
   model Product {
     // ... existing fields ...
     images     String[]       // optional: keep for backward compatibility or remove later
     productImages ProductImage[]
     // ...
   }
   ```

3. **Run migration**  
   From the app where Prisma is (e.g. `apps/backend`):

   ```bash
   npx prisma migrate dev --name add_product_images
   ```

4. **Regenerate Prisma client**  
   Usually runs with the migrate command; if not:

   ```bash
   npx prisma generate
   ```

**Best practice:** Use `onDelete: Cascade` so when a product is deleted, its image rows are removed. You should still delete the file from Cloudinary when deleting an image (or when deleting the product) to avoid orphaned assets.

---

## 7. Step 3: Install dependencies

- **Cloudinary SDK** (Node):

  ```bash
  pnpm add cloudinary
  # or npm i cloudinary / yarn add cloudinary
  ```

- **Multer** (Nest uses it under the hood for file uploads; you may already have it via `@nestjs/platform-express`):

  ```bash
  pnpm add -D @types/multer
  ```

You’ll use Nest’s `FileInterceptor` / `FilesInterceptor` (from `@nestjs/platform-express`), which uses Multer. No need to install `multer` separately if you’re on a standard Nest + Express setup.

---

## 8. Step 4: Cloudinary configuration and service

**Goal:** A reusable way to upload and delete files in Cloudinary, using env for credentials.

1. **Config module / env**  
   Ensure `CLOUDINARY_*` are loaded (e.g. via `dotenv` in `main.ts` or a ConfigModule). Validate that they exist when the app starts (or when the Cloudinary service is first used).

2. **Create a Cloudinary service** (e.g. `apps/backend/src/cloudinary/cloudinary.service.ts`):

   - In `onModuleInit` (or in each method), configure the SDK with `process.env.CLOUDINARY_CLOUD_NAME`, `API_KEY`, `API_SECRET`.
   - **Upload method:** Accept a **buffer** (and optional folder). Call Cloudinary’s upload API (e.g. `v2.uploader.upload_stream` or `upload` with buffer). Return `{ url: string, publicId: string }`.
   - **Delete method:** Accept `publicId`, call `v2.uploader.destroy(publicId)`. Return success/failure.

   Example (conceptual):

   ```ts
   // cloudinary.service.ts
   import { v2 as cloudinary } from 'cloudinary';

   export class CloudinaryService {
     constructor() {
       cloudinary.config({
         cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
         api_key: process.env.CLOUDINARY_API_KEY,
         api_secret: process.env.CLOUDINARY_API_SECRET,
       });
     }

     async uploadBuffer(buffer: Buffer, folder: string): Promise<{ url: string; publicId: string }> {
       return new Promise((resolve, reject) => {
         const uploadStream = cloudinary.uploader.upload_stream(
           { folder, resource_type: 'image' },
           (err, result) => {
             if (err) return reject(err);
             resolve({ url: result!.secure_url, publicId: result!.public_id });
           },
         );
         uploadStream.end(buffer);
       });
     }

     async delete(publicId: string): Promise<void> {
       await cloudinary.uploader.destroy(publicId);
     }
   }
   ```

3. **Register the service** in a `CloudinaryModule` and export it. Import `CloudinaryModule` in `ProductsModule` so `ProductsService` can inject `CloudinaryService`.

---

## 9. Step 5: File validation (security)

**Goal:** Reject non-image files and files that are too large **before** uploading to Cloudinary.

1. **Allowed types**  
   Only allow image MIME types, e.g. `image/jpeg`, `image/png`, `image/webp`. Optionally allow `image/gif`. Reject anything else (e.g. `application/pdf`) with **400 Bad Request**.

2. **Max file size**  
   Enforce a limit (e.g. **5 MB**). Configure Multer with `limits: { fileSize: 5 * 1024 * 1024 }` and handle “file too large” (Multer or Nest often returns 413 or 400).

3. **Where to validate**  
   - **Option A:** Use a **custom pipe** that runs after Multer. It receives the uploaded file(s), checks `mimetype` and `size`, and throws `BadRequestException` if invalid.
   - **Option B:** Use a **guard** that does the same checks.  
   Use one place consistently; a **pipe** is a good fit for “validate this request body/file.”

4. **Limit number of files per request**  
   Use `FilesInterceptor('files', 10)` (or your chosen max) so a single request can’t upload 100 files. Return 400 if the client sends more than allowed.

**Best practice:** Never rely on client-provided file type alone; check the **buffer** or **MIME type** set by Multer (which comes from the request). Optionally use a library to detect magic bytes for extra safety.

---

## 10. Step 6: DTOs and API shape

- **Upload (POST /products/:id/images)**  
  - No body DTO needed if you only send files as `multipart/form-data` with field name `files` (or `file` for single).  
  - Response DTO: array of `{ id, url, publicId, isFeatured, order }` (or your chosen fields).

- **Set featured (PATCH /products/:id/images/:imageId/featured)**  
  - No body, or body `{ isFeatured: true }`.  
  - Response: updated product or updated image list.

- **Delete (DELETE /products/:id/images/:imageId)**  
  - No body. Return 204 No Content on success.

Use **ParseUUIDPipe** for `id` and `imageId` so invalid IDs return 400.

---

## 11. Step 7: Products service — image methods

Implement (and reuse your existing “vendor owns product” check):

1. **addImages(productId, vendorId, files: Express.Multer.File[])**  
   - Load product; verify `product.vendorId === vendorId` (or user is admin).  
   - For each file, validate (if not already in pipe): type, size.  
   - Upload buffer to Cloudinary (folder e.g. `marketplace/products/{productId}`).  
   - Create a `ProductImage` for each `{ url, publicId, productId, order: currentMax + i }`.  
   - If the product has no images yet, set the first one as `isFeatured: true`.  
   - Return the created `ProductImage[]`.

2. **deleteImage(productId, imageId, vendorId)**  
   - Load product; verify ownership.  
   - Find `ProductImage` by `id === imageId` and `productId === product.id`.  
   - Call Cloudinary delete with `publicId`.  
   - Delete the `ProductImage` row.  
   - If the deleted image was featured, set the next image (e.g. by `order`) as featured.

3. **setFeaturedImage(productId, imageId, vendorId)**  
   - Verify ownership.  
   - Find the image by `id` and `productId`.  
   - Set `isFeatured: true` for this image and `isFeatured: false` for all other images of this product.  
   - Return the updated image or product.

Use **transactions** if you do multiple DB writes (e.g. create several ProductImage rows and update product) so you don’t leave partial state on failure.

---

## 12. Step 8: Controller endpoints

- **POST /products/:id/images**  
  - Use `@UseInterceptors(FilesInterceptor('files', 10))` (or your max).  
  - Use your file-validation pipe on the file(s).  
  - Handler: get `vendorId` from auth, call `productsService.addImages(id, vendorId, files)`.  
  - Return created images and **201 Created**.

- **DELETE /products/:id/images/:imageId**  
  - Parse `id` and `imageId` with **ParseUUIDPipe**.  
  - Get `vendorId`, call `productsService.deleteImage(id, imageId, vendorId)`.  
  - Return **204 No Content**.

- **PATCH /products/:id/images/:imageId/featured**  
  - Parse UUIDs, get `vendorId`, call `productsService.setFeaturedImage(id, imageId, vendorId)`.  
  - Return updated image or 200 OK.

Protect all three with your **JWT + role guard** and ensure only the product’s vendor (or admin) can call them (enforce in service).

---

## 13. Step 9: Swagger and manual testing

- **Swagger:** Use `@ApiConsumes('multipart/form-data')` and `@ApiBody({ schema: { type: 'object', properties: { files: { type: 'array', items: { type: 'string', format: 'binary' } } } } })` for the upload endpoint so Swagger UI shows a file picker.
- **Manual test:**  
  - Create a product (as vendor).  
  - POST an image to `/api/products/:id/images` with form field `files` and a JPEG/PNG file.  
  - Check DB for a new `ProductImage` and Cloudinary for the file.  
  - PATCH set featured, then DELETE an image and confirm it’s removed from DB and Cloudinary.

---

## 14. Checklist and acceptance criteria

- [ ] Cloudinary account created and env vars set and documented.
- [ ] `ProductImage` model added and migration run.
- [ ] Cloudinary service implemented (upload by buffer, delete by publicId).
- [ ] File validation: only allowed image types and max size (e.g. 5 MB), enforced in a pipe (or guard).
- [ ] POST /products/:id/images uploads to Cloudinary and creates ProductImage rows; only vendor/admin.
- [ ] DELETE /products/:id/images/:imageId removes row and Cloudinary asset; only vendor/admin.
- [ ] PATCH set-featured implemented; only vendor/admin.
- [ ] Swagger documents the upload endpoint (multipart/form-data).
- [ ] Manual test: upload, set featured, delete; verify in DB and Cloudinary.

When all of the above are done, PROD-4 is complete. If you want, the next step is to implement this in code (CloudinaryModule, pipe, ProductsService image methods, controller routes) following this guide.
