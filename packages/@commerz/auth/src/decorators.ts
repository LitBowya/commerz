// Decorators for authentication and authorization
import { UserRole } from './types';

export interface DecoratorMetadata {
  roles?: UserRole[];
  requireAuth?: boolean;
}

// Simple decorator functions (framework-agnostic)
export function RequireAuth() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata('requireAuth', true, target, propertyKey);
    return descriptor;
  };
}

export function RequireRole(role: UserRole) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata('requiredRole', role, target, propertyKey);
    return descriptor;
  };
}

export function RequireRoles(...roles: UserRole[]) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata('requiredRoles', roles, target, propertyKey);
    return descriptor;
  };
}

// Helper to get metadata
export function getAuthMetadata(target: any, propertyKey: string): DecoratorMetadata {
  return {
    requireAuth: Reflect.getMetadata('requireAuth', target, propertyKey),
    roles: Reflect.getMetadata('requiredRoles', target, propertyKey) || 
           (Reflect.getMetadata('requiredRole', target, propertyKey) ? 
            [Reflect.getMetadata('requiredRole', target, propertyKey)] : undefined),
  };
}
