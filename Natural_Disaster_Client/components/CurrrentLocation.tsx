import React, { useState } from "react";
import { useMap, Marker } from "react-leaflet";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import L from "leaflet";

const createPulsingIcon = () =>
    L.divIcon({
        className: "pulsing-icon",
        iconSize: [20, 20],
        iconAnchor: [10, 10],
    });

const CurrentLocationButton: React.FC = () => {
    const map = useMap();
    const [position, setPosition] = useState<[number, number] | null>(null);

    const handleGeolocate = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                const coords: [number, number] = [latitude, longitude];
                setPosition(coords);
                map.setView(coords, 16);
            },
            () => {
                alert("Unable to retrieve your location");
            }
        );
    };

    return (
        <>
            {/* Embedded styles for pulsing icon */}
            <style>
                {`
          .pulsing-icon {
            width: 20px;
            height: 20px;
            background: rgba(0, 123, 255, 0.6);
            border-radius: 50%;
            position: relative;
          }

          .pulsing-icon::after {
            content: "";
            width: 100%;
            height: 100%;
            position: absolute;
            border-radius: 50%;
            background: rgba(0, 123, 255, 0.4);
            animation: pulse 1.5s infinite ease-in-out;
          }

          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            100% {
              transform: scale(2.5);
              opacity: 0;
            }
          }
        `}
            </style>

            <button
                onClick={handleGeolocate}
                style={{
                    position: "absolute",
                    top: "70px",
                    right: "10px",
                    zIndex: 1000,
                    background: "white",
                    border: "1px solid #ccc",
                    borderRadius: "100%",
                    width: "60px",
                    height: "60px",
                    boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
                    cursor: "pointer",
                    fontSize: "20px",
                    opacity: 0.8,
                    transition: "opacity 0.2s ease-in-out",
                }}
                title="Center to your location"
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
            >
                <MyLocationIcon />
            </button>

            {position && (
                <Marker position={position} icon={createPulsingIcon()} />
            )}
        </>
    );
};

export default CurrentLocationButton;
