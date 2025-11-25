import React, { createContext, ReactNode } from 'react';
import { AuthService, AuthState, LoginCredentials, RegisterData, ResetPasswordData, VerifyEmailData, ResendVerificationData, AuthResponse } from '@universal-auth/core';
import { useAuthService } from '../hooks/useAuth';

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (userData: RegisterData) => Promise<AuthResponse>;
  resetPassword: (resetData: ResetPasswordData) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  verifyEmail: (verifyData: VerifyEmailData) => Promise<AuthResponse>;
  resendVerification: (resendData: ResendVerificationData) => Promise<AuthResponse>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
  authService: AuthService;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, authService }) => {
  const auth = useAuthService(authService);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};