import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useFavoritesStore } from '../store/favoritesStore';
import { BasePokemon } from '../types/pokemon';
import { theme } from '../styles/theme';

type FavoriteButtonProps = {
  pokemon: BasePokemon;
  size?: number;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ pokemon, size = 30 }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const isFav = isFavorite(pokemon.id);

  const handlePress = () => {
    if (isFav) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  return (
    <Pressable onPress={handlePress} style={styles.button}>
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
          fill={isFav ? theme.colors.primary : 'none'}
          stroke={isFav ? theme.colors.primary : theme.colors.text}
          strokeWidth="2"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </Svg>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: theme.spacing.s,
  },
});

export default FavoriteButton;

