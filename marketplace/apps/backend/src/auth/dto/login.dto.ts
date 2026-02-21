import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

/**
 * Request body for POST /auth/login.
 * Keep login DTO minimal; avoid revealing whether email exists.
 */
export class LoginDto {
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    example: 'test@example.com',
  })
  email!: string;

  @IsString()
  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  @MinLength(1, { message: 'Password is required' })
  password!: string;
}
