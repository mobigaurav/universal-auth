# Setup Instructions

## Current Directory Structure
```
universal-auth-module/                    <- ROOT (has main package.json)
├── packages/
│   ├── core/                            <- Core package (has package.json)
│   ├── react/                           <- React package (has package.json)
│   └── aws-backend/                     <- Backend package (has package.json)
└── examples/
    └── web-demo/                        <- Web demo (has package.json)
```

## Step-by-Step Commands

### 1. Root Setup
```bash
cd /Users/e1250871/Desktop/universal-auth-module
yarn install
```

### 2. Build Core Package
```bash
cd packages/core
yarn install
yarn build
```

### 3. Build React Package
```bash
cd ../react
yarn install
yarn build
```

### 4. Setup Web Demo
```bash
cd ../../examples/web-demo
yarn install
```

### 5. Update Configuration
Edit `examples/web-demo/src/config.ts` with your AWS values:
- Get values from: `cd packages/aws-backend && sam list stack-outputs`

### 6. Run Demo
```bash
# From: /Users/e1250871/Desktop/universal-auth-module/examples/web-demo
yarn dev
```

## Quick Commands (from root)
```bash
# Build all packages
yarn workspace @universal-auth/core build
yarn workspace @universal-auth/react build

# Run web demo
cd examples/web-demo && yarn dev
```