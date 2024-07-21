import React from 'react';
import { Box, Grid } from '@mui/material';
import { PokemonCard } from './PokemonCard';

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

interface PokemonRowProps {
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

export const PokedexTable: React.FC<PokemonRowProps> = ({ pokemons }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} justifyContent="center" sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px', margin: 0, width: '100%' }}>
                {pokemons.map((pokemon: any) => (
                    <Grid item key={pokemon.id} xs={12} sm={6} md={4} lg={3} className='pokemon__card-item' sx={{ maxWidth: 'none !important', pl: '0 !important', ml: 0, flexBasis: '24% !important' }}>
                        <PokemonCard pokemon={pokemon} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );

    // return (
    //     <Paper>
    //         <Table sx={{ backgroundColor: '#080613b8', }}>
    //             <TableHead>
    //                 <TableRow>
    //                     <TableCell>ID</TableCell>
    //                     <TableCell>Name</TableCell>
    //                     <TableCell>Types</TableCell>
    //                     <TableCell>Sprite</TableCell>
    //                     <TableCell>Stats</TableCell>
    //                     {!isMobile && <TableCell>Weight</TableCell>}
    //                     {!isMobile && <TableCell>Height</TableCell>}
    //                     <TableCell>Abilities</TableCell>
    //                     <TableCell>Cry</TableCell>
    //                     <TableCell></TableCell>
    //                 </TableRow>
    //             </TableHead>
    //             <TableBody>
    //                 {pokemons.map((pokemon) => (
    //                     <PokemonRow key={pokemon.id} pokemon={pokemon} />
    //                 ))}
    //             </TableBody>
    //         </Table>
    //     </Paper>
    // );
};