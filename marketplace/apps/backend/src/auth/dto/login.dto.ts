import { IsEmail, IsString, MinLength } from 'class-validator';

/**
 * Request body for POST /auth/login.
 * Keep login DTO minimal; avoid revealing whether email exists.
 */
export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(1, { message: 'Password is required' })
  password!: string;
}
