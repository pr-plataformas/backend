import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RefreshResponseDto } from './dto/refresh-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Genera el payload estándar para los tokens
  private buildJwtPayload(user: User): JwtPayloadDto {
    if (!user.role || !['user', 'admin'].includes(user.role)) {
      throw new ForbiddenException('Rol de usuario no permitido');
    }
    return {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
  }

  // Registro: crea un usuario nuevo
  async registerUser(decodedToken: any): Promise<User> {
    return this.usersService.createUser({
      email: decodedToken.email,
      name: decodedToken.name || decodedToken.email,
      role: decodedToken.role || 'user',
    });
  }

  // Login: valida Firebase, busca/crea usuario y genera tokens
  async loginWithFirebaseToken(decodedToken: any): Promise<LoginResponseDto> {
    try {
      let user = await this.usersService.findByEmail(decodedToken.email);
      if (!user) {
        user = await this.registerUser(decodedToken);
      }
      const payload = this.buildJwtPayload(user);
      const accessToken = await this.jwtService.generateAccessToken(payload);
      const refreshToken = await this.jwtService.generateRefreshToken(payload);
      return { user, accessToken, refreshToken };
    } catch (error) {
      throw new UnauthorizedException(
        'Token de Firebase inválido o usuario no válido.',
      );
    }
  }

  // Refresh: valida refreshToken, rota y genera nuevo accessToken y refreshToken
  async refreshToken(refreshToken: string): Promise<RefreshResponseDto> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.jwtService['configService'].jwt.refreshSecret,
      });
      const user = await this.usersService.findById(payload.sub);
      if (!user) throw new UnauthorizedException('Usuario no encontrado');
      const newPayload = this.buildJwtPayload(user);
      const accessToken = await this.jwtService.generateAccessToken(newPayload);
      const newRefreshToken =
        await this.jwtService.generateRefreshToken(newPayload); // Rotación
      return { accessToken, refreshToken: newRefreshToken, user };
    } catch (error) {
      throw new UnauthorizedException('Refresh token inválido o expirado.');
    }
  }
}
