import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { usePokemonList } from '../hooks/usePokemonList';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import { LoadingIndicator, ErrorMessage } from '../components/common';
import { theme } from '../styles/theme';

const HomeScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { pokemons, loading, error, fetchMore, refresh } = usePokemonList(searchTerm);

  if (error && pokemons.length === 0) {
    return <ErrorMessage message={error.message} onRetry={refresh} />;
  }

  if (loading && pokemons.length === 0) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <SearchBar value={searchTerm} onChangeText={setSearchTerm} />
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        numColumns={1}
        contentContainerStyle={styles.list}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <LoadingIndicator /> : null}
        onRefresh={refresh}
        refreshing={loading}
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
  },
});

export default HomeScreen;
