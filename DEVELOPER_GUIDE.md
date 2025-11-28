# Developer Setup Guide

## Development Environment Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd Pet
```

### 2. Install Dependencies
```bash
# Using bun (recommended)
bun install

# Or using npm
npm install
```

### 3. Setup Environment Variables

```bash
# Copy example environment file
cp .env.example .env.local

# Edit for your development environment
# .env.local should have:
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_ENV=development
EXPO_PUBLIC_ENABLE_ANALYTICS=false
```

### 4. Run Development Server

```bash
# Web preview (recommended for quick testing)
bun run start-web

# Mobile preview (requires Expo Go app)
bun run start
# Then scan QR code with Expo Go app
```

## Project Structure

```
Pet/
├── app/                          # Expo Router screens
│   ├── _layout.tsx              # Root layout
│   ├── (tabs)/                  # Tab navigation
│   │   ├── (doctors)/           # Doctors screens
│   │   ├── (home)/              # Home screens
│   │   ├── (profile)/           # Profile screens
│   │   └── (services)/          # Services screens
├── components/                   # Reusable React components
│   ├── ErrorBoundary.tsx        # Error boundary
│   └── AccessibleComponents.tsx # A11y components
├── config/                       # Configuration files
│   └── environment.ts           # Environment config
├── constants/                    # App constants
│   └── colors.ts                # Color palette
├── contexts/                     # React contexts
│   └── UserContext.tsx          # User state management
├── mocks/                        # Mock data for development
├── utils/                        # Utility functions
│   ├── apiClient.ts             # API client
│   ├── errorHandler.ts          # Error handling
│   ├── secureStorage.ts         # Secure storage
│   ├── validation.ts            # Input validation
│   ├── accessibility.ts         # A11y utilities
│   └── logger.ts                # Logging utility
├── eas.json                      # EAS build config
├── app.json                      # Expo config
├── tsconfig.json                # TypeScript config
└── package.json                 # Dependencies
```

## Development Workflow

### 1. Code Quality
```bash
# Run linting
bun run lint

# Type checking
bun run type-check
```

### 2. Testing
- Unit tests: Configure Jest
- Integration tests: Use React Native Testing Library
- E2E tests: Configure Detox (optional)

### 3. Git Workflow
```bash
# Create feature branch
git checkout -b feature/new-feature

# Commit changes
git add .
git commit -m "feat: description of changes"

# Push and create pull request
git push origin feature/new-feature
```

## Important Files & Modules

### Error Handling (`utils/errorHandler.ts`)
- Centralized error handling
- Custom `AppError` class
- Error logging to external services

### API Client (`utils/apiClient.ts`)
- HTTP request helper
- Automatic token management
- Error response handling

### Secure Storage (`utils/secureStorage.ts`)
- Token storage
- User data persistence
- Encrypted storage wrapper

### Validation (`utils/validation.ts`)
- Email, phone, password validation
- Form input sanitization
- User-friendly error messages

### Logger (`utils/logger.ts`)
- Development-friendly logging
- Production error tracking
- Log aggregation support

## Database Integration

Currently using AsyncStorage for local storage. For backend integration:

1. Update `utils/apiClient.ts` with API endpoints
2. Create API service files in `services/` folder
3. Update `UserContext.tsx` to use real API calls
4. Add proper error handling for API failures

Example:
```typescript
// services/authService.ts
export const authService = {
  async login(email: string, password: string) {
    return apiClient.post('/auth/login', { email, password });
  },
};
```

## Custom Development Build

For native features requiring custom builds:

```bash
# Create development build
eas build --platform ios --profile development
eas build --platform android --profile development

# Install and run with dev client
bun start --dev-client
```

## Debugging

### React Native Debugger
```bash
# Start with debugger
REACT_DEBUGGER="react-devtools --inspect" expo start
```

### Console Logs
```typescript
import { logger } from '@/utils/logger';

logger.debug('Debug message', { data: 'value' });
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error message');
```

### Error Boundaries
- Wrap screens with ErrorBoundary
- Implements graceful error recovery
- Provides user-friendly error messages

## Common Development Tasks

### Add New Screen
1. Create folder in `app/(tabs)/[feature]/`
2. Create `_layout.tsx` and `index.tsx`
3. Add navigation in parent layout
4. Update types if needed

### Add New API Endpoint
1. Create service file in `services/`
2. Use `apiClient` for requests
3. Handle errors with `errorHandler`
4. Update UserContext if state needed

### Add Accessibility
1. Add `accessibilityLabel` to interactive elements
2. Use `AccessibleButton` and `AccessibleTextInput`
3. Test with screen readers
4. Check color contrast ratios

## Performance Optimization

### Bundle Size
```bash
# Analyze bundle
expo optimize
```

### Runtime Performance
- Use `React.memo` for expensive components
- Optimize images and assets
- Implement lazy loading
- Profile with React DevTools

## Deployment Checklist

Before deploying:
- [ ] Run `bun run lint`
- [ ] Run `bun run type-check`
- [ ] Update version in `app.json`
- [ ] Update CHANGELOG
- [ ] Test on iOS and Android devices
- [ ] Create git tag for release
- [ ] Push changes to main branch

## Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [EAS CLI Documentation](https://docs.expo.dev/build/introduction/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [React Documentation](https://react.dev)

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules bun.lock
bun install
bun run build:ios
```

### App Crashes on Startup
- Check console for error logs
- Verify environment variables
- Check ErrorBoundary logs
- Test with `expo start --clear`

### API Not Connecting
- Verify API_URL in `.env.local`
- Check network connectivity
- Verify API server is running
- Check network tab in DevTools

## Getting Help

- Check existing GitHub issues
- Review Expo documentation
- Join Expo community Discord
- Post in React Native forums
