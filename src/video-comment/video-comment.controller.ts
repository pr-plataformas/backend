import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { VideoCommentService } from './video-comment.service';
import { VideoComment } from './entities/video-comment.entity';
import { CreateVideoCommentDto } from './dto/create-video-comment.dto';
import { UpdateVideoCommentDto } from './dto/update-video-comment.dto';

@Controller('video-comments')
export class VideoCommentController {
  constructor(private readonly service: VideoCommentService) {}

  @Post()
  create(@Body() dto: CreateVideoCommentDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVideoCommentDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
