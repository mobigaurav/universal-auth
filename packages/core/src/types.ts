export interface User {
  id: string;
  email: string;
  username?: string;
  emailVerified: boolean;
  createdAt: string;
  persona?: 'seller' | 'buyer';
}

export interface AuthConfig {
  region: string;
  userPoolId: string;
  userPoolClientId: string;
  apiEndpoint: string;
  requireEmailVerification?: boolean;
  enablePersonaSelection?: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username?: string;
  persona?: 'seller' | 'buyer';
}

export interface ResetPasswordData {
  email: string;
  newPassword: string;
  confirmationCode: string;
}

export interface VerifyEmailData {
  email: string;
  verificationCode: string;
}

export interface ResendVerificationData {
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}