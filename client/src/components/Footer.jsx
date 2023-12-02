import React from 'react';
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About Us</h4>
            <p>Top 1 Bubble Tea in Vancouver.</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: neububbletea.com</p>
            <p>Phone: +1 123 456 7890</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 neububbletea.com. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
