import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { theme } from '../styles/theme';

export const LoadingIndicator: React.FC = () => (
  <View style={styles.centered}>
    <ActivityIndicator size="large" color={theme.colors.primary} />
  </View>
);

export const ErrorMessage: React.FC<{ message: string; onRetry: () => void }> = ({
  message,
  onRetry,
}) => (
  <View style={styles.centered}>
    <Text style={styles.errorText}>Ocorreu um erro: {message}</Text>
    <Button title="Tentar Novamente" onPress={onRetry} color={theme.colors.primary} />
  </View>
);

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.l,
  },
  errorText: {
    ...theme.typography.body,
    marginBottom: theme.spacing.m,
    textAlign: 'center',
  },
});
