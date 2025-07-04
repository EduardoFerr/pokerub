/**
 * @file Define todas as queries GraphQL usadas no aplicativo.
 */
import { gql } from 'urql';

/**
 * @const GET_POKEMON_LIST
 * @description Query para buscar uma lista paginada de Pokémons com seus tipos.
 */
export const GET_POKEMON_LIST = gql`
  query GetPokemonList($limit: Int!, $offset: Int!) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset, order_by: { id: asc }) {
      id
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

/**
 * @const GET_POKEMON_DETAILS
 * @description Query para buscar os detalhes completos de um Pokémon específico.
 */
export const GET_POKEMON_DETAILS = gql`
  query GetPokemonDetails($id: Int!) {
    pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
      id
      name
      height
      weight
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemonspecy {
        pokemon_v2_pokemoncolor {
          name
        }
        pokemon_v2_evolutionchain {
          pokemon_v2_pokemonspecies(order_by: { order: asc }) {
            id
            name
          }
        }
      }
    }
  }
`;
