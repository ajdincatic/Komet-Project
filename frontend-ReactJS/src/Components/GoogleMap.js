import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { googleApiKey } from "../constants";

const mapStyles = {
  width: "50%",
  height: "50%",
};

class GoogleMap extends Component {
  render() {
    const { google, latitude, longitude } = this.props;
    return (
      <div>
        <Map
          google={google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: latitude,
            lng: longitude,
          }}
        >
          <Marker onClick={this.onMarkerClick} name={"This is test name"} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: googleApiKey,
})(GoogleMap);
