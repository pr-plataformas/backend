import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, QueryFailedError, Repository } from 'typeorm';
import { UserRole } from '../common/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const newUser = this.usersRepository.create(createUserDto);
      return await this.usersRepository.save(newUser);
    } catch (error) {
      console.log(error);
      this.logger.error(error.message, error.stack);
      if (error instanceof QueryFailedError) {
        const pgError = error as any;
        switch (pgError.code) {
          case '23505':
            throw new RpcException({
              statusCode: HttpStatus.CONFLICT,
              message: 'El usuario ya está creado',
            });
          case '23502':
            throw new RpcException({
              statusCode: HttpStatus.BAD_REQUEST,
              message: 'No se permiten valores nulos',
            });
          case '22P02':
            throw new RpcException({
              statusCode: HttpStatus.BAD_REQUEST,
              message: `Error de formato en los datos: ${error.message}`,
            });
        }
      }
      throw new RpcException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error al crear el usuario: ${error.message}`,
      });
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const foundUsers = await this.usersRepository.find();
      if (foundUsers.length === 0) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No se encontraron usuarios',
        });
      }
      return foundUsers;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof RpcException) throw error;

      throw new RpcException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error desconocido al buscar usuarios: ${error.message}`,
      });
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id, deletedAt: IsNull() },
      });

      console.log('user', user);

      if (!user) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `Usuario #${id} no encontrado`,
        });
      }
      return user;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof RpcException) throw error;

      throw new RpcException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error desconocido al buscar el usuario: ${error.message}`,
      });
    }
  }

  async findUsersByRole(role: UserRole): Promise<User[]> {
    try {
      const users = await this.usersRepository.find({
        where: { role, deletedAt: IsNull() },
      });
      if (users.length === 0) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `No se encontraron usuarios con el rol ${role}`,
        });
      }
      return users;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof RpcException) throw error;

      throw new RpcException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error desconocido al buscar usuarios por rol: ${error.message}`,
      });
    }
  }

  async update(id: string, updateUserInput: UpdateUserDto): Promise<User> {
    try {
      const user = await this.usersRepository.preload({
        id,
        ...updateUserInput,
      });
      if (!user) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `Usuario #${id} no encontrado`,
        });
      }
      return this.usersRepository.save(user);
    } catch (error) {
      console.log(error);
      this.logger.error(error.message, error.stack);
      if (error instanceof QueryFailedError) {
        const pgError = error as any;
        switch (pgError.code) {
          case '23505':
            throw new RpcException({
              statusCode: HttpStatus.CONFLICT,
              message: 'El usuario ya está creado',
            });
          case '23502':
            throw new RpcException({
              statusCode: HttpStatus.BAD_REQUEST,
              message: 'No se permiten valores nulos',
            });
          case '22P02':
            throw new RpcException({
              statusCode: HttpStatus.BAD_REQUEST,
              message: `Error de formato en los datos: ${error.message}`,
            });
        }
      }
      throw new RpcException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error desconocido al actualizar el usuario: ${error.message}`,
      });
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id, deletedAt: IsNull() },
      });
      if (!user) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `Usuario #${id} no encontrado`,
        });
      }
      await this.usersRepository.softDelete(id);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      if (error instanceof RpcException) throw error;

      throw new RpcException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error desconocido al eliminar el usuario: ${error.message}`,
      });
    }
  }
}
