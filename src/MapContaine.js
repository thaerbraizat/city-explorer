import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContaine extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: this.props.lat,
            lng: this.props.lon
          }
        }
        
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAeNgwO_Afkc2LIfGdoeVXPifuQcDuBUp0'
})(MapContaine);