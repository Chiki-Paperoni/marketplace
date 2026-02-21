import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

/**
 * All fields from CreateProductDto, but every one is optional.
 * PartialType copies class-validator decorators automatically.
 */
export class UpdateProductDto extends PartialType(CreateProductDto) {}
