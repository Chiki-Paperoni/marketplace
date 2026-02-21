import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

/**
 * Request body for POST /auth/register.
 * Use classes (not interfaces) so class-validator decorators work.
 */
export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(64)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)/, {
    message: 'Password must contain at least one letter and one number',
  })
  password!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  firstName!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  lastName!: string;
}
