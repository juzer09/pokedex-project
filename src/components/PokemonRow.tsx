import React from 'react';
import { TableRow, TableCell, Avatar, Chip, Tooltip, IconButton, Link as MuiLink, useTheme, useMediaQuery } from '@mui/material';
import { PokemonRowProps } from './PokemonRowProps';
import { capitalizeFirstLetter } from '@/inc/global-functions';
import Link from 'next/link';

export const PokemonRow: React.FC<PokemonRowProps> = ({ pokemon }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    return (
        <TableRow>
            <TableCell>{Number(pokemon.id) - 151}</TableCell>
            <TableCell>
                <Link href={`/pokemon/${pokemon.name}`} passHref>
                    <MuiLink
                        sx={{ textDecoration: 'none', color: '#fff', }}
                        className='pokemon-link'
                    >
                        {capitalizeFirstLetter(pokemon.name)}
                    </MuiLink>
                </Link>
            </TableCell>
            <TableCell>
                {pokemon.types.map((type) => (
                    <Chip key={capitalizeFirstLetter(type.name)} label={capitalizeFirstLetter(type.name)} style={{ marginRight: 4 }} />
                ))}
            </TableCell>
            <TableCell>
                <Avatar src={pokemon.sprite} alt={pokemon.name} />
            </TableCell>
            <TableCell>
                {pokemon.stats.map((stat) => (
                    <Tooltip key={stat.name} title={`${stat.name}: ${stat.value}`}>
                        <Chip label={`${stat.name.slice(0, 3).toUpperCase()}: ${stat.value}`} style={{ marginRight: 4 }} />
                    </Tooltip>
                ))}
            </TableCell>
            {!isMobile && !isTablet && (
                <React.Fragment>
                    <TableCell>{pokemon.weight / 10} kg</TableCell>
                    <TableCell>{pokemon.height / 10} m</TableCell>
                </React.Fragment>
            )}
            <TableCell>
                {pokemon.abilities.map((ability) => (
                    <Chip key={ability.ability.name} label={capitalizeFirstLetter(ability.ability.name)} style={{ marginRight: 4 }} />
                ))}
            </TableCell>
            <TableCell>
                <Tooltip title="Play cry">
                    <IconButton size="small" onClick={() => new Audio(pokemon.cries.latest).play()}>
                        <span role="img" aria-label="sound">🔊</span>
                    </IconButton>
                </Tooltip>
            </TableCell>
            <TableCell>
                <Link href={`/pokemon/${pokemon.name}`} passHref>
                    <MuiLink
                        sx={{ textDecoration: 'none', color: '#fff', fontWeight: '600', fontSize: '0.9rem', backgroundColor: '#B846FF', padding: '5px 10px', borderRadius: '5px' }}
                        className='pokemon-link'
                    >
                        View Details
                    </MuiLink>
                </Link>
            </TableCell>
        </TableRow>
    );
};