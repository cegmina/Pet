# Fidooo Vet App - Production Ready

A modern, cross-platform veterinary services app built with React Native and Expo. Connect pet owners with quality veterinary care through an intuitive mobile and web platform.

**Status**: ✅ Production Ready | **Platforms**: iOS, Android, Web | **Language**: TypeScript

## Quick Links

- 📱 [User Guide](./USER_GUIDE.md) - For end users
- 👨‍💻 [Developer Guide](./DEVELOPER_GUIDE.md) - For developers
- 🚀 [Deployment Guide](./DEPLOYMENT.md) - For deployment
- ✅ [Production Checklist](./PRODUCTION_CHECKLIST.md) - Pre-launch checklist

## Features

### Core Features
✅ **User Authentication** - Secure login and registration
✅ **Pet Management** - Store and manage pet information
✅ **Service Booking** - Browse and book veterinary services
✅ **Doctor Directory** - Find and contact veterinarians
✅ **Service History** - Track medical history and appointments
✅ **Payment System** - Secure payment processing
✅ **Offline Support** - Limited offline functionality

### Technical Features
✅ **Cross-Platform** - iOS, Android, and Web
✅ **Error Handling** - Comprehensive error recovery and logging
✅ **Accessibility** - WCAG 2.1 AA compliant
✅ **Security** - Secure API communication and data storage
✅ **Performance** - Optimized for mobile devices
✅ **Type Safety** - Full TypeScript support

## Tech Stack

- **Framework**: React Native + Expo
- **Routing**: Expo Router (file-based routing)
- **State Management**: React Context + React Query
- **Language**: TypeScript
- **Styling**: React Native (platform-native)
- **Storage**: AsyncStorage + Secure Storage
- **API**: Fetch API with error handling
- **Icons**: Lucide React Native

## Getting Started

### For End Users

1. **Download the App**
   - iOS: Download from App Store (app bundle ID: `app.rork.fidooo-vet-app`)
   - Android: Download from Google Play (package: `app.rork.fidooo_vet_app`)
   - Web: Visit https://your-domain.com

2. **Create Account**
   - Register with email
   - Add pet information
   - Verify contact details

3. **Start Using**
   - Browse veterinary services
   - Book appointments
   - Track medical history

See [USER_GUIDE.md](./USER_GUIDE.md) for detailed user instructions.

### For Developers

```bash
# 1. Clone repository
git clone <your-repo-url>
cd Pet

# 2. Install dependencies
bun install  # or npm install

# 3. Setup environment
cp .env.example .env.local

# 4. Start development
bun run start-web  # or 'bun run start' for mobile

# 5. Run linting & type check
bun run lint
bun run type-check
```

See [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) for detailed setup and development instructions.

## Project Structure

```
Pet/
├── app/                     # Expo Router screens
│   ├── (tabs)/             # Tab-based navigation
│   ├── (doctors)/          # Doctor screens
│   ├── (home)/             # Home/dashboard
│   ├── (profile)/          # User profile
│   └── (services)/         # Service listing
├── components/              # Reusable components
├── contexts/               # React contexts
├── utils/                  # Utility functions & helpers
├── constants/              # App constants
├── mocks/                  # Mock data
├── config/                 # Configuration files
├── DEPLOYMENT.md           # Deployment instructions
├── DEVELOPER_GUIDE.md      # Developer setup guide
├── USER_GUIDE.md          # User documentation
└── PRODUCTION_CHECKLIST.md # Pre-launch checklist
```

## Deployment

### Quick Deploy

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure for deployment
eas build:configure

# Build for iOS
bun run build:ios && bun run submit:ios

# Build for Android
bun run build:android && bun run submit:android

# Deploy to web
bun run build:web
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Available Scripts

```bash
# Development
bun run start          # Start Expo development server
bun run start-web      # Start web development server
bun run start-web-dev  # Start with debug logging

# Building
bun run build:ios      # Build for iOS App Store
bun run build:android  # Build for Google Play
bun run build:web      # Build for web

# Submission
bun run submit:ios     # Submit to App Store
bun run submit:android # Submit to Google Play

# Quality
bun run lint           # Run ESLint
bun run type-check     # Run TypeScript check

# Prebuild (native)
bun run prebuild       # Generate native project files
```

## Security

- 🔒 HTTPS/TLS for all API communications
- 🔐 Secure token storage
- 🛡️ Input validation and sanitization
- 🔑 Environment-based configuration
- 📊 Error logging and monitoring
- ♿ Accessibility compliance

See [DEPLOYMENT.md](./DEPLOYMENT.md) for security details.

## Accessibility

- ♿ WCAG 2.1 AA compliant
- 🔊 Screen reader support
- 🎨 Proper color contrast
- 👆 Minimum 44x44 touch targets
- ⌨️ Keyboard navigation

## Environment Configuration

Create `.env.local` (development) or `.env.production` (production):

```env
EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_API_KEY=your_api_key
EXPO_PUBLIC_ENV=production
EXPO_PUBLIC_SENTRY_DSN=your_sentry_dsn
EXPO_PUBLIC_ENABLE_ANALYTICS=true
EXPO_PUBLIC_ENABLE_ERROR_LOGGING=true
```

## API Integration

The app uses a custom API client (`utils/apiClient.ts`) for:
- Automatic request/response handling
- Token management
- Error handling and logging
- Retry logic

Example usage:
```typescript
import { apiClient } from '@/utils/apiClient';

const response = await apiClient.get('/services');
if (response.success) {
  console.log(response.data);
}
```

## Error Handling

Comprehensive error handling with:
- Global error boundary
- API error recovery
- Storage error handling
- User-friendly error messages
- Sentry integration (optional)

## Testing

### Development Testing
```bash
# Web browser testing
bun run start-web

# iOS Simulator
bun run start -- --ios

# Android Emulator
bun run start -- --android

# Physical device
bun run start
# Scan QR code with Expo Go app
```

## Performance

- Optimized bundle size
- Lazy loading of screens
- Efficient re-rendering
- Image optimization
- Code splitting

## Troubleshooting

### App Won't Start
```bash
# Clear cache
bun run start --clear

# Reinstall dependencies
rm -rf node_modules bun.lock
bun install
```

### Build Fails
- Check Node.js version (16+)
- Verify environment variables
- Clear EAS cache: `eas cache --platform ios`

### API Connection Issues
- Verify API_URL in environment
- Check API server is running
- Test with curl/Postman

## Contributing

1. Create feature branch
2. Make changes
3. Run linting and type check
4. Submit pull request

## License

Private project - Rork Platform

## Support

- 📧 **Email**: support@fidooo-vet-app.com
- �� **Issues**: GitHub Issues
- 💬 **Community**: Rork Platform Forums

## Roadmap

- [ ] Real-time chat with vets
- [ ] Video consultations
- [ ] Prescription management
- [ ] Appointment reminders (push notifications)
- [ ] Loyalty rewards program
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

## Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev)
- [EAS CLI Documentation](https://docs.expo.dev/build)
- [Rork Platform](https://rork.com)

---

**Built with ❤️ for pet owners and veterinarians**

Version: 1.0.0 | Last Updated: November 2024
