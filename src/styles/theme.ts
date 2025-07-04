/**
 * @file Define o tema global do aplicativo, incluindo cores, tipografia e espaçamento.
 */

const palette = {
    black: '#000000',
    white: '#FFFFFF',
    red: '#E53935',
    blue: '#1E88E5',
    green: '#43A047',
    yellow: '#FDD835',
    gray: '#757575',
    lightGray: '#F5F5F5',
};

export const theme = {
    colors: {
        primary: palette.red,
        background: palette.lightGray,
        text: palette.black,
        cardBackground: palette.white,
        white: palette.white,
        black: palette.black,
        // Cores baseadas nos tipos de Pokémon
        type: {
            normal: '#A8A77A',
            fire: '#EE8130',
            water: '#6390F0',
            electric: '#F7D02C',
            grass: '#7AC74C',
            ice: '#96D9D6',
            fighting: '#C22E28',
            poison: '#A33EA1',
            ground: '#E2BF65',
            flying: '#A98FF3',
            psychic: '#F95587',
            bug: '#A6B91A',
            rock: '#B6A136',
            ghost: '#735797',
            dragon: '#6F35FC',
            dark: '#705746',
            steel: '#B7B7CE',
            fairy: '#D685AD',
        },
    },
    spacing: {
        xs: 4,
        s: 8,
        m: 16,
        l: 24,
        xl: 40,
    },
    typography: {
        h1: {
            fontSize: 32,
            fontWeight: 'bold',
        },
        h2: {
            fontSize: 24,
            fontWeight: 'bold',
        },
        body: {
            fontSize: 16,
        },
        caption: {
            fontSize: 12,
            color: palette.gray,
        },
    },
    radius: {
        s: 4,
        m: 10,
        l: 25,
    },
};

export type AppTheme = typeof theme;
export type PokemonType = keyof typeof theme.colors.type;
