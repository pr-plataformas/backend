import { User } from '../../users/entities/user.entity';

export class LoginResponseDto {
  user: User;
  accessToken: string;
  refreshToken: string;
}
