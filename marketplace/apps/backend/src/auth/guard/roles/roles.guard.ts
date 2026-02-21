import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../../generated/prisma/client';
import { ROLES_KEY } from '../../decorators/roles.decorator';
import { AuthenticatedRequest } from '../../types/authenticated-request.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();

    if (!req.user) {
      throw new UnauthorizedException('No authenticated user found — ensure JwtAuthGuard runs before RolesGuard');
    }

    if (!requiredRoles.includes(req.user.role)) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    return true;
  }
}
