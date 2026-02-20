import { User } from '../../generated/prisma/client';

/** Express Request extended with the authenticated user attached by JwtStrategy.validate(). */
export interface AuthenticatedRequest extends Request {
  user: User;
}
