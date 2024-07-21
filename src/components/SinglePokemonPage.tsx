import React from 'react';
import { trpc } from '../utils/trpc';
import { Box, Grid, Typography, CircularProgress, Container } from '@mui/material';

import PokemonBasicInfo from './PokemonBasicInfo';
import PokemonBaseStats from './PokemonBaseStats';
import PokemonTypeDefenses from './PokemonTypeDefenses';
import PokemonEvolutionChart from './PokemonEvolutionChart';
import PokemonEntries from './PokemonEntries';
import PokemonMoves from './PokemonMoves';

import { capitalizeFirstLetterOfEachWord } from '../inc/global-functions';
import { Margin } from '@mui/icons-material';

interface SinglePokemonPageProps {
    pokemonName: string;
}

const SinglePokemonPage: React.FC<SinglePokemonPageProps> = ({ pokemonName }) => {
    const { data: pokemon, isLoading, error } = trpc.pokemon.getPokemon.useQuery(
        pokemonName,
        { enabled: !!pokemonName }
    );

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">An error occurred: {error.message}</Typography>;
    if (!pokemon) return <Typography>Pokémon not found</Typography>;

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                {/* <Typography variant="h4" component="h1" gutterBottom className='sp__title'>
                    {//capitalizeFirstLetterOfEachWord(pokemon.name)}
                </Typography> */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <PokemonBasicInfo pokemon={pokemon} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <PokemonBaseStats stats={pokemon.stats} />
                    </Grid>
                    <Grid item xs={12}>
                        {/* <PokemonEvolutionChart evolutionChain={pokemon.evolutionChain} /> */}
                    </Grid>
                    <Grid xs={12} md={6}>
                        <PokemonMoves moves={pokemon.moves} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <PokemonTypeDefenses types={pokemon.types} />
                        <Grid item xs={12} sx={{ marginBottom: '24px' }} />
                        <PokemonEntries entries={pokemon.pokedexEntries} />
                    </Grid>
                    <Grid item xs={12}>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default SinglePokemonPage;