import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

type PokemonTypeSelectionProps = {
    selectedType: string | undefined;
    selectType: (type: string | undefined) => void;
    types: string[];
};

export const PokemonTypeSelection: React.FC<PokemonTypeSelectionProps> = ({
    selectedType,
    selectType,
    types,
}) => {
    return (
        <FormControl fullWidth>
            <InputLabel id="pokemon-type-select-label">Pokemon Type</InputLabel>
            <Select
                labelId="pokemon-type-select-label"
                id="pokemon-type-select"
                value={selectedType || ''}
                label="Pokemon Type"
                onChange={(e) => selectType(e.target.value as string | undefined)}
            >
                <MenuItem value="">
                    <em>All Types</em>
                </MenuItem>
                {types.map((type) => (
                    <MenuItem key={type} value={type}>
                        {type}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};