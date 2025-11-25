import { AuthConfig, LoginCredentials, RegisterData, ResetPasswordData, VerifyEmailData, ResendVerificationData, AuthResponse, User } from './types';

export class AuthService {
  private config: AuthConfig;
  private token: string | null = null;

  constructor(config: AuthConfig) {
    this.config = config;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse<{ user: User; token: string }>> {
    try {
      const response = await fetch(`${this.config.apiEndpoint}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json() as any;
      
      if (response.ok) {
        this.token = data.token;
        return { success: true, data: { user: data.user, token: data.token } };
      }
      
      return { success: false, error: data.message || 'Login failed' };
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  }

  async register(userData: RegisterData): Promise<AuthResponse<{ message: string }>> {
    try {
      const response = await fetch(`${this.config.apiEndpoint}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json() as any;
      return response.ok 
        ? { success: true, data: { message: data.message } }
        : { success: false, error: data.message || 'Registration failed' };
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  }

  async resetPassword(resetData: ResetPasswordData): Promise<AuthResponse<{ message: string }>> {
    try {
      const response = await fetch(`${this.config.apiEndpoint}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resetData),
      });

      const data = await response.json() as any;
      return response.ok 
        ? { success: true, data: { message: data.message } }
        : { success: false, error: data.message || 'Password reset failed' };
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  }

  async verifyEmail(verifyData: VerifyEmailData): Promise<AuthResponse<{ message: string }>> {
    try {
      const response = await fetch(`${this.config.apiEndpoint}/auth/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(verifyData),
      });

      const data = await response.json() as any;
      return response.ok 
        ? { success: true, data: { message: data.message } }
        : { success: false, error: data.message || 'Email verification failed' };
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  }

  async resendVerification(resendData: ResendVerificationData): Promise<AuthResponse<{ message: string }>> {
    try {
      const response = await fetch(`${this.config.apiEndpoint}/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resendData),
      });

      const data = await response.json() as any;
      return response.ok 
        ? { success: true, data: { message: data.message } }
        : { success: false, error: data.message || 'Resend verification failed' };
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  }

  async logout(): Promise<void> {
    this.token = null;
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}