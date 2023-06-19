import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: `'Mulish', sans-serif`,
    body1: {
      color: "#1B2124",
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
    },
    secondary: {
      main: "#AAAFBE",
      dark: "#7F879E",
      light: "#D4D7DF",
    },
    divider: "#8D9092",
  },
});
