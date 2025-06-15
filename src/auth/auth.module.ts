import { Module } from '@nestjs/common';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { RolesGuard } from './roles.guard';
import { UsersModule } from '../users/users.module';
import { FirebaseModule } from '../firebase/firebase.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports: [UsersModule, FirebaseModule, JwtModule],
  providers: [FirebaseAuthGuard, RolesGuard, AuthService],
  controllers: [AuthController],
  exports: [FirebaseAuthGuard, RolesGuard],
})
export class AuthModule {}
