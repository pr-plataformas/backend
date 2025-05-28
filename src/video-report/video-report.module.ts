import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoReport } from './entities/video-report.entity';
import { VideoReportService } from './video-report.service';
import { VideoReportController } from './video-report.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VideoReport])],
  providers: [VideoReportService],
  controllers: [VideoReportController],
  exports: [VideoReportService],
})
export class VideoReportModule {}
