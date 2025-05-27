import { CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

export class RolesGuard implements CanActivate {
  constructor(private readonly allowedRoles: string[]) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user || !this.allowedRoles.includes(user.role)) {
      throw new ForbiddenException('No tienes permisos');
    }
    return true;
  }
}