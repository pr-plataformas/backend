import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { firstValueFrom } from 'rxjs';
import config from 'src/config/config';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    // try {
    //   const user = await firstValueFrom(
    //     this._clientProxyUser.send(UserMSG.VALID_USER, {
    //       username,
    //       password,
    //     }),
    //   );
    //   return user;
    // } catch (error) {
    //   throw new UnauthorizedException('Invalid credentials');
    // }
  }

  async register(registerUserInput: RegisterUserDto) {
    // try {
    //   const registerUser = await firstValueFrom(
    //     this._clientProxyUser.send(UserMSG.CREATE, registerUserInput),
    //   );
    //   return registerUser;
    // } catch (error) {
    //   console.log(error);
    //   throw error;
    // }
  }

  async login({ email, password }: LoginUserDto) {
    // try {
    //   const foundUser = await firstValueFrom(
    //     this._clientProxyUser.send(UserMSG.FIND_EMAIL, email),
    //   );
    //   if (foundUser.statusCode === 404)
    //     throw new NotFoundException("User doesn't exist");
    //   const isPasswordMatch = await bcrypt.compare(
    //     password,
    //     foundUser.data.password,
    //   );
    //   if (!isPasswordMatch) {
    //     throw new UnauthorizedException("Credentials don't match");
    //   }
    //   const payload = { sub: foundUser.data._id };
    //   const accessToken = await this.jwtService.signAsync(payload);
    //   const refreshToken = await this.jwtService.signAsync(payload, {
    //     secret: this.configService.jwt.refreshSecret,
    //     expiresIn: this.configService.jwt.refreshExpiresIn,
    //   });
    //   return {
    //     statusCode: HttpStatus.OK,
    //     userId: foundUser.data._id,
    //     playerId: foundUser.data.playerId,
    //     accessToken,
    //     refreshToken,
    //   };
    // } catch (error) {
    //   throw error;
    // }
  }

  async refresh(refreshToken: string) {
    // try {
    //   const { email } = await this.jwtService.verify(refreshToken, {
    //     secret: this.configService.jwt.refreshSecret,
    //   });
    //   const user = await firstValueFrom(
    //     this._clientProxyUser.send(UserMSG.FIND_EMAIL, email),
    //   );
    //   const newToken = this.jwtService.sign({
    //     username: user.userName,
    //     sub: user.id,
    //   });
    //   return newToken;
    // } catch (error) {
    //   throw new UnauthorizedException('Invalid refresh token');
    // }
  }
}
