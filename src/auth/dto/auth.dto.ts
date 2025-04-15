import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  fullName: string;

  @ApiProperty({
    examples: [
      {
        email: 'email@example.com',
      },
    ],
    description: 'The email of the user',
  })
  @IsEmail({}, { message: 'email must be a valid email' })
  @IsNotEmpty({ always: true, message: 'email is required' })
  readonly email: string;

  @ApiProperty({
    examples: [
      {
        name: 'Password',
      },
    ],
    description: 'The password of the user',
  })
  @IsString({ message: 'password must be a string' })
  @MinLength(8, { message: 'password is too short' })
  @MaxLength(32, { message: 'password is too long' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un carácter especial (@$!%*?&).',
    },
  )
  @IsNotEmpty({ always: true })
  readonly password: string;
}

export class LoginUserDto {
  @ApiProperty({
    examples: [
      {
        email: 'email@example.com',
      },
    ],
    description: 'The email of the user',
  })
  @IsEmail({}, { message: 'email must be a valid email' })
  @IsNotEmpty({ always: true, message: 'email is required' })
  readonly email: string;

  @ApiProperty({
    examples: [
      {
        password: 'password',
      },
    ],
    description: 'The password of the user',
  })
  @IsString({ message: 'password must be a string' })
  @MinLength(8, { message: 'password is too short' })
  @MaxLength(32, { message: 'password is too long' })
  @IsNotEmpty({ always: true, message: 'password is required' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un carácter especial (@$!%*?&).',
    },
  )
  readonly password: string;
}
