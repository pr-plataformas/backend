import { Module } from '@nestjs/common';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { RolesGuard } from './roles.guard';
import { UsersModule } from '../users/users.module';
import { FirebaseModule } from '../firebase/firebase.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '../jwt/jwt.module';
import { GoogleAuthGuard } from './google-auth.guard';

@Module({
  imports: [UsersModule, FirebaseModule, JwtModule],
  providers: [FirebaseAuthGuard, RolesGuard, AuthService, GoogleAuthGuard],
  controllers: [AuthController],
  exports: [FirebaseAuthGuard, RolesGuard, GoogleAuthGuard],
})
export class AuthModule {}
