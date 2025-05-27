import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import admin from './firebase-admin';
import { UsersService } from '../users/users.service';

const ucnRegex = /^[^@]+@(?:[a-zA-Z0-9-]+\.)*ucn\.cl$/;


@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) throw new UnauthorizedException('No token provided');
    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      const email = decodedToken.email;
      if (!email || !ucnRegex.test(email)) {
        throw new ForbiddenException('Solo se permite acceso a correos institucionales UCN');
      }
      // Asigna el rol según el correo
      const role = email === 'eduardo.erices@alumnos.ucn.cl' ? 'admin' : 'user';
      // Busca o crea el usuario en la base de datos
      const user = await this.usersService.findOrCreateUserFromFirebase({ email, name: decodedToken.name, role });
      req.user = user;
      return true;
    } catch (err) {
      if (err instanceof UnauthorizedException || err instanceof ForbiddenException) throw err;
      throw new UnauthorizedException('Invalid token');
    }
  }
}