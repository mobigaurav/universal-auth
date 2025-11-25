# Universal Auth Module

A reusable authentication module for React and React Native applications with AWS Cognito backend.

## Architecture

- **@universal-auth/core** - Platform-agnostic authentication logic
- **@universal-auth/react** - React components and hooks
- **@universal-auth/react-native** - React Native components
- **@universal-auth/aws-backend** - AWS SAM application with Cognito

## Quick Start

### 1. Deploy Backend
```bash
cd packages/aws-backend
npm run build
npm run deploy
```

### 2. Install Packages
```bash
npm install @universal-auth/core @universal-auth/react
```

### 3. Setup React App
```tsx
import { AuthService } from '@universal-auth/core';
import { AuthProvider, LoginForm } from '@universal-auth/react';

const authService = new AuthService({
  region: 'us-east-1',
  userPoolId: 'your-user-pool-id',
  userPoolClientId: 'your-client-id',
  apiEndpoint: 'your-api-endpoint'
});

function App() {
  return (
    <AuthProvider authService={authService}>
      <LoginForm onSuccess={() => console.log('Logged in!')} />
    </AuthProvider>
  );
}
```

## Development

```bash
# Install dependencies
npm run bootstrap

# Build all packages
npm run build

# Run web demo
npm run dev:web

# Run mobile demo
npm run dev:mobile
```

## Features

- ✅ User Registration
- ✅ Email/Password Login
- ✅ Password Reset
- ✅ Email Verification
- ✅ JWT Token Management
- ✅ React Hooks & Components
- ✅ React Native Support
- ✅ AWS Cognito Integration
- ✅ TypeScript Support