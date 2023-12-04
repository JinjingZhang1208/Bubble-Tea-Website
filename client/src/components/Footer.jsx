import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import MapComponent from './MapComponent';

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
      <h3>Location</h3>
      <p>No. 1234 Bubble Street, Vancouver, BC</p>
    

      {/* Add an id to the element wrapping the MapComponent */}
      <div id="map">
      </div>
    </div>
        </div>
        <div className='footer-section'>
          <p>&copy; 2023 northeasternbubbletea.com. All Rights Reserved.</p>
        </div>
      </div>
      <div className='map-container'>
        <MapComponent />
      </div>
    </div>
   
  );
};

export default Footer;

