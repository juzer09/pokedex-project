import React, { useRef, useState, useEffect } from 'react';
import { Button, Snackbar } from '@mui/material';

interface PokemonCryProps {
    cryUrl: string;
}

const PokemonCry: React.FC<PokemonCryProps> = ({ cryUrl }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isUnsupported, setIsUnsupported] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        // Detect iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
        if (isIOS) {
            setIsUnsupported(true);
        }
    }, []);

    const playCry = () => {
        if (isUnsupported) {
            setOpenSnackbar(true);
            return;
        }

        if (!audioRef.current) {
            audioRef.current = new Audio(cryUrl);
        }

        audioRef.current.play().catch((error) => {
            console.error("Playback failed:", error);
            setIsUnsupported(true);
            setOpenSnackbar(true);
        });
    };

    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <>
            <Button
                variant="contained"
                endIcon={<span>🔊</span>}
                sx={{ backgroundColor: '#333', '&:hover': { backgroundColor: '#444' }, flex: '1', width: '100%', display: 'flex', borderRadius: '0 0 0 12px', background: 'transparent', height: '36px', fontSize: '12px', gap: '8px', justifyContent: 'center', alignItems: 'center', color: 'white' }}
                onClick={playCry}
            >
                Play Cry
            </Button>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message="Pokémon cry currently not supported on your device. We are working hard to add the necessary support. Please try a Web Browser or Android Device instead."
            />
        </>
    );
};

export default PokemonCry;