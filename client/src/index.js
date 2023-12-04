import React from 'react';
import { createRoot } from 'react-dom';
import App from './App.js';
import Auth0ProviderWithHistory from './auth0-config.js';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </React.StrictMode>,
  document.getElementById('root')
);


