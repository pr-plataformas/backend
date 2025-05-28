import { IsInt, IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateVideoCommentDto {
  @IsInt()
  @IsNotEmpty()
  userId: string;

  @IsInt()
  @IsNotEmpty()
  videoId: string;

  @IsString()
  @MaxLength(1000)
  @IsNotEmpty()
  comment: string;
}
