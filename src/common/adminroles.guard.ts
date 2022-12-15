import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(
      'admin_roles',
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const admin_level = request.cookies.park_admin_user.split('&')[1];
    let can_achieve = false;
    roles.forEach((element) => {
      if (element === admin_level) {
        can_achieve = true;
      }
    });
    console.log('[common/adminroles] guard running...' + can_achieve);
    return can_achieve;
  }
}
