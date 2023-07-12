import React from 'react';
import { Typography, Chip, Stack } from '@mui/material';

import { StyledChip } from './style';

const CategoryHeader: React.FC = () => {
    return (
        <Stack direction="row">
            <Typography variant="h4" gutterBottom
                sx={{
                    mr: '1rem',
                    fontSize: "1.5rem",
                    fontWeight: 700
                }}>
                Тварини
            </Typography>
            <StyledChip label="2000" size="small" />
        </Stack>
    )
}

export default CategoryHeader;