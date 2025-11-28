/**
 * Environment configuration for the app
 * Uses expo-constants and environment variables
 */

export const ENV = {
  API_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000',
  API_KEY: process.env.EXPO_PUBLIC_API_KEY || '',
  ENV: process.env.EXPO_PUBLIC_ENV || 'development',
  SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN || '',
  SENTRY_ENV: process.env.EXPO_PUBLIC_SENTRY_ENV || 'development',
  ENABLE_ANALYTICS: process.env.EXPO_PUBLIC_ENABLE_ANALYTICS === 'true',
  ENABLE_ERROR_LOGGING: process.env.EXPO_PUBLIC_ENABLE_ERROR_LOGGING === 'true',
  IS_PRODUCTION: process.env.EXPO_PUBLIC_ENV === 'production',
  IS_DEVELOPMENT: process.env.EXPO_PUBLIC_ENV === 'development',
};

export default ENV;
