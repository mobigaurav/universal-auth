#!/bin/bash

echo "🚀 Publishing Universal Auth Packages..."

# Build and publish core package
echo "📦 Building and publishing @universal-auth/core..."
cd packages/core
npm run build
npm publish

# Build and publish react package
echo "📦 Building and publishing @universal-auth/react..."
cd ../react
npm run build
npm publish

echo "✅ All packages published successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Deploy web-demo as hosted auth service"
echo "2. Test integration in mobile-demo"
echo "3. Update documentation with published package versions"