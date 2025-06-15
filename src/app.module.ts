import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { JwtModule } from './jwt/jwt.module';
import { ManualModule } from './manual/manual.module';
import { UsersModule } from './users/users.module';
import { VideoBookmarkModule } from './video-bookmark/video-bookmark.module';
import { VideoCommentModule } from './video-comment/video-comment.module';
import { VideoInteractionModule } from './video-interaction/video-interaction.module';
import { VideoReportModule } from './video-report/video-report.module';
import { VideoModule } from './video/video.module';
import { FirebaseModule } from './firebase/firebase.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    //Set up modules
    ConfigModule,
    HealthModule,
    DatabaseModule,
    S3Module,
    JwtModule,
    FirebaseModule,
    //Feature modules
    UsersModule,
    AuthModule,
    VideoModule,
    ManualModule,
    VideoInteractionModule,
    VideoCommentModule,
    VideoReportModule,
    VideoBookmarkModule,
    S3Module,
  ],
})
export class AppModule {}
