# Universal Auth Service

Hosted authentication pages that can be integrated into any React or React Native application.

## 🚀 Live Demo

**Hosted Auth Service:** https://universal-auth-service.vercel.app

## 📖 Usage

### For React Applications

```typescript
// Redirect Integration
const authUrl = `https://universal-auth-service.vercel.app?config=${btoa(JSON.stringify({
  region: 'us-east-1',
  userPoolId: 'your-pool-id',
  userPoolClientId: 'your-client-id',
  apiEndpoint: 'your-api-endpoint',
  theme: {
    primaryColor: '#667eea',
    companyName: 'Your App Name'
  }
}))}`;

window.location.href = authUrl;
```

### For React Native Applications

```typescript
import * as WebBrowser from 'expo-web-browser';

const config = {
  region: 'us-east-1',
  userPoolId: 'your-pool-id',
  userPoolClientId: 'your-client-id',
  apiEndpoint: 'your-api-endpoint',
  theme: {
    primaryColor: '#667eea',
    companyName: 'Your Mobile App'
  }
};

const authUrl = `https://universal-auth-service.vercel.app?mode=mobile&config=${btoa(JSON.stringify(config))}`;

const result = await WebBrowser.openAuthSessionAsync(
  authUrl,
  'yourapp://auth-callback'
);
```

## 🎨 Configuration Options

```typescript
interface AuthConfig {
  // AWS Cognito Settings
  region: string;
  userPoolId: string;
  userPoolClientId: string;
  apiEndpoint: string;
  
  // Feature Flags
  requireEmailVerification?: boolean;
  enablePersonaSelection?: boolean;
  
  // Theming
  theme?: {
    primaryColor?: string;
    companyName?: string;
    logo?: string;
  };
}
```

## 🔧 Integration Modes

- **`mode=redirect`** (default) - Full page redirect
- **`mode=popup`** - Popup window integration  
- **`mode=mobile`** - Mobile app integration with deep linking

## 📱 Mobile Integration

The service automatically handles mobile app callbacks by redirecting to your app's deep link with authentication tokens:

```
yourapp://auth-callback?token=jwt_token&user=encoded_user_data
```

## 🛠 Development

```bash
npm install
npm run dev
```

## 🚀 Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mobigaurav/universal-auth/tree/main/examples/web-demo)

## 📦 Packages

- [@universal-auth/core](https://www.npmjs.com/package/@universal-auth/core) - Core authentication logic
- [@universal-auth/react](https://www.npmjs.com/package/@universal-auth/react) - React components and hooks