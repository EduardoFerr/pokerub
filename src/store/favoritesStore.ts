/**
 * @file Store do Zustand para gerenciar os Pokémons favoritos.
 * @description Utiliza persistência com AsyncStorage para salvar os favoritos localmente.
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BasePokemon } from '../types/pokemon';

/**
 * @interface FavoritesState
 * @description Define o estado e as ações do store de favoritos.
 */
interface FavoritesState {
  favorites: BasePokemon[];
  addFavorite: (pokemon: BasePokemon) => void;
  removeFavorite: (pokemonId: number) => void;
  isFavorite: (pokemonId: number) => boolean;
}

/**
 * Hook customizado `useFavoritesStore` para interagir com o estado de favoritos.
 *
 * @returns O estado dos favoritos e as ações para manipulá-lo.
 */
export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      /**
       * Adiciona um Pokémon à lista de favoritos.
       * @param pokemon O objeto do Pokémon a ser adicionado.
       */
      addFavorite: (pokemon) =>
        set((state) => ({
          favorites: [...state.favorites, pokemon],
        })),

      /**
       * Remove um Pokémon da lista de favoritos pelo seu ID.
       * @param pokemonId O ID do Pokémon a ser removido.
       */
      removeFavorite: (pokemonId) =>
        set((state) => ({
          favorites: state.favorites.filter((p) => p.id !== pokemonId),
        })),
      
      /**
       * Verifica se um Pokémon já está na lista de favoritos.
       * @param pokemonId O ID do Pokémon a ser verificado.
       * @returns `true` se o Pokémon for um favorito, caso contrário `false`.
       */
      isFavorite: (pokemonId) => {
        const state = get();
        return state.favorites.some((p) => p.id === pokemonId);
      },
    }),
    {
      name: 'pokerub-favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
