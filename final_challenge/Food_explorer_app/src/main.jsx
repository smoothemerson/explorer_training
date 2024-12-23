import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "styled-components";
import GlobalStyles from './styles/global'
import theme from './styles/theme'

import { AuthProvider } from "./hooks/auth";
import { FavoritesProvider } from "./hooks/favorites";
import { CartProvider } from "./hooks/cart";

import { Routes } from "./routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <Routes />
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
