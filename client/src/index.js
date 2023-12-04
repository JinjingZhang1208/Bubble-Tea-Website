import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App.js';
import Auth0ProviderWithHistory from './auth0-config.js';
import { AuthTokenProvider } from './components/AuthTokenContext.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
    <Auth0ProviderWithHistory>
      <AuthTokenProvider>
        <App />
      </AuthTokenProvider>
    </Auth0ProviderWithHistory>
);
