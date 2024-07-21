import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';
import { ClassNames } from '@emotion/react';

interface PokedexEntry {
    entry: string;
    version: string;
}

interface PokemonEntriesProps {
    entries: PokedexEntry[] | undefined;
}

const PokemonEntries: React.FC<PokemonEntriesProps> = ({ entries }) => (
    <Paper sx={{ p: 2 }} className="sp__box">
        <Typography variant="h6" gutterBottom>Pokédex Entries</Typography>
        {entries && entries.length > 0 ? (
            <List>
                {entries.map((entry, index) => (
                    <ListItem key={index} divider={index < entries.length - 1} className='sp__pokedex-entry__item'>
                        <ListItemText
                            primary={entry.entry}
                            secondary={`${entry.version}`}
                            classes={{ secondary: 'sp__pokedex-entry__version' }}
                        />
                    </ListItem>
                ))}
            </List>
        ) : (
            <Typography>No Pokédex entries available.</Typography>
        )}
    </Paper>
);

export default PokemonEntries;