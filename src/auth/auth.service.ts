import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { PROFESOR_UCN_REGEX, ADMIN_EMAILS } from '../common/constants/ucn-email.regex';
import { UserRole } from '../common/enums/user-role.enum';
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

  // Registro: crea un usuario nuevo
  async registerUser(decodedToken: admin.auth.DecodedIdToken): Promise<User> {
    const email = decodedToken.email;
    let role: UserRole = UserRole.ESTUDIANTE;
    
    // Verificar si es administrador
    if (ADMIN_EMAILS.includes(email.toLowerCase())) {
      role = UserRole.ADMINISTRADOR;
    }
    // Verificar si es profesor
    else if (PROFESOR_UCN_REGEX.test(email)) {
      role = UserRole.PROFESOR;
    }
    
    return this.usersService.createUser({
      email: decodedToken.email,
      fullName: decodedToken.name || decodedToken.email,
      role,
    });
  }

  // Login: valida Firebase, busca/crea usuario y genera tokens
  async loginWithFirebaseToken(
    decodedToken: admin.auth.DecodedIdToken,
  ): Promise<LoginResponseDto> {
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

  // Login: valida Google, busca/crea usuario y genera tokens
  async loginWithGoogleToken(googlePayload: any): Promise<LoginResponseDto> {
    try {
      let user = await this.usersService.findByEmail(googlePayload.email);
      if (!user) {
        user = await this.registerUser({
          email: googlePayload.email,
          name: googlePayload.name || googlePayload.email,
        } as any);
      }
      const payload = this.buildJwtPayload(user);
      const accessToken = await this.jwtService.generateAccessToken(payload);
      const refreshToken = await this.jwtService.generateRefreshToken(payload);
      return { user, accessToken, refreshToken };
    } catch (error) {
      console.log('Error en login con Google:', error);
      throw new UnauthorizedException(
        'Token de Google inválido o usuario no válido.',
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

  // Genera el payload estándar para los tokens
  private buildJwtPayload(user: User): JwtPayloadDto {
    return {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
