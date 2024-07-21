// import React, { useState } from 'react';
// import { trpc } from '../utils/trpc';
// import { TextField, Button, Table, TableBody, TableHead, TableRow, TableCell, Paper, CircularProgress, Typography, Box } from '@mui/material';
// import { PokemonRow } from '../components/PokemonRow';

// const PokemonPage: React.FC = () => {
//     const [pokemonName, setPokemonName] = useState('');
//     const [searchTrigger, setSearchTrigger] = useState(false);

//     const { data: pokemon, isLoading, error } = trpc.pokemon.getPokemon.useQuery(
//         pokemonName,
//         { enabled: searchTrigger }
//     );

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         setSearchTrigger(true);
//     };

//     return (
//         <Box sx={{ p: 3 }}>
//             <Typography variant="h4" gutterBottom>Pokémon Search</Typography>
//             <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
//                 <TextField
//                     label="Pokémon Name"
//                     value={pokemonName}
//                     onChange={(e) => setPokemonName(e.target.value)}
//                     style={{ marginRight: '10px' }}
//                 />
//                 <Button type="submit" variant="contained" color="primary">
//                     Search
//                 </Button>
//             </form>

//             {isLoading && <CircularProgress />}
//             {error && <Typography color="error">An error occurred: {error.message}</Typography>}

//             {pokemon && (
//                 <Paper>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>ID</TableCell>
//                                 <TableCell>Name</TableCell>
//                                 <TableCell>Types</TableCell>
//                                 <TableCell>Sprite</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             <PokemonRow pokemon={pokemon} />
//                         </TableBody>
//                     </Table>
//                 </Paper>
//             )}

//             {searchTrigger && !isLoading && !pokemon && (
//                 <Typography>No Pokémon found with that name. Please try again.</Typography>
//             )}
//         </Box>
//     );
// };

// export default PokemonPage;