import { User } from '../../users/entities/user.entity';

export class RefreshResponseDto {
  user: User;
  accessToken: string;
  refreshToken: string;
}
