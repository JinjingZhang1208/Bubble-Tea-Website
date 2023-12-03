import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Register.css';

const RegisterComponent = () => {
  const { signupWithRedirect } = useAuth0();

  const handleRegister = () => {
    console.log('Calling signupWithRedirect');
    signupWithRedirect({ screen_hint: 'signup' });
  };

  return (
    <div>
      <button onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default RegisterComponent;