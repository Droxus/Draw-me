import './index.css';

import React from 'react';

import ReactDOM from 'react-dom/client';

import {
  CssBaseline,
  ThemeProvider,
} from '@mui/material';

import App from './App.jsx';
import { GlobalContext } from './GlobalContext.jsx';
import theme from './theme.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalContext>
        <App />
      </GlobalContext>
    </ThemeProvider>
  </React.StrictMode>
);
