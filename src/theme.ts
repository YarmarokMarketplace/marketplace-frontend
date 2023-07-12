import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: `'Mulish', sans-serif`,
    fontWeightMedium: 400,
    body1: {
      fontSize: "1rem",
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 400,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 700,
    },
  },
  palette: {
    background: {
      paper: "#F8F8FD",
    },
    primary: {
      main: "#3860E2",
      dark: "#152D7B",
      light: "#9EADFB",
      contrastText: "#F5F7FF",
    },
    secondary: {
      main: "#AAAFBE",
      dark: "#7F879E",
      light: "#D4D7DF",
    },
    error: {
      main: "#E60019",
      dark: "#AAAFBE",
      light: "#D4D7DF",
    },
    success: {
      main: "#34A853",
      dark: "#3D5BF6",
      light: "#78C58C",
    },
    info: {
      main: "#FFAA37",
    },
    divider: "#8D9092",
    text: {
      primary: "#1B2124",
      secondary: "#8D9092",
      disabled: "#C6C7C8",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontSize: "1.25rem",
          fontWeight: 600,
          textTransform: "none",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          fontWeight: 400,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#1B2124",
        },
      },
    },
  },
  spacing: (factor: number) => `${0.5 * factor}rem`,
});
