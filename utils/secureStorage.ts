/**
 * Secure storage utilities for sensitive data
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleStorageError } from '@/utils/errorHandler';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const secureStorage = {
  /**
   * Save authentication token
   */
  async saveToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      throw handleStorageError(error, 'saving token');
    }
  },

  /**
   * Get stored authentication token
   */
  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      throw handleStorageError(error, 'retrieving token');
    }
  },

  /**
   * Remove authentication token
   */
  async removeToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      throw handleStorageError(error, 'removing token');
    }
  },

  /**
   * Save refresh token
   */
  async saveRefreshToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(REFRESH_TOKEN_KEY, token);
    } catch (error) {
      throw handleStorageError(error, 'saving refresh token');
    }
  },

  /**
   * Get refresh token
   */
  async getRefreshToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      throw handleStorageError(error, 'retrieving refresh token');
    }
  },

  /**
   * Save user data
   */
  async saveUser(user: any): Promise<void> {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      throw handleStorageError(error, 'saving user data');
    }
  },

  /**
   * Get user data
   */
  async getUser(): Promise<any | null> {
    try {
      const data = await AsyncStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      throw handleStorageError(error, 'retrieving user data');
    }
  },

  /**
   * Clear all authentication data
   */
  async clearAuth(): Promise<void> {
    try {
      await Promise.all([
        AsyncStorage.removeItem(TOKEN_KEY),
        AsyncStorage.removeItem(REFRESH_TOKEN_KEY),
        AsyncStorage.removeItem(USER_KEY),
      ]);
    } catch (error) {
      throw handleStorageError(error, 'clearing auth data');
    }
  },
};

export default secureStorage;
