import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet';
import MapEventHandler from '../hooks/MapEventHandlerWeb';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Bulgaria's center coordinates
const position: [number, number] = [42.7339, 25.4858];


const AdjustZoom: React.FC = () => {
    const map = useMap();

    useEffect(() => {
        map.setZoom(map.getZoom() + 1);// Increase zoom level by 1
    }, [map]);

    return null;
};

const WebMap: React.FC = () => {
    const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);

    const handleAddMarker = (lat: number, lng: number) => {
        setMarkers((prevMarkers) => [...prevMarkers, { lat, lng }]);
    };

    return (
        <MapContainer style={{ width: '100%', height: '100vh' }} center={position} zoom={7} scrollWheelZoom={true}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapEventHandler onAddMarker={handleAddMarker} />
            {markers.map((marker, index) => (
                <Marker key={index} position={[marker.lat, marker.lng]}>
                    <Popup>You added a marker here!</Popup>
                </Marker>
            ))}
            <AdjustZoom/>
        </MapContainer>
    );
};

export default WebMap;

