import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtService } from 'src/jwt/jwt.service';
import { Test, TestingModule } from '@nestjs/testing';
import config from 'src/config/config';
import { RegisterUserDto } from './dto/auth.dto';
import { ConflictException } from '@nestjs/common';

describe('AuthService', () => {
  let service;
});
describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const configServiceMock = {
      jwt: {
        secret: 'test-secret',
        expiresIn: '1h',
        refreshSecret: 'test-refresh-secret',
        refreshExpiresIn: '7d',
      },
    };

    usersService = {
      findByEmail: jest.fn(),
      createUser: jest.fn(),
    } as unknown as jest.Mocked<UsersService>;

    jwtService = {
      signAsync: jest.fn(),
    } as unknown as jest.Mocked<JwtService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: config.KEY,
          useValue: configServiceMock,
        },
        {
          provide: UsersService,
          useValue: usersService,
        },
        {
          provide: JwtService,
          useValue: jwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

    // Spy on the hashPassword method
    jest
      .spyOn(service, 'hashPassword')
      .mockImplementation(async (password) => `hashed_${password}`);
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      // Arrange
      const registerDto: RegisterUserDto = {
        email: 'test@example.com',
        password: 'password123',
        fullName: 'John Doe',
      };

      const expectedUser = {
        id: 1,
        email: 'test@example.com',
        fullName: 'John Doe',
        password: 'hashed_password123',
      };

      usersService.findByEmail.mockResolvedValue(null);
      usersService.createUser.mockResolvedValue(expectedUser);

      // Act
      const result = await service.register(registerDto);

      // Assert
      expect(usersService.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(service.hashPassword).toHaveBeenCalledWith('password123');
      expect(usersService.createUser).toHaveBeenCalledWith({
        ...registerDto,
        password: 'hashed_password123',
      });
      expect(result).toEqual(expectedUser);
    });

    it('should throw ConflictException when user already exists', async () => {
      // Arrange
      const registerDto: RegisterUserDto = {
        email: 'existing@example.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Doe',
      };

      const existingUser = {
        id: 2,
        email: 'existing@example.com',
        firstName: 'Jane',
        lastName: 'Doe',
      };

      usersService.findByEmail.mockResolvedValue(existingUser);

      // Act & Assert
      await expect(service.register(registerDto)).rejects.toThrow(
        ConflictException,
      );
      expect(usersService.findByEmail).toHaveBeenCalledWith(
        'existing@example.com',
      );
      expect(usersService.createUser).not.toHaveBeenCalled();
    });

    it('should propagate errors from usersService.findByEmail', async () => {
      // Arrange
      const registerDto: RegisterUserDto = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
      };

      const mockError = new Error('Database error');
      usersService.findByEmail.mockRejectedValue(mockError);

      // Act & Assert
      await expect(service.register(registerDto)).rejects.toThrow(mockError);
    });

    it('should propagate errors from usersService.createUser', async () => {
      // Arrange
      const registerDto: RegisterUserDto = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
      };

      const mockError = new Error('Creation error');
      usersService.findByEmail.mockResolvedValue(null);
      usersService.createUser.mockRejectedValue(mockError);

      // Act & Assert
      await expect(service.register(registerDto)).rejects.toThrow(mockError);
    });
  });
});
