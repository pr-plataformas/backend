import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from '../../config/config';
import { ClientProxyApp } from './client-proxy';

@Module({
  imports: [ConfigModule.forFeature(config)],
  providers: [ClientProxyApp],
  exports: [ClientProxyApp],
})
export class ProxyModule {}
