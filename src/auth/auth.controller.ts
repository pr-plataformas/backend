import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Login exitoso.' })
  @Post('login')
  async login(@Req() req) {
    // El guard ya validó el token y el dominio, y adjuntó decodedToken
    const decodedToken = req.firebaseDecoded;
    const { user, accessToken, refreshToken } =
      await this.authService.loginWithFirebaseToken(decodedToken);
    return {
      message: 'Login exitoso',
      status: 200,
      data: {
        user,
        accessToken,
        refreshToken,
      },
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Token refrescado.' })
  async refresh(@Req() req) {
    const { refreshToken } = req.body;
    const { accessToken, user } =
      await this.authService.refreshToken(refreshToken);
    return {
      message: 'Token refrescado',
      status: 200,
      data: {
        user,
        accessToken,
      },
    };
  }

  @UseGuards(GoogleAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Login Google exitoso.' })
  @Post('login-google')
  async loginGoogle(@Req() req) {
    const decodedToken = req.googleDecoded;
    const { user, accessToken, refreshToken } =
      await this.authService.loginWithGoogleToken(decodedToken);
    return {
      message: 'Login Google exitoso',
      status: 200,
      data: {
        user,
        accessToken,
        refreshToken,
      },
    };
  }

  @Post('refresh-google')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Token Google refrescado.' })
  async refreshGoogle(@Req() req) {
    const { refreshToken } = req.body;
    const { accessToken, user } =
      await this.authService.refreshToken(refreshToken);
    return {
      message: 'Token Google refrescado',
      status: 200,
      data: {
        user,
        accessToken,
      },
    };
  }
}
