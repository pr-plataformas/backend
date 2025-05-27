import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { UsersModule } from './users/users.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { VideoModule } from './video/video.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from './jwt/jwt.module';
import { CommonServicesModule } from './common/common-services/common-services.module';
<<<<<<< HEAD
=======
import { CategoryModule } from './category/category.module';
>>>>>>> fusion
import { ManualModule } from './manual/manual.module';

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
<<<<<<< HEAD
    ManualModule,
=======
    CategoryModule,
    ManualModule,

>>>>>>> fusion
  ],
})
export class AppModule {}
