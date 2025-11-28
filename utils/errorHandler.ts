/**
 * Centralized error handling utilities
 */

import ENV from '@/config/environment';

export enum ErrorType {
  NETWORK = 'NETWORK_ERROR',
  AUTH = 'AUTH_ERROR',
  VALIDATION = 'VALIDATION_ERROR',
  SERVER = 'SERVER_ERROR',
  UNKNOWN = 'UNKNOWN_ERROR',
  STORAGE = 'STORAGE_ERROR',
}

export class AppError extends Error {
  constructor(
    public type: ErrorType,
    message: string,
    public statusCode?: number,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Log error to console in development, to external service in production
 */
export const logError = (error: Error | AppError, context?: string) => {
  const errorInfo = {
    message: error.message,
    context,
    timestamp: new Date().toISOString(),
    stack: error.stack,
    ...(error instanceof AppError && {
      type: error.type,
      statusCode: error.statusCode,
    }),
  };

  if (ENV.IS_DEVELOPMENT) {
    console.error('[App Error]', errorInfo);
  }

  if (ENV.ENABLE_ERROR_LOGGING) {
    // TODO: Send to Sentry or other error tracking service
    // captureException(error, { extra: errorInfo });
  }
};

/**
 * Handle network errors
 */
export const handleNetworkError = (error: any): AppError => {
  logError(error, 'Network Error');

  if (error.message === 'Network request failed') {
    return new AppError(
      ErrorType.NETWORK,
      'Unable to connect to the server. Please check your internet connection.',
      undefined,
      error
    );
  }

  return new AppError(
    ErrorType.NETWORK,
    'A network error occurred. Please try again.',
    undefined,
    error
  );
};

/**
 * Handle async storage errors
 */
export const handleStorageError = (error: any, operation: string): AppError => {
  logError(error, `Storage Error - ${operation}`);

  return new AppError(
    ErrorType.STORAGE,
    `Failed to ${operation}. Please try again.`,
    undefined,
    error
  );
};

/**
 * Handle authentication errors
 */
export const handleAuthError = (error: any): AppError => {
  logError(error, 'Auth Error');

  return new AppError(
    ErrorType.AUTH,
    'Authentication failed. Please log in again.',
    401,
    error
  );
};

/**
 * Parse and handle HTTP response errors
 */
export const handleResponseError = (status: number, data?: any): AppError => {
  let message = 'An error occurred. Please try again.';
  let type = ErrorType.SERVER;

  if (status >= 400 && status < 500) {
    if (status === 401) {
      type = ErrorType.AUTH;
      message = 'Your session has expired. Please log in again.';
    } else if (status === 422) {
      type = ErrorType.VALIDATION;
      message = data?.message || 'Please check your input and try again.';
    } else {
      type = ErrorType.VALIDATION;
      message = 'Invalid request. Please try again.';
    }
  } else if (status >= 500) {
    message = 'Server error. Please try again later.';
  }

  return new AppError(type, message, status);
};

/**
 * User-friendly error messages
 */
export const getErrorMessage = (error: AppError | Error): string => {
  if (error instanceof AppError) {
    return error.message;
  }
  return 'Something went wrong. Please try again.';
};
