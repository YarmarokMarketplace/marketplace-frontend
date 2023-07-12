import React from "react";
import { GlobalStyles, useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';

const InputGlobalStyles = () => {
    const theme: Theme = useTheme();

    const inputGlobalStyles = (
        <GlobalStyles styles={{

            ':root': {
                fontSize: 16,
                [theme.breakpoints.down('lg')]: {
                    fontSize: 14,
                },
                [theme.breakpoints.down('md')]: {
                    fontSize: 11,
                },
            },
            body: {
                '#root': {
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                },
            }
        }}
        />
    )
    return inputGlobalStyles
};

export default InputGlobalStyles;