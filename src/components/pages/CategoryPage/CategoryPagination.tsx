import React from 'react';
import { styled } from '@mui/material/styles';
import { Stack, Pagination } from '@mui/material';

const CategoryPagination: React.FC = () => {
    return (
        <Stack
            direction="row"
            justifyContent="center"
            m="2rem 0 4rem"
        >
            <Pagination count={10} color="primary"
                sx={{
                    "button": {
                        fontWeight: 700,
                    },
                    "svg": {
                        fontSize: "2rem",
                    }
                }}
            />
        </Stack >
    )
}

export default CategoryPagination;