import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse as SwaggerApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateVideoInteractionDto } from './dto/create-video-interaction.dto';
import { UpdateVideoInteractionDto } from './dto/update-video-interaction.dto';
import { VideoInteractionService } from './video-interaction.service';
import { ApiResponse } from 'src/common/types/ApiResponse.interface';

@ApiTags('video-interactions')
@UseGuards(JwtAuthGuard)
@Controller('video-interactions')
export class VideoInteractionController {
  constructor(private readonly service: VideoInteractionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear interacción de video' })
  @SwaggerApiResponse({ status: 201, description: 'Interacción de video creada.' })
  async create(@Body() createDto: CreateVideoInteractionDto): Promise<ApiResponse<any>> {
    try {
      const data = await this.service.create(createDto);
      return {
        message: 'Interacción de video creada',
        statusCode: HttpStatus.CREATED,
        data,
      };
    } catch (error) {
      return {
        message: error.message || 'Error al crear la interacción de video',
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
      };
    }
  }

  @Get()
  @ApiOperation({ summary: 'Listar interacciones de video' })
  @SwaggerApiResponse({ status: 200, description: 'Lista de interacciones de video.' })
  async findAll(): Promise<ApiResponse<any[]>> {
    try {
      const data = await this.service.findAll();
      return {
        message: 'Lista de interacciones de video',
        statusCode: HttpStatus.OK,
        data,
      };
    } catch (error) {
      return {
        message: error.message || 'Error al listar interacciones de video',
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
      };
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener interacción de video por id' })
  @SwaggerApiResponse({ status: 200, description: 'Interacción de video encontrada.' })
  async findOne(@Param('id') id: string): Promise<ApiResponse<any>> {
    try {
      const data = await this.service.findOne(id);
      if (!data) {
        return {
          message: 'Interacción de video no encontrada',
          statusCode: HttpStatus.OK,
          data: null,
        };
      }
      return {
        message: 'Interacción de video encontrada',
        statusCode: HttpStatus.OK,
        data,
      };
    } catch (error) {
      return {
        message: error.message || 'Error al buscar la interacción de video',
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
      };
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar interacción de video' })
  @SwaggerApiResponse({ status: 200, description: 'Interacción de video actualizada.' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateVideoInteractionDto,
  ): Promise<ApiResponse<any>> {
    try {
      const data = await this.service.update(id, updateDto);
      return {
        message: 'Interacción de video actualizada',
        statusCode: HttpStatus.OK,
        data,
      };
    } catch (error) {
      return {
        message: error.message || 'Error al actualizar la interacción de video',
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
      };
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar interacción de video' })
  @SwaggerApiResponse({ status: 200, description: 'Interacción de video eliminada.' })
  async remove(@Param('id') id: string): Promise<ApiResponse<any>> {
    try {
      const data = await this.service.remove(id);
      return {
        message: 'Interacción de video eliminada',
        statusCode: HttpStatus.OK,
        data,
      };
    } catch (error) {
      return {
        message: error.message || 'Error al eliminar la interacción de video',
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
      };
    }
  }
}
