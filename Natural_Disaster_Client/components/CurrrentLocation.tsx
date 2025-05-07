import React from "react";
import { useMap } from "react-leaflet";
import MyLocationIcon from '@mui/icons-material/MyLocation';

const CurrentLocationButton: React.FC = () => {
    const map = useMap();

    const handleGeolocate = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                map.setView([latitude, longitude], 13);
            },
            () => {
                alert("Unable to retrieve your location");
            }
        );
    };

    return (
        <button
            onClick={handleGeolocate}
            style={{
                position: "absolute",
                top: "70px", // Positioned just below the search bar
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
            <MyLocationIcon/>
        </button>
    );
};

export default CurrentLocationButton;
