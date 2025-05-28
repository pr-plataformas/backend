import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { VideoReportService } from './video-report.service';
import { CreateVideoReportDto } from './dto/create-video-report.dto';

@Controller('video-reports')
export class VideoReportController {
  constructor(private readonly videoReportService: VideoReportService) {}

  @Post()
  create(@Body() createDto: CreateVideoReportDto) {
    return this.videoReportService.create(createDto);
  }

  @Get()
  findAll() {
    return this.videoReportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoReportService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: Partial<CreateVideoReportDto>,
  ) {
    return this.videoReportService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoReportService.remove(id);
  }
}
