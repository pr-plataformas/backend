import { config } from 'dotenv';
import { VideoBookmark } from 'src/video-bookmark/entities/video-bookmark.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Block } from '../manual/entities/block.entity';
import { Manual } from '../manual/entities/manual.entity';
import { Section } from '../manual/entities/section.entity';
import { Subsection } from '../manual/entities/subsection.entity';
import { User } from '../users/entities/user.entity';
import { VideoComment } from '../video-comment/entities/video-comment.entity';
import { VideoInteraction } from '../video-interaction/entities/video-interaction.entity';
import { VideoReport } from '../video-report/entities/video-report.entity';
import { Video } from '../video/entities/video.entity';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'clinic_hub_db',
  logging: true,
  synchronize: true,
  migrationsRun: true,
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  entities: [
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
  ],
};

export const connectionSource = new DataSource(dataSourceOptions);
