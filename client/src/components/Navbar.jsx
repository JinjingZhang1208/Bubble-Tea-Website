import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/boba.png';
import CartLogo from "../img/shoppingCart.png";
import "./Navbar.css";

const Navbar = () => {
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
            <h6>Login</h6>
          </Link>
          <Link className="linkLogo" to="/cart">
            <img src={CartLogo} alt="cartLogo" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

