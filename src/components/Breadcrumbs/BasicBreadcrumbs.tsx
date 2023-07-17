import React from 'react';
import { Breadcrumbs, Link, useTheme } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Theme } from '@mui/material/styles';

const BasicBreadcrumbs: React.FC = ({ children }) => {
    const theme: Theme = useTheme();

    return (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" color="primary" />}
            aria-label="breadcrumb"
            sx={{ padding: theme.spacing(0, 0, 3) }}>
            <Link underline="hover" color="inherit" href="/">
                Головна
            </Link>
            {children}
        </Breadcrumbs>
    );
}

export default BasicBreadcrumbs;