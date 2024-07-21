import React from 'react';
import { Paper, Typography, LinearProgress, Box } from '@mui/material';
import { capitalizeFirstLetterOfEachWord } from '@/inc/global-functions';

const maxStatValue = 180;

// This component displays the base stats of a Pokemon
const PokemonBaseStats = ({ stats }: { stats: any[] }) => (
    <Paper sx={{ p: 2 }} className='sp__box'>
        <Typography variant="h5" gutterBottom>Base Stats</Typography>
        {stats.map(stat => (
            <Box key={stat.name} sx={{ my: 1, marginBottom: 2 }}>
                <Typography variant="body2" sx={{ fontSize: 16, marginBottom: '5px' }}>{capitalizeFirstLetterOfEachWord(stat.name.replace('-', ' '))}: {stat.value}</Typography>
                <LinearProgress
                    variant="determinate"
                    value={(stat.value / maxStatValue) * 100}
                    sx={{ height: 15, borderRadius: 40 }}
                    className={stat.value > 135 ? 'high-stat stat-line' : stat.value > 90 ? 'okay-stat stat-line' : stat.value > 45 ? 'mid-stat stat-line' : 'low-stat stat-line'}
                />
            </Box>
        ))}
    </Paper>
);

export default PokemonBaseStats;