import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavBar: React.FC = () => {
    const router = useRouter();
    console.log(router.pathname);
    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#080613 !important', backgroundImage: 'none !important' }}>
            <Toolbar sx={{ background: 'transparent !important' }}>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                    <Link href="/" passHref>
                        <Button
                            color="inherit"
                            sx={{
                                mx: 1,
                                color: 'white',
                                backgroundColor: router.pathname === '/' ? '#B846FF' : 'transparent',
                                '&:hover': { backgroundColor: '#9D3FD5' }
                            }}
                        >
                            Single Search
                        </Button>
                    </Link>
                    <Link href="/pokedex-multi" passHref>
                        <Button
                            color="inherit"
                            sx={{
                                mx: 1,
                                color: 'white',
                                backgroundColor: router.pathname === '/pokedex-multi' ? '#B846FF' : 'transparent',
                                '&:hover': { backgroundColor: '#9D3FD5' }
                            }}
                        >
                            Multi Search
                        </Button>
                    </Link>
                    <Link href="/pokedex-type" passHref>
                        <Button
                            color="inherit"
                            sx={{
                                mx: 1,
                                color: 'white',
                                backgroundColor: router.pathname === '/pokedex-type' ? '#B846FF' : 'transparent',
                                '&:hover': { backgroundColor: '#9D3FD5' }
                            }}
                        >
                            Search by Type
                        </Button>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;