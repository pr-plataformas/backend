import {
  ConflictException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from 'src/jwt/jwt.service';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import config from 'src/config/config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
    private readonly usersService: UsersService,
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
    try {
      const registerUser = await this.usersService.findByEmail(
        registerUserInput.email,
      );

      if (registerUser) {
        throw new ConflictException('User already exists');
      }

      const hashedPassword = await this.hashPassword(
        registerUserInput.password,
      );

      const newUser = await this.usersService.createUser({
        ...registerUserInput,
        password: hashedPassword,
      });

      return newUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async login({ email, password }: LoginUserDto) {
    try {
      const foundUser = await this.usersService.findByEmail(email);
      if (!foundUser) throw new NotFoundException("User doesn't exist");

      const isPasswordMatch = await this.comparePassword({
        loginPassword: password,
        hashPassword: foundUser.password,
      });
      if (!isPasswordMatch) {
        throw new UnauthorizedException("Credentials don't match");
      }
      const payload = { sub: foundUser.id };
      const accessToken = await this.jwtService.signAsync(payload);
      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: this.configService.jwt.refreshSecret,
        expiresIn: this.configService.jwt.refreshExpiresIn,
      });

      const { password: foundUserPassword, ...userWithoutPassword } = foundUser;

      return {
        statusCode: HttpStatus.OK,
        message: 'Login successful',
        data: {
          user: userWithoutPassword,
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      throw error;
    }
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

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async comparePassword({
    loginPassword,
    hashPassword,
  }: {
    loginPassword: string;
    hashPassword: string;
  }): Promise<boolean> {
    try {
      return await bcrypt.compare(loginPassword, hashPassword);
    } catch (e) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
