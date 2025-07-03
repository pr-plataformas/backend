import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Headers,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideoService } from './video.service';
import { S3Service } from '../s3/s3.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('videos')
// @UseGuards(JwtAuthGuard)
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
  ) {
    const video = await this.videoService.upload(file, createVideoDto);
    return {
      statusCode: 201,
      message: 'Video uploaded successfully',
      data: video,
    };
  }

  @Get()
  async findAll() {
    try {
      const videos = await this.videoService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Videos obtenidos exitosamente',
        data: videos,
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
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const video = await this.videoService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      data: video,
    };
  }

  @Get(':id/stream')
  async streamVideo(
    @Param('id') id: string,
    @Headers('range') range?: string,
    @Res() res?: Response,
  ) {
    const { stream, contentLength, contentRange, contentType, statusCode } =
      await this.videoService.getVideoStream(id, range);

    res.status(statusCode);
    res.set({
      'Content-Type': contentType,
      'Content-Length': contentLength.toString(),
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-cache',
    });

    if (contentRange) {
      res.set('Content-Range', contentRange);
    }

    stream.pipe(res);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVideoDto: UpdateVideoDto,
  ) {
    const video = await this.videoService.update(id, updateVideoDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Video actualizado exitosamente',
      data: video,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.videoService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Video eliminado exitosamente',
    };
  }
}
