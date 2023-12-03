import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const RegisterComponent = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);

  const signUp = () => {
    loginWithRedirect({ screen_hint: 'signup' });
  };

  const handleRegister = async () => {
    if (!isAuthenticated) {
      setIsLoading(true);
      await signUp();

      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            auth0Id: user.sub,
            name: user.name,
            email: user.email,
            emailVerified: user.email_verified,
            picture: user.picture,
          }),
        });

        if (response.ok) {
          // Registration successful, redirect the user
          navigate('/profile');
        } else {
          console.error('Failed to register user:', response.statusText);
          // Handle the error, e.g., show an error message to the user
        }
      } catch (error) {
        console.error('Error registering user:', error);
        // Handle the error, e.g., show an error message to the user
      }

      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleRegister} disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </button>
    </div>
  );
};

export default RegisterComponent;

