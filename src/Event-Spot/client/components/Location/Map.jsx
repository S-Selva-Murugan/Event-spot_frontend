import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { latLng } from 'leaflet';

function Map() {
  const [radius, setRadius] = useState(500); // Initial radius in meters
  const [lonlat, setLonLat] = useState([]);
  const [center, setCenter] = useState([]); // Initial map center

  const handleRadiusChange = (event) => {
    setRadius(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    const success = (position) => {
      const { latitude, longitude } = position.coords;
      console.log(latitude, longitude);
      setCenter([latitude, longitude]); // Use an array to set the center
      setLonLat([latitude, longitude]); // Use an array to set lonlat
    };

    const error = (error) => {
      console.error(error);
    };

    // Check if the Geolocation API is supported by the browser
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div>
      <div>
        <input
          type="range"
          min="100"
          max="5000"
          step="50"
          value={radius}
          onChange={handleRadiusChange}
        />
        <p>Radius: {radius} meters</p>

        <p>Latitude: {center[0]}, Longitude: {center[1]}, Radius: {radius} meters</p>

        <MapContainer center={center.length > 0 ? center : [0, 0]} zoom={13} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Circle center={lonlat.length > 0 ? latLng(lonlat) : [0, 0]} radius={radius} />
        </MapContainer>
      </div>
    </div>
  );
}

export default Map;
