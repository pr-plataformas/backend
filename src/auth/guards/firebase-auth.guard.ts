import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UCN_EMAIL_REGEX } from '../../common/constants/ucn-email.regex';
import { FirebaseService } from '../../firebase/firebase.service';

const ucnRegex = UCN_EMAIL_REGEX;

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  private readonly logger = new Logger(FirebaseAuthGuard.name);

  /**
   * Guarda de autenticación para validar tokens de Firebase y correos institucionales UCN.
   * @param firebaseService Servicio de Firebase para verificar tokens.
   */
  constructor(private readonly firebaseService: FirebaseService) {}

  /**
   * Método que se ejecuta para verificar si la solicitud está autorizada.
   * Extrae el token del encabezado de autorización, lo verifica y valida el correo electrónico.
   * @param context Contexto de ejecución de la solicitud.
   * @returns Verdadero si la autenticación es exitosa, falso en caso contrario.
   */
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

  /**
   * Extrae el token del encabezado de autorización.
   * @param authHeader Encabezado de autorización de la solicitud.
   * @returns El token extraído.
   * @throws UnauthorizedException si no se proporciona un token válido.
   */
  private extractToken(authHeader: string): string {
    if (!authHeader?.startsWith('Bearer ')) {
      this.logger.warn('No token provided in Authorization header');
      throw new UnauthorizedException('No token provided');
    }
    return authHeader.split(' ')[1];
  }

  /**
   * Valida que el correo electrónico proporcionado sea un correo institucional UCN.
   * @param email Correo electrónico a validar.
   * @throws ForbiddenException si el correo no es válido.
   */
  private validateInstitutionalEmail(email: string): void {
    if (!email || !ucnRegex.test(email)) {
      throw new ForbiddenException(
        'Solo se permiten correos institucionales UCN.',
      );
    }
  }
}
