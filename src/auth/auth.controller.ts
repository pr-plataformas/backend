import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenGuard } from './guards/refresh.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('verify')
  @UseGuards(AuthGuard('jwt'))
  async verifyToken(@Req() request: Request) {
    // El AuthGuard ya verificó el token, solo necesitamos devolver la respuesta
    return {
      isValid: true,
    };
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const result = await this.authService.login(dto);
    if (!result) throw new UnauthorizedException('Invalid credentials');
    return result;
  }

  @Post('register')
  async register(@Body() registerUserInput: RegisterUserDto) {
    return await this.authService.register(registerUserInput);
  }

  @Post('update-jwt')
  @UseGuards(RefreshTokenGuard)
  async updateJWT(@Request() req) {
    const { refreshToken } = req.body;
    try {
      const updatedToken = await this.authService.refresh(refreshToken);
      return {
        statusCode: 200,
        success: true,
        message: 'JWT updated succesfully',
        data: updatedToken,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update JWT',
        error: (error as Record<string, string>)?.message,
      };
    }
  }
}
