import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Video } from '../../video/entities/video.entity';
import { VideoInteractionType } from '../enum/video-interaction.enums';

@Entity('video_interactions')
export class VideoInteraction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Video)
  video: Video;

  @Column({
    type: 'enum',
    enum: VideoInteractionType,
  })
  type: VideoInteractionType;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
