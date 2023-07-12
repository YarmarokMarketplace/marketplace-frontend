import React from 'react';
import { Typography, Breadcrumbs, Link, useTheme } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Theme } from '@mui/material/styles';

const BasicBreadcrumbs: React.FC = () => {
    const theme: Theme = useTheme();

    return (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" color="primary" />}
            aria-label="breadcrumb"
            sx={{ padding: theme.spacing(0, 0, 3) }}>
            <Link underline="hover" color="inherit" href="/">
                Головна
            </Link>
            <Typography color="text.primary">Каталог</Typography>
        </Breadcrumbs>
    );
}

export default BasicBreadcrumbs;