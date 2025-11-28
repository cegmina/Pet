/**
 * Input validation utilities
 */

export const validation = {
  /**
   * Validate email format
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate phone number
   */
  isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
  },

  /**
   * Validate password strength
   */
  isStrongPassword(password: string): boolean {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  },

  /**
   * Validate required field
   */
  isRequired(value: any): boolean {
    return value !== null && value !== undefined && value !== '';
  },

  /**
   * Sanitize string input (basic XSS prevention)
   */
  sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove angle brackets
      .trim();
  },

  /**
   * Validate form data
   */
  validateEmail(email: string): { valid: boolean; error?: string } {
    if (!this.isRequired(email)) {
      return { valid: false, error: 'Email is required' };
    }
    if (!this.isValidEmail(email)) {
      return { valid: false, error: 'Please enter a valid email' };
    }
    return { valid: true };
  },

  /**
   * Validate password
   */
  validatePassword(password: string): { valid: boolean; error?: string } {
    if (!this.isRequired(password)) {
      return { valid: false, error: 'Password is required' };
    }
    if (password.length < 6) {
      return { valid: false, error: 'Password must be at least 6 characters' };
    }
    return { valid: true };
  },

  /**
   * Validate name field
   */
  validateName(name: string): { valid: boolean; error?: string } {
    if (!this.isRequired(name)) {
      return { valid: false, error: 'Name is required' };
    }
    if (name.length < 2) {
      return { valid: false, error: 'Name must be at least 2 characters' };
    }
    return { valid: true };
  },
};

export default validation;
