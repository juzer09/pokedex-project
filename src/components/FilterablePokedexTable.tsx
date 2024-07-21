import React, { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { trpc } from '../utils/trpc';
import { PokemonTypeSelection } from './PokemonTypeSelection';
import { PokedexTable } from './PokedexTable';

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
    name: string;
    url: string;
}

interface Pokemon {
    types: any;
    pokemon: {
        id: number;
        name: string;
        types: PokemonType[];
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

interface FilterablePokedexTableProps {
    pokemons: Pokemon[];
}

export const FilterablePokedexTable: React.FC = () => {
    const [selectedType, setSelectedType] = useState<string | undefined>(undefined);

    const { data: pokemons, isLoading, error } = trpc.pokemon.getAllPokemon.useQuery({
        type: selectedType,
    });

    const { data: types } = trpc.pokemon.getAllTypes.useQuery(); // You'll need to create this new procedure

    if (isLoading) return <CircularProgress />;
    if (error) return <div>An error occurred: {error.message}</div>;

    return (
        <Box>
            <PokemonTypeSelection
                selectedType={selectedType}
                selectType={setSelectedType}
                types={types || []}
            />
            <Box mt={2}>
                <PokedexTable pokemons={pokemons || []} />
            </Box>
        </Box>
    );
};