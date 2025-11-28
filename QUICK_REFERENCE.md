# Quick Reference Guide

## For End Users

### Download & Install
- **iOS**: App Store → Search "Fidooo Vet" → Download
- **Android**: Google Play → Search "Fidooo Vet" → Install
- **Web**: Visit https://fidooo-vet-app.com

### Create Account
1. Open app
2. Go to Profile tab
3. Click "Register"
4. Enter email, password, pet info
5. Verify email
6. Start using!

### Main Features
- 🏥 **Home**: Dashboard with pet info & reminders
- 🔬 **Services**: Browse vet services & book
- 👨‍⚕️ **Doctors**: Find vets & view schedules
- 👤 **Profile**: Account settings & pet management

### Need Help?
- In-app: Profile → Help
- Email: support@fidooo-vet-app.com
- Website: https://fidooo-vet-app.com/support

---

## For Developers

### Setup (5 minutes)
```bash
git clone <repo-url>
cd Pet
bun install
cp .env.example .env.local
bun run start-web
```

### Key Commands
```bash
bun run start-web        # Web preview
bun run start            # Mobile preview
bun run lint             # Check code
bun run type-check       # Check types
bun run build:ios        # Build for App Store
bun run build:android    # Build for Play Store
```

### Important Files
- `app/` - Screen components (Expo Router)
- `utils/` - Helper functions
- `contexts/` - State management (UserContext)
- `config/environment.ts` - Configuration
- `.env.local` - Local environment vars

### Common Tasks
**Add new screen:**
```bash
mkdir -p app/(tabs)/[feature]
touch app/(tabs)/[feature]/{_layout.tsx,index.tsx}
```

**Add API call:**
```typescript
import { apiClient } from '@/utils/apiClient';

const response = await apiClient.get('/endpoint');
if (response.success) {
  // Handle success
}
```

**Handle errors:**
```typescript
import { AppError, errorHandler } from '@/utils/errorHandler';
try {
  // Your code
} catch (error) {
  const appError = errorHandler.handleNetworkError(error);
  // Show to user
}
```

### Test Platforms
- Web: `bun run start-web` in browser
- iOS Simulator: `bun run start -- --ios`
- Android Emulator: `bun run start -- --android`
- Physical Device: `bun run start` + Expo Go app

---

## For Deployment

### Pre-Deploy Checklist
- [ ] Update version in `app.json`
- [ ] Run `bun run lint`
- [ ] Run `bun run type-check`
- [ ] Test on real iOS and Android devices
- [ ] Review PRODUCTION_CHECKLIST.md

### Deploy iOS
```bash
eas build --platform ios --profile production
eas submit --platform ios --profile production
```

### Deploy Android
```bash
eas build --platform android --profile production
eas submit --platform android --profile production
```

### Deploy Web
```bash
bun run build:web
# Deploy to Vercel/Netlify/hosting
```

### Post-Deploy
1. Monitor error logs (Sentry)
2. Check analytics
3. Respond to user feedback
4. Plan next updates

---

## Environment Variables

### Development (.env.local)
```env
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_ENV=development
EXPO_PUBLIC_ENABLE_ERROR_LOGGING=true
```

### Production (.env.production)
```env
EXPO_PUBLIC_API_URL=https://api.production.com
EXPO_PUBLIC_API_KEY=secret_key
EXPO_PUBLIC_ENV=production
EXPO_PUBLIC_SENTRY_DSN=your_sentry_dsn
EXPO_PUBLIC_ENABLE_ANALYTICS=true
EXPO_PUBLIC_ENABLE_ERROR_LOGGING=true
```

---

## API Integration Example

```typescript
// 1. Define service
// services/authService.ts
import { apiClient } from '@/utils/apiClient';

export const authService = {
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  
  register: (email: string, password: string) =>
    apiClient.post('/auth/register', { email, password }),
};

// 2. Use in component
import { authService } from '@/services/authService';

const handleLogin = async (email: string, password: string) => {
  const response = await authService.login(email, password);
  if (response.success) {
    // Handle success
  } else {
    // Show error: response.error
  }
};
```

---

## Troubleshooting

### App Won't Start
```bash
bun run start --clear  # Clear cache
rm -rf node_modules   # Remove dependencies
bun install          # Reinstall
```

### Build Fails
- Check Node version: `node -v` (need 16+)
- Check internet connection
- Check env variables are set
- Clear cache: `bun run prebuild --clean`

### API Not Working
- Verify API_URL in `.env.local`
- Check API server is running
- Test with curl: `curl https://api-url/endpoint`
- Check error logs in console

### TypeScript Errors
```bash
bun run type-check  # See all errors
# Fix errors in code
# Should disappear after saving
```

---

## Resources

- 📖 [Full README](./README.md)
- 👨‍💻 [Developer Guide](./DEVELOPER_GUIDE.md)
- 📱 [User Guide](./USER_GUIDE.md)
- 🚀 [Deployment Guide](./DEPLOYMENT.md)
- ✅ [Production Checklist](./PRODUCTION_CHECKLIST.md)
- 📋 [Production Summary](./PRODUCTION_READY.md)
- [Expo Docs](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)

---

## Support Contacts

- **Development**: See DEVELOPER_GUIDE.md
- **Deployment**: See DEPLOYMENT.md
- **Users**: support@fidooo-vet-app.com
- **GitHub Issues**: Report bugs on GitHub

---

**Last Updated**: November 28, 2024
**Version**: 1.0.0
