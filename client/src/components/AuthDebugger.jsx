import React, { useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthDebugger = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  const displayToken = useCallback(async () => {
    if (isAuthenticated) {
      try {
        const token = await getAccessTokenSilently();
        console.log('Authentication Token:', token);
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  React.useEffect(() => {
    if (isAuthenticated) {
      displayToken();
    }
  }, [displayToken, isAuthenticated]);

  return (
    <div>
      <h1>Auth Debugger</h1>
      {isAuthenticated ? (
        <div>
          <p>User: {user.name}</p>
          <button onClick={displayToken}>Display Token</button>
        </div>
      ) : (
        <p>User not authenticated</p>
      )}
    </div>
  );
};

export default AuthDebugger;
