# Deployment Guide - Fidooo Vet App

## Prerequisites

Before deploying to production, ensure you have:

- Node.js 16+ and npm/bun installed
- EAS CLI: `npm install -g eas-cli`
- Xcode (for iOS) or Android Studio (for Android)
- Apple Developer Account (for iOS App Store)
- Google Play Developer Account (for Android)
- GitHub account with repository access

## Environment Setup

### 1. Configure Environment Variables

Create a `.env.production` file based on `.env.example`:

```bash
EXPO_PUBLIC_API_URL=https://your-production-api.com
EXPO_PUBLIC_API_KEY=your_production_api_key
EXPO_PUBLIC_ENV=production
EXPO_PUBLIC_ENABLE_ANALYTICS=true
EXPO_PUBLIC_ENABLE_ERROR_LOGGING=true
```

### 2. EAS Configuration

Initialize EAS for your project:

```bash
eas build:configure
```

This will create an `eas.json` file. Update it with your credentials:

- **iOS**: Add your Apple Team ID and App ID
- **Android**: Add your Google Play Service Account Key

## Building for Production

### iOS Build

```bash
# Create production build
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios --profile production
```

### Android Build

```bash
# Create production build
eas build --platform android --profile production

# Submit to Google Play
eas submit --platform android --profile production
```

### Web Build

```bash
# Build for web
eas build --platform web

# Deploy to your hosting provider (Vercel, Netlify, etc.)
```

## Pre-Deployment Checklist

- [ ] Update app version in `app.json`
- [ ] Review and update `README.md`
- [ ] Ensure all environment variables are configured
- [ ] Test on physical iOS and Android devices
- [ ] Run linting: `npm run lint`
- [ ] Check app performance and bundle size
- [ ] Implement proper error logging (Sentry)
- [ ] Configure push notifications if needed
- [ ] Setup analytics tracking
- [ ] Test payment processing (if applicable)
- [ ] Verify accessibility compliance
- [ ] Review privacy policy and terms of service
- [ ] Test offline functionality
- [ ] Verify all authentication flows

## Post-Deployment

1. **Monitor App Performance**
   - Setup error tracking (Sentry)
   - Configure analytics (Firebase, Mixpanel)
   - Monitor crash rates and performance metrics

2. **User Support**
   - Setup support channels (email, in-app support)
   - Create FAQ documentation
   - Monitor user feedback

3. **Updates & Maintenance**
   - Plan regular update cycle
   - Keep dependencies updated
   - Monitor security advisories

## Troubleshooting

### Common Issues

1. **Build fails with authentication errors**
   - Verify EAS credentials are correct
   - Check Apple/Google developer accounts have valid payment methods

2. **App Store submission rejected**
   - Review App Store guidelines
   - Ensure privacy policy is accessible
   - Test on physical device before submission

3. **Build size too large**
   - Remove unused dependencies
   - Optimize images
   - Use code splitting if available

## Security Considerations

1. **API Security**
   - Use HTTPS/TLS for all API communications
   - Implement certificate pinning
   - Validate all API responses

2. **Data Security**
   - Encrypt sensitive data before storing locally
   - Use secure storage for authentication tokens
   - Implement proper input validation

3. **Code Security**
   - Keep dependencies updated
   - Review code for vulnerabilities
   - Use environment variables for sensitive configuration

4. **Authentication**
   - Implement proper token refresh mechanism
   - Use secure password hashing on backend
   - Implement rate limiting for login attempts

## Support

For more information:
- [Expo Documentation](https://docs.expo.dev/)
- [EAS CLI Documentation](https://docs.expo.dev/build/introduction/)
- [Rork Platform](https://rork.com)
