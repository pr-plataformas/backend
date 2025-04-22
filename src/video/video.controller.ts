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
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideoService } from './video.service';

@ApiTags('videos')
@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

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
    const videos = await this.videoService.findAll();
    return {
      statusCode: HttpStatus.OK,
      data: videos,
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
  async streamVideo(@Param('id') id: string, @Res() res: Response) {
    const videoData = await this.videoService.getVideoStream(id);

    // Configurar cabeceras para streaming
    res.set({
      'Content-Type': videoData.contentType,
      'Content-Disposition': 'inline',
      'Accept-Ranges': 'bytes',
    });

    res.send(videoData.buffer);
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
