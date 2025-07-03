import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../config/config';
import { envConfig } from '../config/env.config';
import { User } from '../users/entities/user.entity';
import { Video } from '../video/entities/video.entity';

import { Manual } from '../manual/entities/manual.entity';
import { Section } from '../manual/entities/section.entity';
import { Subsection } from '../manual/entities/subsection.entity';
import { Block } from '../manual/entities/block.entity';
import { VideoComment } from '../video-comment/entities/video-comment.entity';
import { VideoInteraction } from '../video-interaction/entities/video-interaction.entity';
import { VideoReport } from '../video-report/entities/video-report.entity';
import { VideoBookmark } from '../video-bookmark/entities/video-bookmark.entity';
import { Category } from '../category/entities/category.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        // Configuración hardcodeada para evitar problemas de codificación
        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'anashei',
          database: 'users_db',
          autoLoadEntities: true,
          migrationsRun: false,
          synchronize: false, // Desactivado - BD ya sincronizada
          logging: process.env.NODE_ENV !== 'production',
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
      VideoComment,
      VideoInteraction,
      VideoReport,
      VideoBookmark,
      Category,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
