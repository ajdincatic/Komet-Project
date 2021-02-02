import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { useSelector } from "react-redux";
import { googleApiKey, darkModeMapStyles } from "../constants";

const GoogleMap = ({ google, latitude, longitude }) => {
  const isDarkMode = useSelector((state) => state.theme.isDark);
  const [key, setKey] = useState(isDarkMode);

  useEffect(() => {
    setKey(isDarkMode);
  }, [isDarkMode]);

  return (
    <div>
      <Map
        key={key}
        google={google}
        zoom={15}
        styles={isDarkMode ? darkModeMapStyles : { default: [] }}
        initialCenter={{
          lat: latitude,
          lng: longitude,
        }}
      >
        <Marker />
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: googleApiKey,
})(GoogleMap);
