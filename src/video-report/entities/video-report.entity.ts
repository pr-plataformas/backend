import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Video } from '../../video/entities/video.entity';
import { VideoReportStatus } from 'src/common/enums/video-report-status.enum';

@Entity('video_reports')
export class VideoReport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Video)
  video: Video;

  @Column()
  reason: string;

  @Column({
    type: 'enum',
    enum: VideoReportStatus,
    default: VideoReportStatus.PENDING,
  })
  status: VideoReportStatus; // pending, reviewed, rejected, etc.

  @CreateDateColumn()
  createdAt: Date;
}
