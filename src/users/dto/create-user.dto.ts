import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { UserRole } from '../../common/constants';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  fullName: string;

  @IsNotEmpty()
  @IsString()
  role: string;
}
