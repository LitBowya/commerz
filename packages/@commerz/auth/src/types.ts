// Authentication Types
export interface User {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Merchant extends User {
  businessName: string;
  businessType: string;
  country: string;
  phoneNumber: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

export interface Customer extends User {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  preferredLanguage: string;
  country: string;
}

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  MERCHANT = 'merchant',
  CUSTOMER = 'customer',
  SUPPORT = 'support',
}

// Authentication Requests/Responses
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterMerchantRequest {
  email: string;
  password: string;
  businessName: string;
  businessType: string;
  country: string;
  phoneNumber: string;
}

export interface RegisterCustomerRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  preferredLanguage?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

// Password Reset
export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}

// Session Management
export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  lastAccessedAt: Date;
  userAgent?: string;
  ipAddress?: string;
}
