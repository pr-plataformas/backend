import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../user/entities/user.entity';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'users_db',
  logging: true,
  synchronize: false,
  migrationsRun: true,
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  entities: [User],
};

export const connectionSource = new DataSource(dataSourceOptions);
