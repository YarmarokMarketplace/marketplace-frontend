import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: `'Mulish', sans-serif`,
    body1: {
      color: "#1B2124",
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
    button: {
      textTransform: "none",
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
          fontSize: "1rem",
          fontWeight: 400,
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
  },
});
