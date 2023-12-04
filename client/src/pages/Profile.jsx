import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Profile.css';

const Profile = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user ? user.name : ''); 
  const [displayName, setDisplayName] = useState(user ? user.name : ''); 

  const displayToken = async () => {
    if (isAuthenticated) {
      try {
        const token = await getAccessTokenSilently();
        console.log('Authentication Token:', token);
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    // You can add logic here to update the user's name in the backend/API
    // For now, we'll just log the new name to the console
    console.log('New Name:', newName);

    setIsEditing(false);
    setDisplayName(newName); 
  };

  useEffect(() => {
    displayToken();
  }, []); 

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        {isEditing ? (
          <>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button onClick={handleSaveClick}>Save</button>
          </>
        ) : (
          <>
            {user ? (
              <>
                <p>Name: {displayName}</p>
                <button onClick={handleEditClick}>Edit Name</button>
                <p>Email: {user.email}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
