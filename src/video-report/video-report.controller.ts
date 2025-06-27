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
import { CreateVideoReportDto } from './dto/create-video-report.dto';
import { VideoReportService } from './video-report.service';

@UseGuards(JwtAuthGuard)
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
