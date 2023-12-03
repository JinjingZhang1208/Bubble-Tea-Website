import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const RegisterComponent = () => {
  const { signupWithRedirect } = useAuth0();

  return (
    <div>
      <button onClick={() => signupWithRedirect({ screen_hint: 'signup' })}>
        Register
      </button>
    </div>
  );
};

export default RegisterComponent;
