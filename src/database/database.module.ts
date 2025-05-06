import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../config/config';
import { User } from '../users/entities/user.entity';
import { Video } from '../video/entities/video.entity';

import { Manual } from '../manual/entities/manual.entity';
import { Section } from '../manual/entities/section.entity';
import { Subsection } from '../manual/entities/subsection.entity';
import { Block } from '../manual/entities/block.entity';
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbName, host, password, port, user } = configService.postgres;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: dbName,
          autoLoadEntities: true,
          migrationsRun: true,
          synchronize: true,

        };
      },
    }),
    TypeOrmModule.forFeature([
      User,
      Video,
      Manual,
      Section,
      Subsection,
      Block,
    ]),  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
