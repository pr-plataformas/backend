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
        userName: 'username',
      },
    ],
    description: 'The username of the user',
  })
  @IsString({ message: 'username must be a string' })
  @MinLength(6, { message: 'username is too short' })
  @MaxLength(32, { message: 'username is too long' })
  @IsNotEmpty({ always: true, message: 'username is required' })
  readonly userName: string;

  @ApiProperty({
    examples: [
      {
        name: 'name',
      },
    ],
    description: 'The name of the user',
  })
  @IsString({ message: 'name must be a string' })
  @MinLength(8, { message: 'name is too short' })
  @MaxLength(32, { message: 'name is too long' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-zA-Z0-9])(?=.*\W).{8,}$/, {
    message:
      'name must contain at least one uppercase letter, one number, and one special character',
  })
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
  @Matches(/^(?=.*[A-Z])(?=.*[a-zA-Z0-9])(?=.*\W).{8,}$/, {
    message:
      'name must contain at least one uppercase letter, one number, and one special character',
  })
  readonly password: string;
}
