/**
 * Accessibility utilities
 */

import { AccessibilityRole, AccessibilityInfo } from 'react-native';

export const a11y = {
  /**
   * Get accessible label for button
   */
  buttonLabel: (label: string, disabled?: boolean): string => {
    return disabled ? `${label}, disabled` : label;
  },

  /**
   * Get accessible hint for input
   */
  inputHint: (fieldName: string, required?: boolean): string => {
    const hint = `Enter ${fieldName}`;
    return required ? `${hint}, required` : hint;
  },

  /**
   * Accessible role for interactive element
   */
  roles: {
    button: 'button' as AccessibilityRole,
    link: 'link' as AccessibilityRole,
    switch: 'switch' as AccessibilityRole,
    checkbox: 'checkbox' as AccessibilityRole,
    radio: 'radio' as AccessibilityRole,
    tab: 'tab' as AccessibilityRole,
    menuitem: 'menuitem' as AccessibilityRole,
    progressbar: 'progressbar' as AccessibilityRole,
    spinbutton: 'spinbutton' as AccessibilityRole,
  },

  /**
   * Screen reader announcement
   */
  async announce(message: string): Promise<void> {
    try {
      await AccessibilityInfo.announceForAccessibility(message);
    } catch (error) {
      console.warn('Failed to announce for accessibility:', error);
    }
  },

  /**
   * Check if screen reader is enabled
   */
  async isScreenReaderEnabled(): Promise<boolean> {
    try {
      return await AccessibilityInfo.isScreenReaderEnabled();
    } catch {
      return false;
    }
  },

  /**
   * Check if bold text is enabled
   */
  async isBoldTextEnabled(): Promise<boolean> {
    try {
      return await AccessibilityInfo.isBoldTextEnabled();
    } catch {
      return false;
    }
  },
};

export default a11y;
