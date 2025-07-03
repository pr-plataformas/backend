import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiResponse } from 'src/common/types/ApiResponse.interface';
import { S3Service } from '../s3/s3.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';
import { VideoService } from './video.service';

@ApiTags('videos')
@UseGuards(JwtAuthGuard)
@Controller('videos')
export class VideoController {
  constructor(
    private readonly videoService: VideoService,
    private readonly s3Service: S3Service,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1024 * 1024 * 2000, // 2GB límite máximo
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        title: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
      },
    },
  })
  async uploadVideo(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2000 }), // 2GB
          new FileTypeValidator({ fileType: 'video/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() createVideoDto: CreateVideoDto,
  ): Promise<ApiResponse<Video>> {
    try {
      const video = await this.videoService.upload(file, createVideoDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Video subido exitosamente',
        data: video,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Error al subir el video',
        data: null,
      };
    }
  }

  @Get()
<<<<<<< HEAD
  async findAll(): Promise<ApiResponse<Video[]>> {
=======
  async findAll() {
>>>>>>> 95cbfbb9b490ec5e9ddb509fa33ba2aa670785df
    try {
      const videos = await this.videoService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Videos obtenidos exitosamente',
        data: videos,
<<<<<<< HEAD
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Error al obtener los videos',
        data: null,
      };
    }
=======
        meta: {
          total: videos.length,
          timestamp: new Date().toISOString(),
          description: 'Videos educativos que muestran cómo realizar procedimientos correctamente',
          features: [
            'Streaming de alta calidad',
            'Sistema de comentarios',
            'Interacciones (like/dislike)',
            'Marcadores personales',
            'Sistema de reportes'
          ],
          capabilities: {
            streaming: 'Habilitado',
            comments: 'Sistema completo',
            interactions: 'Like/Dislike disponible',
            bookmarks: 'Marcadores personales',
            reports: 'Sistema de reportes activo'
          }
        }
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Error obteniendo videos',
        data: null,
        meta: {
          total: 0,
          timestamp: new Date().toISOString(),
          error: true
        }
      };
    }
  }

  @Get('bucket-list')
  async listBucketVideos() {
    const files = await this.s3Service.listVideos();
    return {
      statusCode: 200,
      data: files,
    };
  }

  @Get('bucket-list-urls')
  async listBucketVideoUrls() {
    const keys = await this.s3Service.listVideos();
    const urls = keys.map((key) => this.s3Service.getFileUrl(key));
    return {
      statusCode: 200,
      data: urls,
    };
>>>>>>> 95cbfbb9b490ec5e9ddb509fa33ba2aa670785df
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<Video>> {
    try {
      const video = await this.videoService.findOne(id);
      if (!video) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Video no encontrado',
          data: null,
        };
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Video obtenido exitosamente',
        data: video,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Error al obtener el video',
        data: null,
      };
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVideoDto: UpdateVideoDto,
  ): Promise<ApiResponse<Video>> {
    try {
      const updatedVideo = await this.videoService.update(id, updateVideoDto);
      if (!updatedVideo) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Video no encontrado',
          data: null,
        };
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Video actualizado exitosamente',
        data: updatedVideo,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Error al actualizar el video',
        data: null,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    try {
      const deletedVideo = await this.videoService.remove(id);
      if (!deletedVideo) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Video no encontrado',
          data: null,
        };
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Video eliminado exitosamente',
        data: null,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Error al eliminar el video',
        data: null,
      };
    }
  }
}
