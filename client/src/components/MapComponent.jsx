import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapComponent extends Component {
  render() {
    const mapStyles = {
      width: '100%',
      height: '400px',
    };

    return (
      <Map
        google={this.props.google}
        zoom={15}
        style={mapStyles}
        initialCenter={{ lat: 49.2827, lng:  -123.1207 }}
      >
        <Marker position={{ lat: 49.2827, lng: -123.1207}} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA7_OuH5C2ADYpIjc3dqFy7wxsCKMD8eAI',
})(MapComponent);
