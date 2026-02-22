import { IsEmail, IsString, MinLength } from 'class-validator';

/**
 * Request body for POST /auth/login.
 * Keep login DTO minimal; avoid revealing whether email exists.
 */
export class LoginDto {
  /**
   * @example test@example.com
   */
  @IsEmail()
  email!: string;

  /**
   * @example password
   */
  @IsString()
  @MinLength(1, { message: 'Password is required' })
  password!: string;
}
