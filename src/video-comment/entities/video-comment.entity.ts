import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Video } from './Video';

@Entity()
export class VideoComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Video)
  video: Video;

  @Column()
  comment: string;

  @CreateDateColumn()
  createdAt: Date;
}
