import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../img/boba.png';
import CartLogo from '../img/shoppingCart.png';
import './Navbar.css';
import { useAuth0 } from '@auth0/auth0-react';
import LoginComponent from './Login.jsx';

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout({ returnTo: window.location.origin });
    } else {
      loginWithRedirect();
    }
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
        <h1>Bubble Tea Company</h1>
        <div className="links">
          {isAuthenticated ? (
            <>
              <button
                style={{
                  backgroundColor: '#131212',
                  color: '#e1e9ef',
                  border: 'none',
                  padding: '10px 15px',
                  fontSize: '20px',
                  cursor: 'pointer',
                  width: '180px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={() => navigate(`/profile/`)} 
              >
                <h6>{user.name}</h6>
              </button>
              <button onClick={handleAuthAction}>Logout</button>
            </>
          ) : (
            <>
              <LoginComponent />
            </>
          )}
          <Link className="link" to="/cart">
            <img src={CartLogo} alt="cartLogo" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
