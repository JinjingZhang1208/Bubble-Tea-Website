import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const RegisterComponent = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <h2>Register</h2>
      <button onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>
        Register with Auth0
      </button>
    </div>
  );
};

export default RegisterComponent;
