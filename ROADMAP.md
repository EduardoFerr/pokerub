# Roadmap do Projeto PokeRub

Este documento descreve o que foi implementado no projeto e o que poderia ser melhorado ou adicionado com mais tempo.

---

## Histórias Atendidas

### História 1: Visualizar, Filtrar e Consultar Pokémon

- **Visualização:**  
  A tela principal (HomeScreen) mostra a lista completa de pokémons, carregando mais itens conforme o usuário faz scroll infinito. Cada pokémon aparece num card personalizado com nome, ID e uma cor de fundo baseada no tipo principal.

- **Filtragem:**  
  A busca funciona via barra de pesquisa (SearchBar) na tela principal. A busca é feita direto na API da PokeAPI com debounce de 300ms, para não sobrecarregar e garantir pesquisa em toda a base, não só nos itens já carregados.

- **Consulta de características:**  
  Ao clicar no card, o usuário vai para a DetailsScreen, que mostra detalhes completos (tipo, altura, peso, habilidades) consultando o endpoint específico do pokémon.

---

### História 2: Visualizar Evoluções

- **Cadeia de evolução:**  
  Na DetailsScreen tem uma seção que exibe visualmente toda a cadeia de evolução do pokémon, com imagens e nomes de cada estágio.

- **Evoluir o pokémon:**  
  Não implementei a mecânica de evoluir o pokémon, mas a visualização da cadeia de evolução permite entender as possibilidades.

---

### História 3: Salvar Pokémon Favoritos

- **Salvar favoritos:**  
  Um botão de favoritos (FavoriteButton, com icone de coração) está na tela de detalhes e opcionalmente nos cards. O estado dos favoritos é gerenciado globalmente com Zustand.

- **Persistência:**  
  Os favoritos são salvos localmente no dispositivo via AsyncStorage, garantindo que não se percam ao fechar o app.

- **Consultar favoritos:**  
  A aba "Favoritos" (FavoritesScreen) exibe todos os pokémons marcados, para consulta rápida.

---

## O que adicionaria com mais tempo

- **Testes unitários e de integração:**  
  Criaria testes para hooks customizados  e componentes  com React Native Testing Library para evitar regressões.

- **Animações e transições:**  
  Implementaria transições mais suaves, tipo shared element transitions, e microinterações nos botões e cards para melhorar a experiência.

- **Modo offline:**  
  Cache mais robusto (com react-query ou redux-persist) para permitir consulta dos pokémons já carregados mesmo sem internet.

- **Tratamento de erros detalhado:**  
  Criaria componentes específicos para erros de rede, API fora do ar, etc, em vez de mensagens genéricas.

- **Filtros avançados:**  
  Permitir filtro por tipo, geração ou outras características direto na tela principal.

---

## O que faria diferente

- **Gerenciamento de estado da API:**  
  Se o app crescesse, usaria React Query (TanStack Query) para gerenciar estado do servidor.

- **Estilização:**  
  Para projetos maiores, adotaria styled-components ou Restyle para um sistema de design escalável e temático.
