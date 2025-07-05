import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse as SwaggerApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { ApiResponse } from 'src/common/types/ApiResponse.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ status: 200, description: 'Login exitoso.' })
  @Post('login')
  async login(@Req() req): Promise<ApiResponse<any>> {
    const decodedToken = req.firebaseDecoded;
    const { user, accessToken, refreshToken } =
      await this.authService.loginWithFirebaseToken(decodedToken);
    return {
      statusCode: HttpStatus.OK,
      message: 'Login exitoso',
      data: {
        user,
        accessToken,
        refreshToken,
      },
    };
  }
  @UseGuards(GoogleAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ status: 200, description: 'Login Google exitoso.' })
  @Post('login-google')
  async loginGoogle(@Req() req): Promise<ApiResponse<any>> {
    try {
      const decodedToken = req.googleDecoded;
      const { user, accessToken, refreshToken } =
        await this.authService.loginWithGoogleToken(decodedToken);
      return {
        statusCode: HttpStatus.OK,
        message: 'Login Google exitoso',
        data: {
          user,
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al iniciar sesión con Google',
        data: null,
      };
    }
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ status: 200, description: 'Token refrescado.' })
  async refresh(
    @Req() req,
  ): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> {
    try {
      const { accessToken, refreshToken } = await this.authService.refreshToken(
        req.refreshToken,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Tokens refrescados exitosamente',
        data: { accessToken, refreshToken },
      };
    } catch (error) {
      if (error.statusCode === HttpStatus.UNAUTHORIZED) {
        if (error.name === 'TokenExpiredError') {
          return {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'Refresh token expirado',
            data: null,
          };
        }
      }
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al refrescar tokens',
        data: null,
      };
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get('validate')
  validateToken(@Request() req) {
    return { valid: true, user: req.user };
  }
}
