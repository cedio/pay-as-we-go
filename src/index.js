 // src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Ensure this file exists
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Ensure this file exists

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
