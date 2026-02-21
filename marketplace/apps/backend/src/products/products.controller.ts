import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { Role } from '../generated/prisma/client';
import { CreateProductDto, QueryProductsDto, UpdateProductDto } from './dto';
import { ProductsService } from './products.service';
import type { AuthenticatedRequest } from '../auth/types/authenticated-request.interface';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Public()
  findAll(@Query() query: QueryProductsDto) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  @Roles(Role.VENDOR, Role.ADMIN)
  async create(@Req() req: AuthenticatedRequest, @Body() dto: CreateProductDto) {
    const vendorId = await this.productsService.getVendorProfileId(req.user.id);
    return this.productsService.create(vendorId, dto);
  }

  @Patch(':id')
  @Roles(Role.VENDOR, Role.ADMIN)
  async update(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProductDto,
  ) {
    const vendorId = await this.productsService.getVendorProfileId(req.user.id);
    return this.productsService.update(id, vendorId, dto);
  }

  @Delete(':id')
  @Roles(Role.VENDOR, Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const vendorId = await this.productsService.getVendorProfileId(req.user.id);
    await this.productsService.delete(id, vendorId);
  }
}
