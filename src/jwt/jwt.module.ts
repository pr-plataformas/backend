import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import config from '../config/config';
import { ConfigModule } from 'src/config/config.module';
import { JwtService } from './jwt.service';

@Module({
  imports: [
    NestJwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { accessSecret, accessExpiresIn } = configService.jwt;
        return {
          secret: accessSecret,
          signOptions: { expiresIn: accessExpiresIn },
        };
      },
    }),
  ],
  exports: [JwtService, NestJwtModule],
  providers: [JwtService],
})
export class JwtModule {}
