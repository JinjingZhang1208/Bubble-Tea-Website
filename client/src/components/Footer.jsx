import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='container'>
        <div className='footer-content'>
          <div className='footer-section'>
            <h3>About Us</h3>
            <p>No. 1 Bubble Tea Company in Vancouver.</p>
          </div>
          <div className='footer-section'>
            <h3>Contact</h3>
            <p>Phone: 123456789</p>
          </div>
        </div>
        <div className='footer-section'>
          <p>&copy; 2023 northeasternbubbletea.com.   All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

