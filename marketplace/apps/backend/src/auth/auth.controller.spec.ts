import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '../generated/prisma/client';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import type { AuthenticatedRequest } from './types/authenticated-request.interface';

const mockAuthResponse = {
  user: {
    id: 'user-1',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    role: Role.ADMIN,
  },
  access_token: 'mock-jwt-token',
};

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService) as jest.Mocked<AuthService>;
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should call authService.register and return result', async () => {
      const registerDto = {
        email: 'new@example.com',
        password: 'Password1',
        firstName: 'New',
        lastName: 'User',
      };
      authService.register.mockResolvedValue(mockAuthResponse);

      const result = await controller.register(registerDto);

      expect(authService.register).toHaveBeenCalledWith(registerDto);
      expect(result).toEqual(mockAuthResponse);
    });
  });

  describe('login', () => {
    it('should call authService.login and return result', async () => {
      const loginDto = { email: 'test@example.com', password: 'Password1' };
      authService.login.mockResolvedValue(mockAuthResponse);

      const result = await controller.login(loginDto);

      expect(authService.login).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual(mockAuthResponse);
    });
  });

  describe('me', () => {
    it('should return current user from request (no password)', () => {
      const req = {
        user: {
          id: 'user-1',
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          role: Role.ADMIN,
          password: 'hashed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      } as AuthenticatedRequest;

      const result = controller.me(req);

      expect(result).toEqual({
        id: 'user-1',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        role: Role.ADMIN,
      });
      expect(result).not.toHaveProperty('password');
    });
  });
});
