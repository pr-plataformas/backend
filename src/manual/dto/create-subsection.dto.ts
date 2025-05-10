import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSubsectionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsUUID()
  sectionId: string;
}
