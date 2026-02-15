/**
 * Standard auth API response: user (no password) + JWT.
 * Using a class keeps response shape consistent and is easy to document in Swagger later.
 */
export class AuthResponseDto {
  user!: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  access_token!: string;
}
