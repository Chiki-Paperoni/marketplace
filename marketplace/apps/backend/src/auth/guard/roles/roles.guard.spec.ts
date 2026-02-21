import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { Role } from '../../../generated/prisma/client';
import { ROLES_KEY } from '../../decorators/roles.decorator';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  let reflector: jest.Mocked<Reflector>;
  let guard: RolesGuard;

  beforeEach(() => {
    reflector = {
      getAllAndOverride: jest.fn(),
    } as unknown as jest.Mocked<Reflector>;
    guard = new RolesGuard(reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should allow access when no roles are required', () => {
    reflector.getAllAndOverride.mockReturnValue(undefined);
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: () => ({ user: null }),
      }),
    } as unknown as ExecutionContext;

    const result = guard.canActivate(context);

    expect(reflector.getAllAndOverride).toHaveBeenCalledWith(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    expect(result).toBe(true);
  });

  it('should allow access when user has required role', () => {
    reflector.getAllAndOverride.mockReturnValue([Role.ADMIN]);
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: () => ({
          user: { id: '1', email: 'admin@test.com', role: Role.ADMIN },
        }),
      }),
    } as unknown as ExecutionContext;

    const result = guard.canActivate(context);

    expect(result).toBe(true);
  });

  it('should throw UnauthorizedException when no user on request', () => {
    reflector.getAllAndOverride.mockReturnValue([Role.ADMIN]);
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: () => ({ user: undefined }),
      }),
    } as unknown as ExecutionContext;

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
    expect(() => guard.canActivate(context)).toThrow(
      'No authenticated user found — ensure JwtAuthGuard runs before RolesGuard'
    );
  });

  it('should throw ForbiddenException when user does not have required role', () => {
    reflector.getAllAndOverride.mockReturnValue([Role.ADMIN]);
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: () => ({
          user: { id: '1', email: 'user@test.com', role: Role.CUSTOMER },
        }),
      }),
    } as unknown as ExecutionContext;

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    expect(() => guard.canActivate(context)).toThrow(
      'You do not have permission to access this resource'
    );
  });

  it('should allow access when user has one of multiple required roles', () => {
    reflector.getAllAndOverride.mockReturnValue([Role.ADMIN, Role.VENDOR]);
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: () => ({
          user: { id: '1', email: 'vendor@test.com', role: Role.VENDOR },
        }),
      }),
    } as unknown as ExecutionContext;

    const result = guard.canActivate(context);

    expect(result).toBe(true);
  });
});
