import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import customIcon from "@/components/markerIcons/defaultIcon";
import SearchBar from "../components/SearchBar";

// Center of Bulgaria
const position: [number, number] = [42.7339, 25.4858];

const WebMap: React.FC = () => {
    const [markers, setMarkers] = useState<{ lat: number; lng: number; label: string }[]>([]);
    const [tempMarker, setTempMarker] = useState<{ lat: number; lng: number } | null>(null);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);


    const MapClickHandler = () => {
        useMapEvents({
            contextmenu(e) {
                setTempMarker({ lat: e.latlng.lat, lng: e.latlng.lng });
                setInputValue("");
            }
        });
        return null;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (tempMarker && inputValue.trim() !== "") {
            setMarkers((prev) => [...prev, { ...tempMarker, label: inputValue.trim() }]);
            setTempMarker(null);
            setInputValue("");
        }
    };

    useEffect(() => {
        const input = inputRef.current;
        if (input) {
            input.focus();
        }
    }, [tempMarker]);


    return (
        <MapContainer style={{ width: "100%", height: "100vh" }} center={position} zoom={7} scrollWheelZoom={true}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapClickHandler />
            <SearchBar onSelectLocation={(lat, lng) => setMarkers([...markers, { lat, lng, label: "Search Marker" }])} />

            {markers.map((marker, index) => (
                <Marker key={index} position={[marker.lat, marker.lng]} icon={customIcon}>
                    <Popup>{marker.label}</Popup>
                </Marker>
            ))}

            {tempMarker && (
                <Marker position={[tempMarker.lat, tempMarker.lng]} icon={customIcon}>
                    <Popup>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Label:
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    style={{ width: "100%" }}
                                />
                            </label>
                            <button type="submit">Add</button>
                        </form>
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default WebMap;
