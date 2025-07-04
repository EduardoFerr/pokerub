/**
 * @file Configuração centralizada do cliente Axios.
 */
import axios from 'axios';

const API_URL = 'https://beta.pokeapi.co/graphql/v1beta';

/**
 * Instância do Axios pré-configurada com a URL base da PokeAPI.
 */
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
