import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapComponent extends Component {
  state = {
    userLocation: null,
  };

  componentDidMount() {
    this.getUserLocation();
  }

  getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.setState({ userLocation });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  render() {
    const { google } = this.props;
    const { userLocation } = this.state;
    const storeLocation = { lat: 49.2827, lng: -123.1207 };

    const mapStyles = {
      width: '80%',
      height: '400px',
    };

    return (
      <div>
        <Map google={google} zoom={15} style={mapStyles} initialCenter={storeLocation}>
          {userLocation && <Marker position={userLocation} label="You are here" />}
          <Marker position={storeLocation} label="Store" />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA7_OuH5C2ADYpIjc3dqFy7wxsCKMD8eAI',
})(MapComponent);


