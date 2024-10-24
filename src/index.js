 // src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Ensure this file exists
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Ensure this file exists
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Ensure this path is correct

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// Register the service worker for offline capabilities
serviceWorkerRegistration.register();
