
class AuthUserDto {
  id!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  role!: string;
}

/**
 * Standard auth API response: user (no password) + JWT.
 * Using a class keeps response shape consistent.
 */
export class AuthResponseDto {
  user!: AuthUserDto;

  access_token!: string;
}
