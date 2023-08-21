import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    secBlack: Palette['primary'];
  }
  interface PaletteOptions {
    secBlack: PaletteOptions['primary'];
  }
  interface Palette {
    lightGrey: Palette['primary'];
  }
  interface PaletteOptions {
    lightGrey: PaletteOptions['primary'];
  }
  interface Palette {
    white: Palette['divider'];
  }
  interface PaletteOptions {
    white: PaletteOptions['divider'];
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: `'Mulish', sans-serif`,
    fontWeightMedium: 400,
    body1: {
      fontSize: '1rem',
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 400,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: '2rem',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: '0.875rem',
    },
  },
  palette: {
    background: {
      paper: '#F8F8FD',
    },
    primary: {
      main: '#3860E2',
      dark: '#152D7B',
      light: '#9EADFB',
      contrastText: '#F5F7FF',
    },
    secondary: {
      main: '#AAAFBE',
      dark: '#7F879E',
      light: '#D4D7DF',
    },
    error: {
      main: '#E60019',
      dark: '#AAAFBE',
      light: '#D4D7DF',
    },
    success: {
      main: '#34A853',
      dark: '#3D5BF6',
      light: '#78C58C',
    },
    info: {
      main: '#FFAA37',
    },
    divider: '#8D9092',
    text: {
      primary: '#1B2124',
      secondary: '#8D9092',
      disabled: '#C6C7C8',
    },
    secBlack: {
      main: '#2A2F46',
      dark: '#252A3F',
      light: '#30364F',
    },
    lightGrey: {
      main: '#F6F8F9',
      dark: '#F3F3F3',
      light: '#F9F9F9',
      contrastText: '#F8F8FD',
    },
    white: '#fff',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontSize: '1.25rem',
          fontWeight: 600,
          textTransform: 'none',
        },
        contained: {
          padding: '0.5rem',
          ':hover': {
            backgroundColor: '#9EADFB',
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          fontWeight: 400,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#1B2124',
        },
        caption: {
          lineHeight: '0.875rem',
        },
        subtitle2: {
          lineHeight: '1rem',
        },
        body1: {
          lineHeight: '1.25rem',
        },
        h6: {
          lineHeight: '1.5rem',
        },
        h4: {
          lineHeight: '2rem',
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        root: {
          color: '#FFAA37',
        },
        sizeMedium: {
          fontSize: '1.25rem',
        },
      },
    },
  },
  spacing: (factor: number) => `${0.5 * factor}rem`,
});
