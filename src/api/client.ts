/**
 * @file Configuração do cliente GraphQL (urql).
 */
import {
  createClient,
  cacheExchange,
  fetchExchange,
} from 'urql';

/**
 * Cliente urql configurado para a PokeAPI v2 GraphQL.
 * Inclui os exchanges padrão e a função fetch global para garantir
 * compatibilidade com o ambiente React Native.
 */
export const client = createClient({
  url: 'https://beta.pokeapi.co/graphql/v1beta',
  exchanges: [cacheExchange, fetchExchange],
  fetch: fetch,
  suspense: false,
});
