import React from 'react';
import { trpc } from '../utils/trpc';
import { Box, Typography, CircularProgress } from '@mui/material';
import { FilterablePokedexTable } from '../components/FilterablePokedexTable';
import NavBar from '@/components/navBar';
import Head from 'next/head';


const FilterablePokedexPage: React.FC = () => {
    const pokemonQuery = trpc.pokemon.getAllPokemon.useQuery();

    if (pokemonQuery.isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (pokemonQuery.isError) {
        return (
            <Box p={3}>
                <Typography color="error">Error loading Pokemon data</Typography>
            </Box>
        );
    }

    return (
        <>
            <Head>
                <title>Pokemon Type - Pokedex</title>
            </Head>
            <NavBar />
            <Box p={3}>
                <Typography variant="h4" gutterBottom>
                    Filterable Pokedex
                </Typography>
                <FilterablePokedexTable pokemons={pokemonQuery.data} />
            </Box>
        </>
    );
};

export default FilterablePokedexPage;
