import React from 'react';
import { Paper, Typography, Avatar, Chip, Box } from '@mui/material';
import { capitalizeFirstLetter } from '@/inc/global-functions';
import { typeColors } from './typeColors';

const PokemonBasicInfo = ({ pokemon }: { pokemon: any }) => (
    <Paper sx={{ p: 2 }} className="sp__box sp__basic-info">
        <Box display="flex" className='mobile-column'>
            <Box display="flex" alignItems="center" mb={2} className="sp__basic-info__image">
                <Avatar src={pokemon.sprite} alt={pokemon.name} sx={{ width: 240, height: 240, mr: 2, textAlign: 'center' }} className='sp__main-image' />
            </Box>
            <Box mb={2} p={2.5}>
                <Typography variant="h4" mb={2}>{capitalizeFirstLetter(pokemon.name)}</Typography>
                <Typography variant="body1">Height: {pokemon.height / 10}m</Typography>
                <Typography variant="body1" mb={1}>Weight: {pokemon.weight / 10}kg</Typography>
                <Box>
                    {pokemon.types.map((type: any) => {
                        const backgroundColor = typeColors[type.name];
                        return (
                            <Chip key={type.name} label={capitalizeFirstLetter(type.name)} sx={{ mr: 1 }} style={{ backgroundColor, color: 'white', textTransform: 'uppercase', fontWeight: 'bold' }} />
                        )
                    })}
                </Box>
                <Box mt={2}>
                    <Typography variant="h6">Abilities:</Typography>
                    {pokemon.abilities.map((ability: any) => (
                        <Box key={ability.name} display="inline-flex" flexDirection={'column'}>
                            <Chip
                                key={ability.ability.name}
                                label={`${capitalizeFirstLetter(ability.ability.name)}${ability.isHidden ? ' (Hidden)' : ''}`}
                                sx={{ mr: 1, mt: 1, backgroundColor: '#4D49FB49', color: 'white' }}
                                className='ability-chip'
                            />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    </Paper>
);

export default PokemonBasicInfo;