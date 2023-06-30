import React from "react";
import ReactDom from "react-dom/client";

import App from "./components/App";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { theme } from "./theme";
import { Provider } from "react-redux";
import store from "./store";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDom.createRoot(rootElement);
  root.render(
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <App />
          </CssBaseline>
        </ThemeProvider>
      </Provider>
    </>
  );
}
