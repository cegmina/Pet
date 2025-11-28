/**
 * API client configuration and utilities
 */

import ENV from '@/config/environment';
import { handleNetworkError, handleResponseError } from '@/utils/errorHandler';

export interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  token?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}

/**
 * Base API client
 */
export const apiClient = {
  /**
   * Make authenticated API requests
   */
  async request<T = any>(
    endpoint: string,
    options: ApiOptions = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${ENV.API_URL}${endpoint}`;
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      // Add authorization header if token is provided
      if (options.token) {
        headers['Authorization'] = `Bearer ${options.token}`;
      } else if (ENV.API_KEY) {
        headers['X-API-Key'] = ENV.API_KEY;
      }

      const response = await fetch(url, {
        method: options.method || 'GET',
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        const error = handleResponseError(response.status, data);
        return {
          success: false,
          error: error.message,
          statusCode: response.status,
        };
      }

      return {
        success: true,
        data,
        statusCode: response.status,
      };
    } catch (error) {
      const appError = handleNetworkError(error);
      return {
        success: false,
        error: appError.message,
      };
    }
  },

  /**
   * GET request
   */
  async get<T = any>(endpoint: string, options?: Omit<ApiOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  },

  /**
   * POST request
   */
  async post<T = any>(endpoint: string, body?: any, options?: Omit<ApiOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  },

  /**
   * PUT request
   */
  async put<T = any>(endpoint: string, body?: any, options?: Omit<ApiOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  },

  /**
   * DELETE request
   */
  async delete<T = any>(endpoint: string, options?: Omit<ApiOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  },

  /**
   * PATCH request
   */
  async patch<T = any>(endpoint: string, body?: any, options?: Omit<ApiOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
  },
};

export default apiClient;
