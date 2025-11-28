# Production Deployment Guide

## Quick Start for End Users

### Prerequisites
- Node.js 16+ and npm/bun
- EAS CLI: `npm install -g eas-cli`
- Git access to repository

### 1. Install Dependencies

```bash
cd /workspaces/Pet
bun install  # or npm install
```

### 2. Configure Environment

Copy and configure environment variables:

```bash
cp .env.example .env.production
```

Edit `.env.production` with your production values:
```env
EXPO_PUBLIC_API_URL=https://your-production-api.com
EXPO_PUBLIC_API_KEY=your_production_key
EXPO_PUBLIC_ENV=production
EXPO_PUBLIC_SENTRY_DSN=your_sentry_dsn_here
EXPO_PUBLIC_ENABLE_ANALYTICS=true
EXPO_PUBLIC_ENABLE_ERROR_LOGGING=true
```

### 3. Setup EAS (Expo Application Services)

```bash
eas login
eas build:configure
```

This creates `eas.json` with build profiles for iOS, Android, and Web.

### 4. Build & Deploy

#### For iOS (App Store)
```bash
# Build
bun run build:ios

# Submit to App Store
bun run submit:ios
```

#### For Android (Google Play)
```bash
# Build
bun run build:android

# Submit to Google Play
bun run submit:android
```

#### For Web
```bash
# Build
bun run build:web

# Deploy to Vercel (automatic with GitHub integration)
# Or deploy to your hosting provider
```

## Key Features for End Users

✅ **Cross-Platform**: iOS, Android, and Web
✅ **Offline Support**: Local data persistence with AsyncStorage
✅ **Error Handling**: Comprehensive error recovery
✅ **Performance**: Optimized for mobile devices
✅ **Security**: Secure token storage and API communication
✅ **Accessibility**: WCAG 2.1 AA compliant
✅ **User-Friendly**: Intuitive Spanish interface

## App Features

### Home Tab
- Dashboard with pet information
- Quick service overview
- Appointment reminders

### Services Tab
- Browse available veterinary services
- Detailed service descriptions and pricing
- Book services online

### Doctors Tab
- View available veterinarians
- Check doctor schedules
- Book appointments

### Profile Tab
- User account management
- Pet information management
- Service history and payments
- Account settings

## User Account Management

### Registration
1. Open the app
2. Go to Profile tab
3. Click "Register"
4. Enter pet and owner information
5. Create account

### Login
1. Go to Profile tab
2. Click "Login"
3. Enter credentials

### Pet Management
- Update pet details
- View medical history
- Track vaccinations

## Troubleshooting for End Users

### App Won't Load
- Check internet connection
- Force restart the app
- Update to latest version from app store

### Can't Login
- Verify email and password
- Check "Forgot Password" option
- Contact support

### Payment Issues
- Ensure secure connection (https)
- Check payment method validity
- Try again in a few moments

## Contact & Support

- **Email**: support@fidooo-vet-app.com
- **In-App Support**: Available in Profile → Help
- **Website**: https://fidooo-vet-app.com

## System Requirements

### iOS
- iOS 13.0 or later
- 150 MB free space

### Android
- Android 10.0 or later
- 200 MB free space

### Web
- Modern browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled

## Updates & New Features

Regular updates bring:
- Bug fixes and improvements
- New veterinary services
- Enhanced user experience
- Security updates

To update:
- **App Store**: Automatic or manual update option
- **Google Play**: Automatic or manual update option
- **Web**: Refresh browser (automatic)

## Privacy & Security

- Your data is encrypted in transit
- Personal information is never shared
- Medical records are confidential
- GDPR and CCPA compliant

See full Privacy Policy in app settings.

## Frequently Asked Questions

**Q: Is the app free?**
A: The app is free to download. Individual services have their own pricing.

**Q: Can I use the app offline?**
A: Limited offline access available. Full features require internet connection.

**Q: How do I cancel a service?**
A: Go to Service History and click "Cancel" before the service date.

**Q: What payment methods are accepted?**
A: Credit cards, debit cards, and digital wallets.

**Q: How do I reset my password?**
A: Click "Forgot Password" on login screen.

## Known Issues & Limitations

- Real-time chat not yet available (coming soon)
- Video consultation requires stable connection
- Some features require location services enabled

See full list in app → Settings → About → Known Issues
