import React from "react";
import ReactDom from "react-dom/client";
import { PersistGate } from 'redux-persist/integration/react';

import App from "./components/App";
import AuthLayout from "./components/AuthLayout/AuthLayout";
import { CssBaseline, ThemeProvider } from "@mui/material";
import InputGlobalStyles from "./styles/GlobalStyles";

import { theme } from "./theme";
import { Provider } from "react-redux";
import { store, persistor } from "./store";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDom.createRoot(rootElement);

  root.render(
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthLayout>
            <ThemeProvider theme={theme}>
              <CssBaseline>
                <InputGlobalStyles />
                <App />
              </CssBaseline>
            </ThemeProvider>
          </AuthLayout>
        </PersistGate>
      </Provider>
    </>
  );
}
