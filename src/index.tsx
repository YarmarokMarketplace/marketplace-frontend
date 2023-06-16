import React from "react";
import ReactDom from "react-dom/client";

import App from "./components/App";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: `'Mulish', sans-serif`,
    button: {
      textTransform: "none",
    },
  },
  palette: {
    background: {
      default: "#F6F8F9",
    },
  },
});

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDom.createRoot(rootElement);
  root.render(
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <App />
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}
