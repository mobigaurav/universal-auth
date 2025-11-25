# @universal-auth/react

React components and hooks for universal auth module.

## Installation

```bash
npm install @universal-auth/react @universal-auth/core
```

## Usage

```tsx
import React from 'react';
import { AuthService } from '@universal-auth/core';
import { AuthProvider, LoginForm, useAuth } from '@universal-auth/react';

const authService = new AuthService({
  region: 'us-east-1',
  userPoolId: 'your-user-pool-id',
  userPoolClientId: 'your-client-id',
  apiEndpoint: 'your-api-endpoint'
});

function App() {
  return (
    <AuthProvider authService={authService}>
      <AuthFlow />
    </AuthProvider>
  );
}

function AuthFlow() {
  const { isAuthenticated, user } = useAuth();
  
  if (isAuthenticated) {
    return <div>Welcome {user?.email}!</div>;
  }
  
  return <LoginForm onSuccess={() => console.log('Logged in!')} />;
}
```

## Components

### AuthProvider
Provides authentication context to child components.

### LoginForm
Pre-built login form component.

### EmailVerificationForm
Email verification form component.

## Hooks

### useAuth()
Returns authentication state and methods:
- `user` - Current user object
- `isAuthenticated` - Authentication status
- `isLoading` - Loading state
- `error` - Error message
- `login()` - Login function
- `register()` - Register function
- `logout()` - Logout function

## License

MIT