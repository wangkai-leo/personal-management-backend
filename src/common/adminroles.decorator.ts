import { SetMetadata } from '@nestjs/common';
export const AdminRoles = (...roles: string[]) =>
  SetMetadata('admin_roles', roles);
