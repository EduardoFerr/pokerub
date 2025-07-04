import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PokemonType, theme } from '../styles/theme';
import { capitalizeFirstLetter } from '../utils/helpers';

type TypeBadgeProps = {
  type: PokemonType;
};

const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const backgroundColor = theme.colors.type[type] || theme.colors.type.normal;

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={styles.text}>{capitalizeFirstLetter(type)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.l,
    marginRight: theme.spacing.s,
  },
  text: {
    color: theme.colors.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default TypeBadge;
