#!/bin/bash

echo "🚀 Setting up Git repository..."

# Initialize git if not already done
git init

# Add remote origin
git remote add origin https://github.com/mobigaurav/universal-auth.git

# Add all files
git add .

# Commit
git commit -m "Initial commit: Universal Auth Module with AWS Cognito

Features:
- Core authentication package (@universal-auth/core)
- React components package (@universal-auth/react)
- AWS SAM backend with Cognito integration
- Web demo with hosted auth pages
- Mobile demo with InAppBrowser integration
- User personas (Buyer/Seller) support
- Complete auth flow: register, login, verify email, reset password"

# Push to GitHub
git branch -M main
git push -u origin main

echo "✅ Code pushed to GitHub successfully!"
echo "🔗 Repository: https://github.com/mobigaurav/universal-auth"