import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Video } from '../../video/entities/video.entity';
import { VideoInteractionType } from 'src/common/enums/video-interaction-type.enum';

@Entity()
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

  @Column({ nullable: true })
  reportReason?: string;

  @CreateDateColumn()
  createdAt: Date;
}
