import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
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
    console.log('New Name:', newName);

    setIsEditing(false);
    setDisplayName(newName);
  };

  useEffect(() => {
    displayToken();
  }, []);
  

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>User Profile</h2>
      </div>
      <div className="user-details">
        {isEditing ? (
          <div className="edit-section">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="edit-input"
            />
            <button onClick={handleSaveClick} className="save-button">
              Save
            </button>
          </div>
        ) : (
          <>
            <div className="info-container">
              <div>
                <p>Name: {displayName}</p>
                <div className="button-container">
                  <button onClick={handleEditClick} className="save-button">
                    Edit Name
                  </button>
                </div>
                <p>Email: {user.email}</p>
              </div>
              
            </div>
            <div className="button-container">
              <Link to="/">
                <button className="return-button">Return to Menu</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
