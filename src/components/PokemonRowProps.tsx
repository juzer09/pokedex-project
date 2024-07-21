// import InfoIcon from '@mui/icons-material/Info';
interface PokemonType {
    name: string;
    url: string;
}
interface PokemonMove {
    moveName: string;
    moveUrl: string;
}
interface PokemonStat {
    name: string;
    value: number;
}
interface PokemonAbility {
    [x: string]: any;
    name: string;
    url: string;
}

export interface PokemonRowProps {
    pokemon: {
        pokemonAbilities: boolean;
        id: number;
        name: string;
        types: { name: string }[];
        sprite: string;
        moves: PokemonMove[];
        stats: PokemonStat[];
        weight: number;
        height: number;
        cries: {
            latest: string;
            legacy: string;
        };
        abilities: PokemonAbility[];
    };
}
