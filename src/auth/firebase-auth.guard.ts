import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UCN_EMAIL_REGEX } from '../common/constants/ucn-email.regex';
import { FirebaseService } from '../firebase/firebase.service';

const ucnRegex = UCN_EMAIL_REGEX;

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  private readonly logger = new Logger(FirebaseAuthGuard.name);
  constructor(private readonly firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const token = this.extractToken(req.headers.authorization);
      const decodedToken = await this.firebaseService.verifyIdToken(token);
      this.validateInstitutionalEmail(decodedToken.email);
      req.firebaseDecoded = decodedToken;
      this.logger.log(`Token válido para: ${decodedToken.email}`);
      return true;
    } catch (err) {
      this.logger.error('Error en autenticación FirebaseAuthGuard', err);
      if (
        err instanceof UnauthorizedException ||
        err instanceof ForbiddenException
      )
        throw err;
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractToken(authHeader: string): string {
    if (!authHeader?.startsWith('Bearer ')) {
      this.logger.warn('No token provided in Authorization header');
      throw new UnauthorizedException('No token provided');
    }
    return authHeader.split(' ')[1];
  }

  private validateInstitutionalEmail(email: string): void {
    if (!email || !ucnRegex.test(email)) {
      throw new ForbiddenException(
        'Solo se permiten correos institucionales UCN.',
      );
    }
  }
}
