import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Video } from '../video/entities/video.entity';
import { Manual } from '../manual/entities/manual.entity';
import { Section } from '../manual/entities/section.entity';
import { Subsection } from '../manual/entities/subsection.entity';
import { Block } from '../manual/entities/block.entity';
config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'contrasena',
  database: 'users_db',
  logging: true,
  synchronize: true,
  migrationsRun: true,
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  entities: [User, Video, Manual, Section, Subsection, Block], 
};

export const connectionSource = new DataSource(dataSourceOptions);
