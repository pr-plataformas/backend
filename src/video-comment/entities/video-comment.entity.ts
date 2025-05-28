import { User } from 'src/users/entities/user.entity';
import { Video } from 'src/video/entities/video.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('video_comments')
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
