// Authentication guards for protecting routes
import { UserRole } from './types';

export interface AuthGuard {
  canActivate(context: any): boolean;
}

export class RoleGuard implements AuthGuard {
  constructor(private readonly requiredRole: UserRole) {}

  canActivate(context: { user?: { role: UserRole } }): boolean {
    if (!context.user) {
      return false;
    }

    const roleHierarchy = {
      [UserRole.SUPER_ADMIN]: 4,
      [UserRole.SUPPORT]: 3,
      [UserRole.MERCHANT]: 2,
      [UserRole.CUSTOMER]: 1,
    };

    return roleHierarchy[context.user.role] >= roleHierarchy[this.requiredRole];
  }
}

export class AuthenticatedGuard implements AuthGuard {
  canActivate(context: { user?: any }): boolean {
    return !!context.user;
  }
}
