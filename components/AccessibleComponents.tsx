/**
 * Common UI components with accessibility built-in
 */

import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  View,
  ActivityIndicator,
  AccessibilityRole,
} from 'react-native';
import Colors from '@/constants/colors';
import { a11y } from '@/utils/accessibility';

// Accessible Button Component
interface AccessibleButtonProps extends TouchableOpacityProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

export function AccessibleButton({
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  ...props
}: AccessibleButtonProps) {
  const getBackgroundColor = () => {
    if (disabled) return Colors.border;
    switch (variant) {
      case 'secondary':
        return Colors.gray;
      case 'danger':
        return '#e74c3c';
      default:
        return Colors.primary;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      accessible={true}
      accessibilityRole={AccessibilityRole.button}
      accessibilityLabel={label}
      accessibilityHint={disabled ? 'This button is disabled' : undefined}
      accessibilityState={{ disabled: disabled || loading }}
      style={[
        {
          backgroundColor: getBackgroundColor(),
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 44, // Minimum touch target
        },
        props.style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

// Accessible Text Input
interface AccessibleTextInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  editable?: boolean;
  required?: boolean;
  error?: string;
}

export function AccessibleTextInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  editable = true,
  required = false,
  error,
}: AccessibleTextInputProps) {
  return (
    <View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          marginBottom: 8,
          color: Colors.text.primary,
        }}
        accessibilityRole={AccessibilityRole.label}
      >
        {label}
        {required && <Text style={{ color: '#e74c3c' }}>*</Text>}
      </Text>
      <View
        accessible={true}
        accessibilityRole={AccessibilityRole.spinbutton}
        accessibilityLabel={label}
        accessibilityHint={a11y.inputHint(label, required)}
        accessibilityState={{ disabled: !editable }}
      >
        {/* Placeholder for actual TextInput - implement based on your needs */}
        <View
          style={{
            borderWidth: 1,
            borderColor: error ? '#e74c3c' : Colors.border,
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 10,
            minHeight: 44, // Minimum touch target
          }}
        >
          <Text
            style={{
              color: value ? Colors.text.primary : Colors.text.secondary,
            }}
          >
            {value || placeholder}
          </Text>
        </View>
      </View>
      {error && (
        <Text
          style={{ color: '#e74c3c', fontSize: 14, marginTop: 4 }}
          accessibilityRole={AccessibilityRole.alert}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
