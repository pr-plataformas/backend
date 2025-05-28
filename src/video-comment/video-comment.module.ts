import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoComment } from './entities/video-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VideoComment])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class VideoCommentModule {}
