import { VideoInteractionType } from '../../common/enums/video-interaction-type.enum';

export class UpdateVideoInteractionDto {
  type?: VideoInteractionType;
  reportReason?: string;
}
