import React, { ReactNode, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Colors from '@/constants/colors';
import { logError } from '@/utils/errorHandler';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logError(error, `Error Boundary: ${errorInfo.componentStack}`);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: Colors.text.primary,
                  marginBottom: 10,
                }}
              >
                Oops! Something went wrong
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: Colors.text.secondary,
                  marginBottom: 20,
                  textAlign: 'center',
                }}
              >
                We're sorry for the inconvenience. The app encountered an unexpected error.
              </Text>

              {__DEV__ && this.state.error && (
                <View
                  style={{
                    backgroundColor: '#ffe0e0',
                    borderLeftWidth: 4,
                    borderLeftColor: Colors.error || '#e74c3c',
                    padding: 10,
                    borderRadius: 4,
                    marginBottom: 20,
                    width: '100%',
                  }}
                >
                  <Text
                    style={{
                      color: '#721c24',
                      fontSize: 12,
                      fontFamily: 'monospace',
                    }}
                  >
                    {this.state.error.toString()}
                  </Text>
                </View>
              )}

              <TouchableOpacity
                onPress={this.reset}
                style={{
                  backgroundColor: Colors.primary,
                  paddingVertical: 12,
                  paddingHorizontal: 32,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
                  Try Again
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}
