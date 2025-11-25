import { useState, useContext } from 'react';
import { AuthService, AuthState, LoginCredentials, RegisterData, ResetPasswordData, VerifyEmailData, ResendVerificationData } from '@universal-auth/core';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export const useAuthService = (authService: AuthService) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  const login = async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const result = await authService.login(credentials);
    
    if (result.success && result.data) {
      setState({
        user: result.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } else {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: result.error || 'Login failed',
      }));
    }
    
    return result;
  };

  const register = async (userData: RegisterData) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    const result = await authService.register(userData);
    setState(prev => ({
      ...prev,
      isLoading: false,
      error: result.success ? null : result.error || 'Registration failed',
    }));
    return result;
  };

  const resetPassword = async (resetData: ResetPasswordData) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    const result = await authService.resetPassword(resetData);
    setState(prev => ({
      ...prev,
      isLoading: false,
      error: result.success ? null : result.error || 'Password reset failed',
    }));
    return result;
  };

  const verifyEmail = async (verifyData: VerifyEmailData) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    const result = await authService.verifyEmail(verifyData);
    setState(prev => ({
      ...prev,
      isLoading: false,
      error: result.success ? null : result.error || 'Email verification failed',
    }));
    return result;
  };

  const resendVerification = async (resendData: ResendVerificationData) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    const result = await authService.resendVerification(resendData);
    setState(prev => ({
      ...prev,
      isLoading: false,
      error: result.success ? null : result.error || 'Resend verification failed',
    }));
    return result;
  };

  const logout = async () => {
    await authService.logout();
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  return { ...state, login, register, resetPassword, logout, verifyEmail, resendVerification };
};