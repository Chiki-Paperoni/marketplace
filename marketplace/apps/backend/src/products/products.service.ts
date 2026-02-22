import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import { CreateProductDto, QueryProductsDto, UpdateProductDto } from './dto';
import { Prisma, Product } from '../generated/prisma/client';
import { ProductSortField, SortOrder } from './dto/query-products.dto';

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

  async findAll(query: QueryProductsDto): Promise<{ data: Product[]; meta: { total: number; page: number; limit: number; totalPages: number } }> {
    const {
      page = 1,
      limit = 20,
      search,
      categoryId,
      status,
      vendorId,
      minPrice,
      maxPrice,
      minRating,
      sortBy = ProductSortField.CREATED_AT,
      sortOrder = SortOrder.DESC,
    } = query;
  
    const where: Prisma.ProductWhereInput = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(categoryId && { categoryId }),
      ...(status && { status }),
      ...(vendorId && { vendorId }),
      ...((minPrice !== undefined || maxPrice !== undefined) && {
        price: {
          ...(minPrice !== undefined && { gte: minPrice }),
          ...(maxPrice !== undefined && { lte: maxPrice }),
        },
      }),
      ...(minRating !== undefined && {
        averageRating: { gte: minRating },
      }),
    };
  
    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.product.count({ where }),
    ]);
  
    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
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
