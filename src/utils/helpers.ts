/**
 * @file Funções auxiliares e utilitárias para o aplicativo.
 */

/**
 * Formata o ID de um Pokémon para o formato de três dígitos com uma cerquilha.
 * Exemplo: 1 -> #001, 25 -> #025, 151 -> #151
 *
 * @param id O ID numérico do Pokémon.
 * @returns O ID formatado como string.
 */
export const formatPokemonId = (id: number): string => {
  return `#${String(id).padStart(3, '0')}`;
};

/**
 * Converte a primeira letra de uma string para maiúscula.
 * Exemplo: "bulbasaur" -> "Bulbasaur"
 *
 * @param text A string a ser capitalizada.
 * @returns A string com a primeira letra maiúscula.
 */
export const capitalizeFirstLetter = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Retorna a URL da imagem oficial (sprite) de um Pokémon.
 *
 * @param id O ID do Pokémon.
 * @returns A URL completa da imagem.
 */
export const getPokemonImageUrl = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};
