import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVideoDto {
  @ApiProperty({
    description: 'Título del video',
    example: 'Procedimiento de enfermería: Lavado de manos',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Descripción del video',
    example:
      'Este video muestra el procedimiento correcto para el lavado de manos clínico',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
