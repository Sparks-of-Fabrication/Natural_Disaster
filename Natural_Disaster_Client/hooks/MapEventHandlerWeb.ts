import React from "react";
import {useMapEvents} from "react-leaflet";

const MapEventHandler: React.FC<{ onAddMarker: (lat: number, lng: number) => void }> = ({ onAddMarker }) => {
    useMapEvents({
        contextmenu(e) {
            onAddMarker(e.latlng.lat, e.latlng.lng);
        },
    });

    return null;
};
export default MapEventHandler;