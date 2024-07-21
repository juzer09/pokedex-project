//Make a component that will scroll to the top of the page when clicked. This component should hover on the bottom right of the screen and should only be visible when the user has scrolled down the page. The component should be named ScrollUp and should be in a file named scrollUp.tsx. The component should be used in the SinglePokemonPage component. The component should have the following features:
//

import React from 'react';
import { Box, IconButton } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';

const ScrollUp = () => {
    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                display: 'none',
                '&.show': {
                    display: 'block',
                },
            }}
            className="scroll-up"
        >
            <IconButton
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                sx={{
                    backgroundColor: '#B846FF',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#A13FF5',
                    },
                }}
            >
                <KeyboardArrowUp />
            </IconButton>
        </Box>
    );
};

export default ScrollUp;