/**
 * @file Hook customizado para buscar e gerenciar a lista de Pokémons.
 */
import { useState, useMemo, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { GET_POKEMON_LIST } from '../api/queries';
import { BasePokemon } from '../types/pokemon';

const PAGE_SIZE = 20;

export const usePokemonList = (searchTerm: string) => {
  const [allPokemons, setAllPokemons] = useState<BasePokemon[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [offset, setOffset] = useState(0);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);


  useEffect(() => {
    setOffset(0);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const fetchPokemons = async () => {
      setFetching(true);

      const isSearching = debouncedSearchTerm.length > 0;
      const whereClause = isSearching 
        ? `where: {name: {_ilike: "%${debouncedSearchTerm}%"}}` 
        : '';
      
      const query = `
        query GetPokemonList($limit: Int!, $offset: Int!) {
          pokemon_v2_pokemon(limit: $limit, offset: $offset, order_by: {id: asc}, ${whereClause}) {
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

      try {
        const response = await axiosClient.post('', {
          query,
          variables: { limit: PAGE_SIZE, offset },
        });

        const responseData = response.data;
        if (responseData.errors) {
          throw new Error(responseData.errors[0].message);
        }

        const pokemonsData = responseData.data?.pokemon_v2_pokemon;
        if (pokemonsData) {
          setError(null);
          if (offset === 0) {
            setAllPokemons(pokemonsData);
          } else {
            setAllPokemons(prev => {
              const existingIds = new Set(prev.map(p => p.id));
              const uniqueNewPokemons = pokemonsData.filter((p: BasePokemon) => !existingIds.has(p.id));
              return [...prev, ...uniqueNewPokemons];
            });
          }
        }
      } catch (e: any) {
        setError(e);
      } finally {
        setFetching(false);
      }
    };

    fetchPokemons();
  }, [offset, debouncedSearchTerm]);

  const fetchMore = () => {
    if (fetching) return;
    setOffset(currentOffset => currentOffset + PAGE_SIZE);
  };

  const refresh = () => {
    setOffset(0);
  };
  
  const loading = fetching && allPokemons.length === 0;

  return {
    pokemons: allPokemons,
    loading,
    fetching,
    error,
    fetchMore,
    refresh,
  };
};
