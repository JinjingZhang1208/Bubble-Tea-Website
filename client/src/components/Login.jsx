import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginComponent = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <button onClick={() => loginWithRedirect()}>Login / Register</button>
    </div>
  );
};

export default LoginComponent;
