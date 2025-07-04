import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery } from 'urql';
import { GET_POKEMON_DETAILS } from '../api/queries';
import { PokemonDetails, GQLQueryResponse, EvolutionNode } from '../types/pokemon';
import { LoadingIndicator, ErrorMessage } from '../components/common';
import { capitalizeFirstLetter, formatPokemonId, getPokemonImageUrl } from '../utils/helpers';
import { theme, PokemonType } from '../styles/theme';
import TypeBadge from '../components/TypeBadge';
import FavoriteButton from '../components/FavoriteButton';

type DetailsScreenRouteProp = RouteProp<{ params: { pokemonId: number } }, 'params'>;

const DetailsScreen: React.FC = () => {
  const route = useRoute<DetailsScreenRouteProp>();
  const { pokemonId } = route.params;

  const [{ data, fetching, error }, executeQuery] = useQuery<GQLQueryResponse<PokemonDetails>>({
    query: GET_POKEMON_DETAILS,
    variables: { id: pokemonId },
  });

  const pokemon = data?.pokemon_v2_pokemon[0];

  if (fetching) return <LoadingIndicator />;
  if (error || !pokemon) {
    return <ErrorMessage message={error?.message || 'Pokémon não encontrado.'} onRetry={executeQuery} />;
  }

  const primaryType = pokemon.pokemon_v2_pokemontypes[0]?.pokemon_v2_type.name as PokemonType || 'normal';
  const backgroundColor = theme.colors.type[primaryType] || theme.colors.type.normal;
  const evolutionChain: EvolutionNode[] = pokemon.pokemon_v2_pokemonspecy.pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies;

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>{capitalizeFirstLetter(pokemon.name)}</Text>
          <Text style={styles.id}>{formatPokemonId(pokemon.id)}</Text>
        </View>
        <FavoriteButton pokemon={pokemon} size={32}/>
      </View>
      <View style={styles.typesContainer}>
        {pokemon.pokemon_v2_pokemontypes.map(({ pokemon_v2_type }) => (
          <TypeBadge key={pokemon_v2_type.name} type={pokemon_v2_type.name as PokemonType} />
        ))}
      </View>
      <Image source={{ uri: getPokemonImageUrl(pokemon.id) }} style={styles.image} />
      
      <View style={styles.detailsCard}>
        <Text style={styles.sectionTitle}>Características</Text>
        <View style={styles.statsRow}>
            <Text style={styles.statLabel}>Altura</Text><Text style={styles.statValue}>{pokemon.height / 10} m</Text>
        </View>
        <View style={styles.statsRow}>
            <Text style={styles.statLabel}>Peso</Text><Text style={styles.statValue}>{pokemon.weight / 10} kg</Text>
        </View>

        <Text style={styles.sectionTitle}>Habilidades</Text>
        {pokemon.pokemon_v2_pokemonabilities.map(({ pokemon_v2_ability }) => (
            <Text key={pokemon_v2_ability.name} style={styles.abilityText}>- {capitalizeFirstLetter(pokemon_v2_ability.name)}</Text>
        ))}

        <Text style={styles.sectionTitle}>Evoluções</Text>
        <View style={styles.evolutionContainer}>
            {evolutionChain.map((evo, index) => (
                <React.Fragment key={evo.id}>
                    <View style={styles.evolutionItem}>
                        <Image source={{ uri: getPokemonImageUrl(evo.id) }} style={styles.evolutionImage} />
                        <Text style={styles.evolutionName}>{capitalizeFirstLetter(evo.name)}</Text>
                    </View>
                    {index < evolutionChain.length - 1 && <Text style={styles.arrow}>→</Text>}
                </React.Fragment>
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: theme.spacing.l },
    name: { ...theme.typography.h1, color: theme.colors.white },
    id: { ...theme.typography.h2, color: 'rgba(255,255,255,0.7)' },
    typesContainer: { flexDirection: 'row', paddingHorizontal: theme.spacing.l },
    image: { width: 250, height: 250, alignSelf: 'center', marginVertical: theme.spacing.l },
    detailsCard: { backgroundColor: theme.colors.cardBackground, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: theme.spacing.l, minHeight: 400},
    sectionTitle: { ...theme.typography.h2, marginTop: theme.spacing.l, marginBottom: theme.spacing.m },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: theme.spacing.s },
    statLabel: { ...theme.typography.body, fontWeight: 'bold' },
    statValue: { ...theme.typography.body },
    abilityText: { ...theme.typography.body, marginLeft: theme.spacing.m, marginBottom: theme.spacing.xs },
    evolutionContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
    evolutionItem: { alignItems: 'center' },
    evolutionImage: { width: 80, height: 80 },
    evolutionName: { ...theme.typography.caption, color: theme.colors.text, marginTop: theme.spacing.xs },
    arrow: { fontSize: 24, marginHorizontal: theme.spacing.s, color: theme.colors.text }
});

export default DetailsScreen;
