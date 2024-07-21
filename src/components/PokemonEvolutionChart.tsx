import React from 'react';
import { Paper, Typography, Box, Avatar } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const EvolutionStage = ({ pokemon }: { pokemon: any }) => (
    <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar src={pokemon.sprite} alt={pokemon.name} sx={{ width: 80, height: 80 }} />
        <Typography variant="subtitle1">{pokemon.name}</Typography>
    </Box>
);

const PokemonEvolutionChart = ({ evolutionChain }: { evolutionChain: any[] }) => {
    if (!evolutionChain || evolutionChain.length === 0) {
        return null;
    }

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Evolution Chain</Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
                {evolutionChain.map((pokemon: any, index: any) => (
                    <React.Fragment key={pokemon.id}>
                        {index > 0 && <ArrowForwardIcon sx={{ mx: 2 }} />}
                        <EvolutionStage pokemon={pokemon} />
                    </React.Fragment>
                ))}
            </Box>
        </Paper>
    );
};

export default PokemonEvolutionChart;