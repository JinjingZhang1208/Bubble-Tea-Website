import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapComponent extends Component {
  render() {
    const mapStyles = {
      width: '80%',
      height: '400px',
    };

    const location = { lat: 49.2827, lng: -123.1207 };
    const googleMapsUrl = `https://www.google.com/maps?q=${location.lat},${location.lng}`;

    return (
      <div>
        <Map
          google={this.props.google}
          zoom={15}
          style={mapStyles}
          initialCenter={location}
        >
          <Marker position={location} />
        </Map>
        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
          Open in Google Maps
        </a>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA7_OuH5C2ADYpIjc3dqFy7wxsCKMD8eAI',
})(MapComponent);
