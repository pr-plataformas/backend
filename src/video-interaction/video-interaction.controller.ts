import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { VideoInteractionService } from './video-interaction.service';
import { CreateVideoInteractionDto } from './dto/create-video-interaction.dto';
import { UpdateVideoInteractionDto } from './dto/update-video-interaction.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('video-interactions')
@Controller('video-interactions')
export class VideoInteractionController {
  constructor(private readonly service: VideoInteractionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear interacción de video' })
  @ApiResponse({ status: 201, description: 'Interacción de video creada.' })
  async create(@Body() createDto: CreateVideoInteractionDto) {
    try {
      const data = await this.service.create(createDto);
      return {
        message: 'Interacción de video creada',
        status: HttpStatus.CREATED,
        data,
      };
    } catch (error) {
      return {
        message: error.message || 'Error al crear la interacción de video',
        status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
      };
    }
  }

  @Get()
  @ApiOperation({ summary: 'Listar interacciones de video' })
  @ApiResponse({ status: 200, description: 'Lista de interacciones de video.' })
  async findAll() {
    try {
      const data = await this.service.findAll();
      return {
        message: 'Lista de interacciones de video',
        status: HttpStatus.OK,
        data,
      };
    } catch (error) {
      return {
        message: error.message || 'Error al listar interacciones de video',
        status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
      };
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener interacción de video por id' })
  @ApiResponse({ status: 200, description: 'Interacción de video encontrada.' })
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.service.findOne(id);
      return {
        message: 'Interacción de video encontrada',
        status: HttpStatus.OK,
        data,
      };
    } catch (error) {
      return {
        message: error.message || 'Error al buscar la interacción de video',
        status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
      };
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar interacción de video' })
  @ApiResponse({
    status: 200,
    description: 'Interacción de video actualizada.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateVideoInteractionDto,
  ) {
    try {
      const data = await this.service.update(id, updateDto);
      return {
        message: 'Interacción de video actualizada',
        status: HttpStatus.OK,
        data,
      };
    } catch (error) {
      return {
        message: error.message || 'Error al actualizar la interacción de video',
        status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
      };
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar interacción de video' })
  @ApiResponse({ status: 200, description: 'Interacción de video eliminada.' })
  async remove(@Param('id') id: string) {
    try {
      const data = await this.service.remove(id);
      return {
        message: 'Interacción de video eliminada',
        status: HttpStatus.OK,
        data,
      };
    } catch (error) {
      return {
        message: error.message || 'Error al eliminar la interacción de video',
        status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
      };
    }
  }
}
