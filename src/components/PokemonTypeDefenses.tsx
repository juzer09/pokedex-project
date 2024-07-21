import React from 'react';
import { Paper, Typography, Grid, Box } from '@mui/material';
import { calculateTypeEffectiveness } from '../utils/typeEffectiveness';
import { typeColors } from './typeColors';

const EffectivenessBox = ({ type, effectiveness }: { type: string, effectiveness: number }) => (
    <Box
        sx={{
            backgroundColor: typeColors[type],
            color: 'white',
            p: 1,
            textAlign: 'center',
            borderRadius: 1,
            fontSize: '0.8rem',
        }}
        className="effectiveness-box"
    >
        {type.charAt(0).toUpperCase() + type.slice(1)}
        <br />
        <span>
            {effectiveness === 0 ? '0' : effectiveness}x
        </span>
    </Box>
);

const PokemonTypeDefenses = ({ types }: { types: any[] }) => {
    const effectiveness = calculateTypeEffectiveness(types.map(t => t.name));

    return (
        <Paper sx={{ p: 2 }} className="sp__box">
            <Typography variant="h6" gutterBottom>Type Defenses</Typography>
            <Grid container spacing={1}>
                {Object.entries(effectiveness).map(([type, value]) => (
                    <Grid item xs={3} sm={2} md={1.5} key={type}>
                        <EffectivenessBox type={type} effectiveness={value} />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default PokemonTypeDefenses;