import { IUser } from '../../users/types/user.interface';

export interface AuthLoginResponse {
  message: string;
  status: number;
  data: {
    user: IUser;
    accessToken: string;
    refreshToken: string;
  };
}

export interface AuthRefreshResponse {
  message: string;
  status: number;
  data: {
    user: IUser;
    accessToken: string;
  };
}
