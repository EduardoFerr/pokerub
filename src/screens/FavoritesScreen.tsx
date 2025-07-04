import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useFavoritesStore } from '../store/favoritesStore';
import PokemonCard from '../components/PokemonCard';
import { theme } from '../styles/theme';

const FavoritesScreen: React.FC = () => {
  const { favorites } = useFavoritesStore();

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Você ainda não tem Pokémons favoritos.</Text>
        <Text style={styles.emptySubText}>Toque no coração para adicionar!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        numColumns={1}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  list: {
    paddingHorizontal: theme.spacing.s,
    paddingTop: theme.spacing.m,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  emptyText: {
    ...theme.typography.h2,
    textAlign: 'center',
  },
  emptySubText: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginTop: theme.spacing.s,
  },
});

export default FavoritesScreen;
