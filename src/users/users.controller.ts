import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { ApiResponse as ResponseType } from 'src/common/types/ApiResponse.interface';

@UseGuards(JwtAuthGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  @ApiResponse({ status: 200, description: 'Perfil del usuario autenticado.' })
  getProfile(@Req() req): ResponseType<User> {
    try {
      const user = req.user; // El guard ya adjuntó el usuario autenticado
      return {
        message: 'Perfil del usuario obtenido exitosamente',
        statusCode: 200,
        data: user,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        message: error.message || 'Error obteniendo el perfil del usuario',
        data: null,
      };
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de usuarios.' })
  async findAll(): Promise<ResponseType<User[]>> {
    try {
      const users = await this.usersService.findAll();
      return {
        statusCode: 200,
        message: 'Usuarios obtenidos exitosamente',
        data: users,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        message: error.message || 'Error obteniendo la lista de usuarios',
        data: null,
      };
    }
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Usuario por id.' })
  async findOne(@Param('id') id: string): Promise<ResponseType<User>> {
    try {
      const user = await this.usersService.findById(id);
      if (!user) {
        return {
          statusCode: 200,
          message: 'Usuario no encontrado',
          data: null,
        };
      }
      return {
        statusCode: 200,
        message: 'Usuario obtenido exitosamente',
        data: user,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        message: error.message || 'Error obteniendo el usuario',
        data: null,
      };
    }
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Usuario creado.' })
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseType<User>> {
    try {
      const newUser = await this.usersService.createUser(createUserDto);
      return {
        message: 'Usuario creado exitosamente',
        statusCode: 201,
        data: newUser,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        message: error.message || 'Error creando el usuario',
        data: null,
      };
    }
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Usuario actualizado.' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseType<User>> {
    try {
      const updatedUser = await this.usersService.updateUser(id, updateUserDto);
      if (!updatedUser) {
        return {
          statusCode: 200,
          message: 'Usuario no encontrado',
          data: null,
        };
      }
      return {
        message: 'Usuario actualizado exitosamente',
        statusCode: 200,
        data: updatedUser,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        message: error.message || 'Error actualizando el usuario',
        data: null,
      };
    }
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Usuario eliminado.' })
  async remove(@Param('id') id: string): Promise<ResponseType<User>> {
    try {
      const deletedUser = await this.usersService.deleteUser(id);
      if (!deletedUser) {
        return {
          statusCode: 200,
          message: 'Usuario no encontrado',
          data: null,
        };
      }
      return {
        message: 'Usuario eliminado exitosamente',
        statusCode: 200,
        data: deletedUser,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        message: error.message || 'Error eliminando el usuario',
        data: null,
      };
    }
  }
}
