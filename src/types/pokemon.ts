/**
 * @file Contém todas as tipagens globais relacionadas a Pokémons.
 * @author Seu Nome
 */

/**
 * @interface BasePokemon
 * @description Representa os dados básicos de um Pokémon, usados em listagens.
 */
export interface BasePokemon {
  id: number;
  name: string;
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: {
      name: string;
    };
  }[];
}

/**
 * @interface PokemonAbility
 * @description Define a estrutura de uma habilidade de um Pokémon.
 */
export interface PokemonAbility {
  pokemon_v2_ability: {
    name: string;
  };
}

/**
 * @interface PokemonDetails
 * @description Representa todos os detalhes de um Pokémon, incluindo estatísticas e evoluções.
 * @extends BasePokemon
 */
export interface PokemonDetails extends BasePokemon {
  height: number;
  weight: number;
  pokemon_v2_pokemonabilities: PokemonAbility[];
  pokemon_v2_pokemonspecy: {
    pokemon_v2_pokemoncolor: {
      name: string;
    };
    pokemon_v2_evolutionchain: {
      pokemon_v2_pokemonspecies: {
        id: number;
        name: string;
      }[];
    };
  };
}

/**
 * @interface EvolutionNode
 * @description Representa um nó na cadeia de evolução.
 */
export interface EvolutionNode {
  id: number;
  name: string;
}

/**
 * @interface GQLQueryResponse
 * @description Tipagem genérica para a resposta das queries GraphQL da PokeAPI.
 */
export interface GQLQueryResponse<T> {
  pokemon_v2_pokemon: T[];
}
