import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BookmarkType } from '../../common/enums/video-interaction.enums';
import { Video } from '../../video/entities/video.entity';

@Entity()
export class VideoBookmark {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Video)
  video: Video;

  @Column({ type: 'enum', enum: BookmarkType })
  bookmarkType: BookmarkType;

  @Column({ nullable: true })
  note?: string;

  @Column({ type: 'float', nullable: true })
  position?: number;

  @CreateDateColumn()
  createdAt: Date;
}
