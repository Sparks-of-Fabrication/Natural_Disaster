import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import customIcon from "@/components/markerIcons/defaultIcon";
import SearchBar from "@/components/search/SearchBar";
import DisasterFormPopup from "@/components/DisasterFormPopup";
import CurrentLocationButton from "@/components/CurrrentLocation";
import MapLayerToggle from "@/components/MapLayerToggle";
import LoginButton from "@/components/employeeFunctions/LoginButton";
import DisasterList from "@/components/DisasterList";
import { useDisasters } from "./DisasterContext"; // 👈 Import your context for filtered disasters

// Center of Bulgaria
const position: [number, number] = [42.7339, 25.4858];

const WebMap: React.FC = () => {
    const [markers, setMarkers] = useState<{ lat: number; lng: number; label: string }[]>([]);
    const [tempMarker, setTempMarker] = useState<{ lat: number; lng: number } | null>(null);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Get filtered disasters from your context
    const { filteredDisasters } = useDisasters();

    const MapClickHandler = () => {
        useMapEvents({
            contextmenu(e) {
                setTempMarker({ lat: e.latlng.lat, lng: e.latlng.lng });
                setInputValue(""); // Clear input when adding a new marker
            }
        });
        return null;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (tempMarker && inputValue.trim() !== "") {
            setMarkers((prev) => [...prev, { ...tempMarker, label: inputValue.trim() }]);
            setTempMarker(null); // Reset the temporary marker after submission
            setInputValue(""); // Clear input field after submission
        }
    };

    useEffect(() => {
        const input = inputRef.current;
        if (input) {
            input.focus(); // Focus on the input field when a temp marker is added
        }
    }, [tempMarker]);

    return (
        <MapContainer style={{ width: "100%", height: "100vh" }} center={position} zoom={7} scrollWheelZoom={true}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapClickHandler />

            {/* Loop through filtered disasters to add disaster markers */}
            {filteredDisasters.map((disaster) => {
                const { latitude, longitude } = disaster.position || {};
                if (latitude === undefined || longitude === undefined) {
                    console.warn("Invalid position for disaster:", disaster);
                    return null;
                }

                return (
                    <Marker key={disaster.id} position={[latitude, longitude]} icon={customIcon}>
                        <Popup>
                            <strong>{disaster.type}</strong> - {disaster.severity}
                            <br />
                            {disaster.description}
                            <br />
                            <small>{new Date(disaster.creationDate).toLocaleString()}</small>
                        </Popup>
                    </Marker>
                );
            })}

            {/* Render temp marker if adding a new one */}
            {tempMarker && (
                <Marker position={[tempMarker.lat, tempMarker.lng]} icon={customIcon}>
                    <Popup>
                        <DisasterFormPopup position={tempMarker} />
                    </Popup>
                </Marker>
            )}

            {/* Add search bar and other components */}
            <SearchBar onSelectLocation={(lat, lng) => setMarkers([...markers, { lat, lng, label: "Search Marker" }])} />
            <CurrentLocationButton />
            <MapLayerToggle />
            <LoginButton />
            <DisasterList />
        </MapContainer>
    );
};

export default WebMap;
