import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const MapWithPolyline = () => {
  const sourcePosition = [51.505, -0.09]; // Source coordinates
  const intermediatePosition = [51.51, -0.1]; // Intermediate coordinates
  const destinationPosition = [51.515, -0.1]; // Destination coordinates

  const polylinePositions = [sourcePosition, intermediatePosition, destinationPosition];

  return (
    <MapContainer center={sourcePosition} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker style={{color:"red"}} position={sourcePosition}>
        {/* Marker for the source */}
      </Marker>

      <Marker position={intermediatePosition}>
        
      </Marker>

      <Marker position={destinationPosition}>
        {/* Marker for the destination */}
      </Marker>

      <Polyline positions={polylinePositions} color="blue" />

    </MapContainer>
  );
};

export default MapWithPolyline;
