import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user } = useAuth0();

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
};

export default Profile;

