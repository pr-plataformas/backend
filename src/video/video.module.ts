import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { CommonServicesModule } from 'src/common/common-services/common-services.module';
import { VideoStorageService } from './video-storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([Video]), CommonServicesModule],
  controllers: [VideoController],
  providers: [VideoService, VideoStorageService],
})
export class VideoModule {}
