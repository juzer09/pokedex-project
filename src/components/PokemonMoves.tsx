import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Image from 'next/image';
import { capitalizeFirstLetter } from '@/inc/global-functions';
import { typeColors } from './typeColors';

const PokemonMoves = ({ moves }: { moves: any[] }) => (
    <Paper sx={{ p: 2 }} className='sp__box sp__moves-box'>
        <Typography variant="h6" gutterBottom>Moves Learned by Level Up</Typography>
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>Move</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Power</TableCell>
                    <TableCell align="right">Accuracy</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {moves.map(move => {
                    const backgroundColor = typeColors[move.type];
                    console.log(move.type);
                    return (
                        <TableRow key={move.name}>
                            <TableCell>{capitalizeFirstLetterOfEachWord(move.name.replace('-', ' '))}</TableCell>
                            <TableCell style={{ backgroundColor, color: 'white', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '12px' }}>{move.type}</TableCell>
                            <TableCell>
                                <Image
                                    src={(move.category == 'Physical') ? '/move-physical.png' : (move.category == 'Special') ? '/move-special.png' : '/move-status.png'}
                                    alt={move.category}
                                    width={40}
                                    height={26.7}
                                ></Image>
                            </TableCell>
                            <TableCell align="right">{move.power || '-'}</TableCell>
                            <TableCell align="right">{move.accuracy ? `${move.accuracy}%` : '-'}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    </Paper>
);

function capitalizeFirstLetterOfEachWord(str: string) {
    return str.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');
}

export default PokemonMoves;