import { Module, forwardRef } from '@nestjs/common';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { RolesGuard } from './roles.guard';
import { UsersModule } from '../users/users.module';
<<<<<<< HEAD
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, PassportModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
=======

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [FirebaseAuthGuard, RolesGuard],
  exports: [FirebaseAuthGuard, RolesGuard],
>>>>>>> fusion
})
export class AuthModule {}