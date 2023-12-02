import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='container'>
        <div className='footer-content'>
          <div className='footer-section'>
            <h3>About Us</h3>
            <p>Bubble Tea Company</p>
          </div>
          <div className='footer-section'>
            <h3>Contact</h3>
            <p>Email: bubbletea.com</p>
            <p>Phone: 123456789</p>
          </div>
        </div>
        <div className='footer-section'>
          <p>&copy; 2023 neububbletea.com. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
