import { IsString, IsUUID, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateVideoReportDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  videoId: string;

  @IsString()
  @IsNotEmpty()
  reason: string;
}
