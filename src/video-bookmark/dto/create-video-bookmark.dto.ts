import {
  IsUUID,
  IsString,
  MaxLength,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { BookmarkType } from '../../common/enums/video-interaction.enums';

export class CreateVideoBookmarkDto {
  @IsUUID()
  @IsNotEmpty()
  user: string;

  @IsUUID()
  @IsNotEmpty()
  video: string;

  @IsEnum(BookmarkType)
  @IsNotEmpty()
  bookmarkType: BookmarkType;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  note: string;

  @IsNotEmpty()
  position: number;
}
