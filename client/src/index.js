import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import Auth0ProviderWithHistory from './auth0-config.js';

ReactDOM.render(
  <React.StrictMode>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </React.StrictMode>,
  document.getElementById('root')
);


