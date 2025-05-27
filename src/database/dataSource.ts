import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Video } from '../video/entities/video.entity';
<<<<<<< HEAD
=======
import { Category } from '../category/entities/category.entity';

>>>>>>> fusion
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
<<<<<<< HEAD
  password: 'contrasena',
=======
  password: 'pollopollo',
>>>>>>> fusion
  database: 'users_db',
  logging: true,
  synchronize: true,
  migrationsRun: true,
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
<<<<<<< HEAD
  entities: [User, Video, Manual, Section, Subsection, Block], 
=======
  entities: [User, Video,Category, Manual, Section, Subsection, Block], 
>>>>>>> fusion
};

export const connectionSource = new DataSource(dataSourceOptions);
