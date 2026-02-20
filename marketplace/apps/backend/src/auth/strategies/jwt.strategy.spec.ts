import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '../../generated/prisma/client';
import { AuthService } from '../auth.service';
import { JwtStrategy } from './jwt.strategy';

const mockUser = {
  id: 'user-1',
  email: 'test@example.com',
  password: 'hashed',
  firstName: 'Test',
  lastName: 'User',
  role: Role.CUSTOMER,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: AuthService,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
    authService = module.get(AuthService) as jest.Mocked<AuthService>;
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('validate', () => {
    const payload = { sub: 'user-1', email: 'test@example.com' };

    it('should return user when found', async () => {
      authService.findById.mockResolvedValue(mockUser as never);

      const result = await strategy.validate(payload);

      expect(authService.findById).toHaveBeenCalledWith('user-1');
      expect(result).toEqual(mockUser);
    });

    it('should throw UnauthorizedException when user not found', async () => {
      authService.findById.mockResolvedValue(null as never);

      await expect(strategy.validate(payload)).rejects.toThrow(
        UnauthorizedException
      );
      expect(authService.findById).toHaveBeenCalledWith('user-1');
    });
  });
});
