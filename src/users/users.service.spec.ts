import { RpcException } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from '../common/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        fullName: 'John Doe',
        role: UserRole.ADMINISTRATIVO_DE_OBRA,
      };
      const user = new User();
      user.id = '1';
      user.fullName = 'John Doe';
      user.role = UserRole.ADMINISTRATIVO_DE_OBRA;

      jest.spyOn(repository, 'create').mockReturnValue(user);
      jest.spyOn(repository, 'save').mockResolvedValue(user);

      expect(await service.createUser(createUserDto)).toEqual(user);
    });

    it('should throw an error if email is already in use', async () => {
      const createUserDto: CreateUserDto = {
        fullName: 'John Doe',
        role: UserRole.ADMINISTRATIVO_DE_OBRA,
      };
      const error = new Error();
      (error as any).code = '23505';

      jest.spyOn(repository, 'save').mockRejectedValue(error);

      await expect(service.createUser(createUserDto)).rejects.toThrow(
        RpcException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const user = new User();
      user.id = '1';
      user.fullName = 'John Doe';
      user.role = UserRole.ADMINISTRATIVO_DE_OBRA;

      jest.spyOn(repository, 'find').mockResolvedValue([user]);

      expect(await service.findAll()).toEqual([user]);
    });

    it('should throw an error if no users are found', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(service.findAll()).rejects.toThrow(RpcException);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = new User();
      user.id = '1';
      user.fullName = 'John Doe';
      user.role = UserRole.ADMINISTRATIVO_DE_OBRA;

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      expect(await service.findOne('1')).toEqual(user);
    });

    it('should throw an error if user is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(RpcException);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {
        fullName: 'John Doe',
        role: UserRole.ADMINISTRATIVO_DE_OBRA,
      };
      const user = new User();
      user.id = '1';
      user.fullName = 'John Doe';
      user.role = UserRole.ADMINISTRATIVO_DE_OBRA;

      jest.spyOn(repository, 'preload').mockResolvedValue(user);
      jest.spyOn(repository, 'save').mockResolvedValue(user);

      expect(await service.update('1', updateUserDto)).toEqual(user);
    });

    it('should throw an error if user is not found', async () => {
      const updateUserDto: UpdateUserDto = {
        fullName: 'John Doe',
        role: UserRole.ADMINISTRATIVO_DE_OBRA,
      };

      jest.spyOn(repository, 'preload').mockResolvedValue(null);

      await expect(service.update('1', updateUserDto)).rejects.toThrow(
        RpcException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const user = new User();
      user.id = '1';
      user.fullName = 'John Doe';
      user.role = UserRole.ADMINISTRATIVO_DE_OBRA;

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);
      jest.spyOn(repository, 'softDelete').mockResolvedValue(undefined);

      await service.remove('1');
      expect(repository.softDelete).toHaveBeenCalledWith('1');
    });

    it('should throw an error if user is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.remove('1')).rejects.toThrow(RpcException);
    });
  });
});
