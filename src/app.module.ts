import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { CommonServicesModule } from './common/common-services/common-services.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { JwtModule } from './jwt/jwt.module';
import { ManualModule } from './manual/manual.module';
import { UsersModule } from './users/users.module';
import { VideoInteractionModule } from './video-interaction/video-interaction.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    HealthModule,
    AuthModule,
    VideoModule,
    DatabaseModule,
    JwtModule,
    CommonServicesModule,
    ManualModule,
    VideoInteractionModule,
  ],
})
export class AppModule {}
