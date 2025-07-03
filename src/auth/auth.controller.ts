import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
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
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @SwaggerApiResponse({ status: 200, description: 'Token refrescado.' })
  async refresh(@Req() req): Promise<ApiResponse<any>> {
    const { refreshToken } = req.body;
    const { accessToken, user } =
      await this.authService.refreshToken(refreshToken);
    return {
      statusCode: HttpStatus.OK,
      message: 'Token refrescado',
      data: {
        user,
        accessToken,
      },
    };
  }
}
