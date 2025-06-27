import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateVideoBookmarkDto } from './dto/create-video-bookmark.dto';
import { UpdateVideoBookmarkDto } from './dto/update-video-bookmark.dto';
import { VideoBookmarkService } from './video-bookmark.service';

@Controller('video-bookmarks')
@UseGuards(JwtAuthGuard)
export class VideoBookmarkController {
  constructor(private readonly service: VideoBookmarkService) {}

  @Post()
  create(@Body() dto: CreateVideoBookmarkDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVideoBookmarkDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
