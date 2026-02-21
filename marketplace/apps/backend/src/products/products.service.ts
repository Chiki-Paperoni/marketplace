import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import { CreateProductDto, QueryProductsDto, UpdateProductDto } from './dto';
import { Product } from '../generated/prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(vendorId: string, dto: CreateProductDto): Promise<Product> {
    const { categoryId, ...rest } = dto;

    return this.prisma.product.create({
      data: {
        ...rest,
        vendor: { connect: { id: vendorId } },
        ...(categoryId && { category: { connect: { id: categoryId } } }),
      },
    });
  }

  async findAll(query: QueryProductsDto): Promise<Product[]> {
    const { page = 1, limit = 20, search, categoryId, status, vendorId } = query;

    return this.prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        ...(search && { name: { contains: search, mode: 'insensitive' as const } }),
        ...(categoryId && { categoryId }),
        ...(status && { status }),
        ...(vendorId && { vendorId }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: string, vendorId: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOneOwnedByVendor(id, vendorId);
    const { categoryId, ...rest } = dto;

    return this.prisma.product.update({
      where: { id: product.id },
      data: {
        ...rest,
        ...(categoryId !== undefined && {
          category: categoryId ? { connect: { id: categoryId } } : { disconnect: true },
        }),
      },
    });
  }

  async delete(id: string, vendorId: string): Promise<void> {
    const product = await this.findOneOwnedByVendor(id, vendorId);

    await this.prisma.product.delete({
      where: { id: product.id },
    });
  }

  /** Resolve a User's VendorProfile ID. Throws if user has no vendor profile. */
  async getVendorProfileId(userId: string): Promise<string> {
    const profile = await this.prisma.vendorProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!profile) {
      throw new ForbiddenException('You must have a vendor profile to manage products');
    }

    return profile.id;
  }

  /** Load product and verify the calling vendor owns it. Reused by update + delete. */
  private async findOneOwnedByVendor(id: string, vendorId: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.vendorId !== vendorId) {
      throw new ForbiddenException('You can only modify your own products');
    }

    return product;
  }
}
