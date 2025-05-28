import { IsInt, IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateVideoCommentDto {
  @IsInt()
  @IsNotEmpty()
  user: number;

  @IsInt()
  @IsNotEmpty()
  video: number;

  @IsString()
  @MaxLength(1000)
  @IsNotEmpty()
  comment: string;
}
