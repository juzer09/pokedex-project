import React from 'react';
import { Box, Typography, Chip, Button, Avatar, IconButton } from '@mui/material';
import { PokemonRowProps } from './PokemonRowProps';
import { capitalizeFirstLetterOfEachWord } from '@/inc/global-functions';
import { typeColors } from './typeColors';
import Image from 'next/image';
import Link from 'next/link';

export const PokemonCard: React.FC<PokemonRowProps> = ({ pokemon }) => {
    console.log(pokemon);
    return (
        <Box sx={{
            backgroundColor: '#ffffff08',
            borderRadius: '16px',
            padding: '16px',
            color: 'white',
            width: '100%',
            minWidth: '400px',
        }} className="pokemon__card-item__box">
            <Box sx={{ display: 'flex', mb: 2 }}>
                <Box sx={{ flex: '1', borderRadius: 0 }}>
                    <Avatar src={pokemon.sprite} alt={pokemon.name} sx={{ width: '125px', height: '125px', borderRadius: 0 }} />
                </Box>
                <Box sx={{ display: 'flex', gap: '15px', flexDirection: 'column', flex: '1.9' }}>
                    <Box className='pkc__top-row' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0 }}>
                            <Typography variant="h5" component="h2" sx={{ fontSize: '18px', fontWeight: '600', marginBottom: '9px' }}>
                                {capitalizeFirstLetterOfEachWord(pokemon.name)} <Box component="div" sx={{ display: 'inline', fontSize: '12px', fontWeight: '300', marginLeft: '2px' }}>(#{Number(pokemon.id) - 151})</Box>
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '12px', justifyContent: 'center', fontSize: '10px', fontWeight: 300 }}>
                                <Typography sx={{ color: '#92E3A9', fontSize: '12px', fontWeight: 300, display: 'flex' }}>
                                    Weight: <Box component="div" sx={{ display: 'inline', fontSize: '12px', fontWeight: '600', marginLeft: '2px' }}>{pokemon.weight / 10}Kg</Box>
                                </Typography>
                                <Typography sx={{ color: '#92E3A9', fontSize: '12px', fontWeight: 300, display: 'flex' }}>
                                    Height: <Box component="div" sx={{ display: 'inline', fontSize: '12px', fontWeight: '600', marginLeft: '2px' }}>{pokemon.height / 10}m</Box>
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            {pokemon.types.map((type) => {
                                return (
                                    <Chip
                                        key={type.name}
                                        label={type.name}
                                        sx={{
                                            backgroundColor: typeColors[type.name],
                                            color: 'white',
                                            margin: '2px',
                                            fontSize: '10px',
                                            fontWeight: '600',
                                            textTransform: 'uppercase',
                                            height: '22px'
                                        }}
                                    />
                                );
                            })}
                        </Box>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, margin: '0', textAlign: 'left' }} className='pkc__stats-row'>
                        {pokemon.stats.map((stat) => {
                            const label = stat.name === 'special-attack' ? 'SP ATK' : stat.name === 'special-defense' ? 'SP DEF' : stat.name.slice(0, 3).toUpperCase();
                            return (
                                <Typography key={stat.name} sx={{ fontSize: '12px', fontWeight: '600' }}>
                                    {label} - {stat.value}
                                </Typography>
                            );
                        })}
                    </Box>
                    <Box sx={{ mb: 1 }} className='pkc__abilities-row'>
                        <Typography sx={{ color: '#92E3A9', mb: '4px', fontSize: '12px', fontWeight: '600', textAlign: 'left' }}>Abilities</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {pokemon.abilities.map((ability) => {
                                let label = capitalizeFirstLetterOfEachWord(ability.ability.name.replace('-', ' '));
                                if (ability.ability.isHidden) {
                                    label += ' (Hidden)';
                                }

                                return (
                                    <Chip
                                        key={ability.ability.name}
                                        label={label}
                                        sx={{ backgroundColor: '#4D49FB49', color: 'white', fontSize: '12px' }}
                                    />
                                )
                            })}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 'calc(100% + 32px)', margin: '0 -16px -16px' }}>
                <Button
                    variant="contained"
                    endIcon={<span>🔊</span>}
                    sx={{ backgroundColor: '#333', '&:hover': { backgroundColor: '#444' }, flex: '1', width: '100%', display: 'flex', borderRadius: '0 0 0 12px', background: 'transparent', height: '36px', fontSize: '12px', gap: '8px', justifyContent: 'center', alignItems: 'center', color: 'white' }}
                    onClick={() => new Audio(pokemon.cries.latest).play()}
                >
                    Pokemon Cry
                </Button>
                <Box sx={{ flex: '1' }}>
                    <Link href={`/pokemon/${pokemon.name}`} passHref className='block'>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#B846FF', '&:hover': { backgroundColor: '#9D3FD5' }, flex: '1', width: '100%', display: 'flex', borderRadius: '0 0 12px 0', height: '36px', fontSize: '12px', gap: '8px', justifyContent: 'center', alignItems: 'center', color: 'white' }}
                        >
                            View Details
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Box >
    );
};