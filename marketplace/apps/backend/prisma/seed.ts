/// <reference types="node" />
import 'dotenv/config';
import * as bcrypt from 'bcryptjs';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const connectionString = process.env.DATABASE_URL ?? '';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const SALT_ROUNDS = 10;

async function main() {
  const passwordHash = bcrypt.hashSync('Password123!', SALT_ROUNDS);

  // --- Users ---
  const admin = await prisma.user.upsert({
    where: { email: 'admin@marketplace.demo' },
    update: {},
    create: {
      email: 'admin@marketplace.demo',
      password: passwordHash,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: 'customer@marketplace.demo' },
    update: {},
    create: {
      email: 'customer@marketplace.demo',
      password: passwordHash,
      firstName: 'Jane',
      lastName: 'Customer',
      role: 'CUSTOMER',
      status: 'ACTIVE',
    },
  });

  const vendorUser = await prisma.user.upsert({
    where: { email: 'vendor@marketplace.demo' },
    update: {},
    create: {
      email: 'vendor@marketplace.demo',
      password: passwordHash,
      firstName: 'John',
      lastName: 'Vendor',
      role: 'VENDOR',
      status: 'ACTIVE',
    },
  });

  // --- Vendor profile (for the vendor user) ---
  const vendorProfile = await prisma.vendorProfile.upsert({
    where: { userId: vendorUser.id },
    update: {},
    create: {
      userId: vendorUser.id,
      businessName: 'Demo Store',
      displayName: 'Demo Store',
      description: 'A sample vendor for development and demos.',
      businessAddress: '123 Market St, Kyiv',
      phone: '+380 44 123 4567',
      website: 'https://demo-store.example.com',
      approvalStatus: 'APPROVED',
    },
  });

  // --- Categories ---
  const electronics = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Gadgets and electronic devices',
    },
  });

  const home = await prisma.category.upsert({
    where: { slug: 'home' },
    update: {},
    create: {
      name: 'Home & Garden',
      slug: 'home',
      description: 'Items for your home and garden',
    },
  });

  // --- Products ---
  const productData = [
    {
      name: 'Wireless Headphones',
      description: 'Noise-cancelling over-ear headphones with 30h battery.',
      price: 89.99,
      compareAtPrice: 119.99,
      stock: 50,
      categoryId: electronics.id,
      status: 'PUBLISHED' as const,
      images: ['https://placehold.co/400x400?text=Headphones'],
    },
    {
      name: 'USB-C Hub',
      description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader.',
      price: 45.5,
      stock: 100,
      categoryId: electronics.id,
      status: 'PUBLISHED' as const,
      images: ['https://placehold.co/400x400?text=Hub'],
    },
    {
      name: 'Desk Lamp',
      description: 'LED desk lamp with adjustable brightness and color temperature.',
      price: 34.99,
      stock: 75,
      categoryId: home.id,
      status: 'PUBLISHED' as const,
      images: ['https://placehold.co/400x400?text=Lamp'],
    },
  ];

  for (const p of productData) {
    const existing = await prisma.product.findFirst({
      where: { name: p.name, vendorId: vendorProfile.id },
    });
    if (!existing) {
      await prisma.product.create({
        data: {
          name: p.name,
          description: p.description,
          price: p.price,
          compareAtPrice: p.compareAtPrice ?? undefined,
          stock: p.stock,
          vendorId: vendorProfile.id,
          categoryId: p.categoryId,
          status: p.status,
          images: p.images,
        },
      });
    }
  }

  console.log('Seed completed:');
  console.log('  Admin:', admin.email);
  console.log('  Customer:', customer.email);
  console.log('  Vendor:', vendorUser.email);
  console.log('  Categories: Electronics, Home & Garden');
  console.log('  Products: 3 created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
