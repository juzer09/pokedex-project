import { useState, useRef, useEffect } from 'react';
import { trpc } from '../utils/trpc';
import { TextField, Button, Box, Typography, Container, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { PokedexTable } from '../components/PokedexTable';
import NavBar from '../components/navBar';
import Image from 'next/image';
import ScrollUp from '../components/scrollUp';

export default function Home() {
    const [pokemonName, setPokemonName] = useState('');
    const [showResults, setShowResults] = useState(false);
    const { data: pokemon, refetch, isLoading, isError } = trpc.pokemon.getPokemon.useQuery(pokemonName, { enabled: false });
    const resultsRef = useRef<HTMLDivElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowResults(true);
        refetch();
    };

    useEffect(() => {
        if (showResults && pokemon && resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showResults, pokemon]);

    return (
        <>
            <title>Gotta Know &apos;Em All - Pokédex</title>
            <meta name="description" content="Pokédex" />
            <NavBar />
            <Container sx={{ textAlign: 'center', maxWidth: '1300px', width: '100%' }} className='hm__master'>
                <Box className='hm__container'>
                    <Box className='hm__box'>
                        <Box sx={{ mb: 4 }} className='hm__logo'>
                            <Image
                                src="/pokeball.png"
                                alt="Pokeball"
                                width={145}
                                height={145}
                            />
                        </Box>
                        <Typography variant="h3" component="h1" gutterBottom fontWeight={'bold'} marginBottom={'87px'}>
                            GOTTA KNOW &apos;EM ALL
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }} id='hm__search'>
                            <Box sx={{ mb: 2 }} className='hm__search-box'>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Pokemon Name"
                                    value={pokemonName}
                                    onChange={(e) => setPokemonName(e.target.value)}
                                    sx={{ bgcolor: 'grey.300', borderRadius: 2 }}
                                    className='hm__search-input'
                                />
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C13.3132 2 14.6136 2.25866 15.8268 2.7612C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22C10.6868 22 9.38642 21.7413 8.17317 21.2388C6.95991 20.7362 5.85752 19.9997 4.92893 19.0711C3.05357 17.1957 2 14.6522 2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2ZM12 4C7.92 4 4.55 7.05 4.06 11H8.13C8.57 9.27 10.14 8 12 8C13.86 8 15.43 9.27 15.87 11H19.94C19.45 7.05 16.08 4 12 4ZM12 20C16.08 20 19.45 16.95 19.94 13H15.87C15.43 14.73 13.86 16 12 16C10.14 16 8.57 14.73 8.13 13H4.06C4.55 16.95 7.92 20 12 20ZM12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10Z" fill="black" /></svg>
                            </Box>
                            <Button type="submit" variant="contained" sx={{ mt: 2, bgcolor: '#B846FF', width: '187px', height: '50px', borderRadius: '25px', color: 'white', fontWeight: '600', fontSize: '18px' }}>
                                FIND
                            </Button>
                        </Box>
                    </Box>
                </Box>
                {showResults && (
                    <Box sx={{ mt: 4, pb: 80 }} className='hm__search-result' ref={resultsRef}>
                        <Typography variant="h3" component="h1" gutterBottom fontWeight={'bold'} marginBottom={'87px'}>
                            Search Results
                        </Typography>
                        <ScrollUp />
                        {isLoading && <Typography>Loading...</Typography>}
                        {isError && <Typography color="error">An error occurred. Please try again.</Typography>}
                        {pokemon && (
                            <PokedexTable pokemons={[pokemon]} />
                        )}
                        {!isLoading && !isError && !pokemon && <Typography>No Pokémon found with that name.</Typography>}
                    </Box>
                )}
            </Container>
        </>
    );
}