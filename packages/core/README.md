# @universal-auth/core

Core authentication logic for universal auth module with AWS Cognito backend.

## Installation

```bash
npm install @universal-auth/core
```

## Usage

```typescript
import { AuthService } from '@universal-auth/core';

const authService = new AuthService({
  region: 'us-east-1',
  userPoolId: 'your-user-pool-id',
  userPoolClientId: 'your-client-id',
  apiEndpoint: 'your-api-endpoint',
  requireEmailVerification: true,
  enablePersonaSelection: true
});

// Login
const result = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});

// Register
const result = await authService.register({
  email: 'user@example.com',
  password: 'password123',
  persona: 'buyer' // optional
});
```

## Features

- ✅ AWS Cognito Integration
- ✅ TypeScript Support
- ✅ User Registration & Login
- ✅ Email Verification
- ✅ Password Reset
- ✅ User Personas (Buyer/Seller)
- ✅ JWT Token Management

## API Reference

### AuthService

#### Constructor
- `config: AuthConfig` - Configuration object

#### Methods
- `login(credentials: LoginCredentials)` - Authenticate user
- `register(userData: RegisterData)` - Register new user
- `verifyEmail(data: VerifyEmailData)` - Verify email address
- `resetPassword(data: ResetPasswordData)` - Reset password
- `logout()` - Clear authentication state
- `getToken()` - Get current JWT token
- `isAuthenticated()` - Check authentication status

## License

MIT