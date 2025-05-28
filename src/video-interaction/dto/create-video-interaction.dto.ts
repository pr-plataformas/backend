import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { VideoInteractionType } from '../../common/enums/video-interaction-type.enum';

export class CreateVideoInteractionDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  videoId: string;

  @IsEnum(VideoInteractionType)
  @IsNotEmpty()
  type: VideoInteractionType;
}
