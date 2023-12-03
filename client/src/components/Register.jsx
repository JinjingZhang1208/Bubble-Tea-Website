import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const RegisterComponent = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const signUp = () => {
    loginWithRedirect({ screen_hint: 'signup' });
  };

  const handleRegister = async () => {
    if (!isAuthenticated) {
      await signUp();
      // Redirect after successful registration
      navigate('/profile'); 
    }
  };

  return (
    <div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterComponent;
