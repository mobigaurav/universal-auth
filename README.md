# Universal Auth Module

A complete authentication ecosystem for React and React Native applications with AWS Cognito backend.

## 🚀 Quick Start (Hosted Service)

**The fastest way to add authentication to your app:**

### For React Apps
```typescript
const config = {
  region: 'us-east-1',
  userPoolId: 'your-user-pool-id',
  userPoolClientId: 'your-client-id',
  apiEndpoint: 'your-api-endpoint'
};

const authUrl = `https://universal-auth-hosted.vercel.app?config=${btoa(JSON.stringify(config))}`;
window.location.href = authUrl;
```

### For React Native Apps
```typescript
import * as WebBrowser from 'expo-web-browser';

const result = await WebBrowser.openAuthSessionAsync(authUrl, 'yourapp://auth-callback');
```

**🔗 [Try Demo Generator](https://universal-auth-hosted.vercel.app/demo.html)** - Configure and test instantly

## 🏗️ Architecture

### 📦 NPM Packages
- **[@universal-auth/core](https://www.npmjs.com/package/@universal-auth/core)** - Platform-agnostic authentication logic
- **[@universal-auth/react](https://www.npmjs.com/package/@universal-auth/react)** - React components and hooks

### 🌐 Hosted Service
- **[Universal Auth Hosted](https://universal-auth-hosted.vercel.app)** - Ready-to-use auth pages
- **[Demo Generator](https://universal-auth-hosted.vercel.app/demo.html)** - Test with your AWS config

### ☁️ Backend
- **AWS SAM Backend** - Complete Cognito setup with API Gateway

## 🎯 Choose Your Integration

### Option 1: Hosted Service (Recommended)
**Zero setup, just configure and use:**
- No need to build auth pages
- Instant integration with URL parameters
- Mobile deep linking support
- Custom theming

### Option 2: NPM Packages
**Build your own auth pages:**
```bash
npm install @universal-auth/core @universal-auth/react
```

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

## 🛠️ Backend Setup

Deploy the AWS Cognito backend:

```bash
git clone https://github.com/mobigaurav/universal-auth.git
cd universal-auth/packages/aws-backend
sam build
sam deploy
```

Get your configuration:
```bash
sam list stack-outputs
```

## ✨ Features

- ✅ **Complete Auth Flow** - Login, Register, Email Verification, Password Reset
- ✅ **User Personas** - Buyer/Seller account types
- ✅ **JWT Token Management** - Secure session handling
- ✅ **React & React Native** - Universal compatibility
- ✅ **AWS Cognito Integration** - Enterprise-grade security
- ✅ **TypeScript Support** - Full type safety
- ✅ **Custom Theming** - Brand colors and styling
- ✅ **Mobile Deep Linking** - Seamless mobile integration

## 📱 Mobile Integration Example

Complete React Native setup:

```typescript
// App.js
import { useState } from 'react';
import { Button, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export default function App() {
  const [user, setUser] = useState(null);

  const handleAuth = async () => {
    const config = {
      region: 'us-east-1',
      userPoolId: 'your-user-pool-id',
      userPoolClientId: 'your-client-id',
      apiEndpoint: 'your-api-endpoint',
      theme: { companyName: 'My Mobile App' }
    };

    const authUrl = `https://universal-auth-hosted.vercel.app?mode=mobile&config=${btoa(JSON.stringify(config))}`;
    
    const result = await WebBrowser.openAuthSessionAsync(authUrl, 'myapp://auth-callback');
    
    if (result.type === 'success') {
      const url = new URL(result.url);
      const token = url.searchParams.get('token');
      const userData = JSON.parse(decodeURIComponent(url.searchParams.get('user')));
      setUser(userData);
      Alert.alert('Success', `Welcome ${userData.email}!`);
    }
  };

  return user ? (
    <Text>Welcome {user.email}!</Text>
  ) : (
    <Button title="Login" onPress={handleAuth} />
  );
}
```

## 🔗 Links

- **📦 Core Package:** https://www.npmjs.com/package/@universal-auth/core
- **⚛️ React Package:** https://www.npmjs.com/package/@universal-auth/react
- **🌐 Hosted Service:** https://universal-auth-hosted.vercel.app
- **🧪 Demo Generator:** https://universal-auth-hosted.vercel.app/demo.html
- **📚 Hosted Service Docs:** https://github.com/mobigaurav/universal-auth-hosted

## 🚀 Development

```bash
# Clone repository
git clone https://github.com/mobigaurav/universal-auth.git
cd universal-auth

# Install dependencies
npm install

# Build packages
npm run build

# Run web demo
npm run dev:web

# Run mobile demo  
npm run dev:mobile
```

## 📄 License

MIT License

---

**Made with ❤️ by [Gaurav Kumar](https://github.com/mobigaurav)**

*Never build auth pages again! 🎉*