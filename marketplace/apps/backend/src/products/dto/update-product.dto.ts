import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

/**
 * All fields from CreateProductDto, but every one is optional.
 * PartialType copies class-validator decorators automatically.
 */
export class UpdateProductDto extends PartialType(CreateProductDto) {}
