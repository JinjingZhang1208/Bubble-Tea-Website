import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/boba.png';
import CartLogo from "../img/shoppingCart.png";
import "./Navbar.css";
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
        <h1>Bubble Tea Company</h1>
        <div className="links">
          <Link className="link" to="/register">
            <h6>Register</h6>
          </Link>
          <Link className="link" to="/login">
            <h6>{isAuthenticated ? 'Logout' : 'Login'}</h6>
          </Link>
          {isAuthenticated && (
            <Link className="link" to="/profile">
              <h6>{user.name}</h6>
            </Link>
          )}
          <Link className="linkLogo" to="/cart">
            <img src={CartLogo} alt="cartLogo" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

