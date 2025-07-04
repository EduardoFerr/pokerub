import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BasePokemon } from '../types/pokemon';
import { capitalizeFirstLetter, formatPokemonId, getPokemonImageUrl } from '../utils/helpers';
import { PokemonType, theme } from '../styles/theme';

type PokemonCardProps = {
  pokemon: BasePokemon;
};

type RootTabParamList = {
  Pokedex: {
    screen: 'Details';
    params: { pokemonId: number };
  };
  Favoritos: undefined;
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const navigation = useNavigation<StackNavigationProp<RootTabParamList>>();
  const primaryType = pokemon.pokemon_v2_pokemontypes[0]?.pokemon_v2_type.name as PokemonType || 'normal';
  const backgroundColor = theme.colors.type[primaryType] || theme.colors.type.normal;

  const handlePress = () => {
    navigation.navigate('Pokedex', {
      screen: 'Details',
      params: { pokemonId: pokemon.id },
    });
  };

  return (
    <Pressable
      style={[styles.container, { backgroundColor }]}
      onPress={handlePress}
    >
      <View style={styles.textContainer}>
        <Text style={styles.id}>{formatPokemonId(pokemon.id)}</Text>
        <Text style={styles.name}>{capitalizeFirstLetter(pokemon.name)}</Text>
      </View>
      <Image
        source={{ uri: getPokemonImageUrl(pokemon.id) }}
        style={styles.image}
        resizeMode="contain"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: theme.spacing.s,
    padding: theme.spacing.m,
    borderRadius: theme.radius.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  textContainer: {
    flex: 1,
  },
  id: {
    ...theme.typography.caption,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 'bold',
  },
  name: {
    ...theme.typography.h2,
    fontSize: 18,
    color: theme.colors.white,
  },
  image: {
    width: 80,
    height: 80,
    position: 'absolute',
    right: theme.spacing.s,
    bottom: theme.spacing.s,
  },
});

export default PokemonCard;
