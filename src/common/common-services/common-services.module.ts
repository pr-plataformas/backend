import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { S3Service } from '../services/s3/s3.service';

@Module({
  imports: [ConfigModule],
  providers: [S3Service],
  exports: [S3Service],
})
export class CommonServicesModule {}
