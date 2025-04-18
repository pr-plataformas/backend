import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Video } from '../video/entities/video.entity';
import { Category } from '../category/entities/category.entity';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pollopollo',
  database: 'users_db',
  logging: true,
  synchronize: false,
  migrationsRun: true,
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  entities: [User, Video,Category],
};

export const connectionSource = new DataSource(dataSourceOptions);
