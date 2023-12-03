// Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='container'>
        <div className='footer-content'>
          <div className='footer-section'>
            <h3>About Us</h3>
            <p>Top 1 Bubble Tea in Vancouver.</p>
          </div>
          <div className='footer-section'>
            <h3>Contact</h3>
            <p>Email: neububbletea.com</p>
            <p>Phone: +1 123 456 7890</p>
          </div>
          <div className='footer-section'>
            <p>&copy; 2023 neububbletea.com. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

