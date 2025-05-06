import {
  IsString,
  IsArray,
  IsOptional,
  IsEnum,
  IsInt,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBlockDto {
  @IsEnum(['text', 'video'])
  type: 'text' | 'video';

  @IsString()
  content: string;

  @IsInt()
  order: number;
}

export class CreateSubsectionDto {
  @IsString()
  title: string;

  @IsInt()
  order: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBlockDto)
  blocks?: CreateBlockDto[];
}

export class CreateSectionDto {
  @IsString()
  title: string;

  @IsInt()
  order: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubsectionDto)
  subsections?: CreateSubsectionDto[];
}

export class CreateFullManualDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSectionDto)
  sections?: CreateSectionDto[];
}
