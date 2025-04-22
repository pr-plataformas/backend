import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { UsersModule } from './users/users.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { VideoModule } from './video/video.module';
import { ContentModule } from './content/content.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from './jwt/jwt.module';
import { CommonServicesModule } from './common/common-services/common-services.module';
import { ManualModule } from './manual/manual.module';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    HealthModule,
    AuthModule,
    VideoModule,
    ContentModule,
    DatabaseModule,
    JwtModule,
    CommonServicesModule,
    ManualModule,

  ],
})
export class AppModule {}
