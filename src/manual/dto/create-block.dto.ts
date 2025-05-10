import { IsEnum, IsNotEmpty, IsString, IsUUID, IsInt } from 'class-validator';

export class CreateBlockDto {
  @IsEnum(['text', 'video'])
  type: 'text' | 'video';

  @IsString()
  content: string;

  @IsInt()
  order: number;

  @IsUUID()
  subsectionId: string;
}
