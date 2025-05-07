import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import LayersIcon from '@mui/icons-material/Layers';
const layers = {
    street: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
    }),
    satellite: L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
            attribution:
                "Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
        }
    ),
    topo: L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
        attribution:
            "Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)",
    }),
};

const MapLayerToggle: React.FC = () => {
    const map = useMap();
    const [activeLayer, setActiveLayer] = useState<"street" | "satellite" | "topo">("street");
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const layer = layers[activeLayer];
        layer.addTo(map);

        return () => {
            map.eachLayer((layer) => {
                if ((layer as any)._url) {
                    map.removeLayer(layer);
                }
            });
        };
    }, [activeLayer, map]);

    const handleSelect = (type: "street" | "satellite" | "topo") => {
        setActiveLayer(type);
        setIsExpanded(false); // Collapse after selection
    };

    return (
        <div
            style={{
                position: "absolute",
                top: "130px",
                right: "10px",
                zIndex: 1000,
                background: "white",
                padding: isExpanded ? "8px" : "6px",
                borderRadius: "100px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
                transition: "all 0.3s ease",
            }}
        >
            {/* Button that remains unchanged */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    background: "rgba(255, 255, 255, 0.8)",
                    border: "none",
                    borderRadius: "50%", // circle shape
                    width: "48px",       // slightly larger for better emoji centering
                    height: "48px",
                    fontSize: "20px",
                    cursor: "pointer",
                    display: "flex",     // center content
                    alignItems: "center",
                    justifyContent: "center",

                }}
                title="Change Map Layer"
            >
                <LayersIcon/>
            </button>

            {/* Expanded options container (slide out to the left) */}
            {isExpanded && (
                <div
                    style={{
                        position: "absolute",
                        top: "0", // align to the top of the button
                        right: "70px", // Move options container 10px more to the left
                        width: "120px", // Set width for the options container
                        background: "white",
                        borderRadius: "8px",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
                        transition: "all 0.3s ease",
                        padding: "10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        opacity: isExpanded ? 1 : 0, // Option container becomes visible after button is clicked
                    }}
                >
                    <button onClick={() => handleSelect("street")} style={optionStyle}>
                        🛣 Street
                    </button>
                    <button onClick={() => handleSelect("satellite")} style={optionStyle}>
                        🛰 Satellite
                    </button>
                    <button onClick={() => handleSelect("topo")} style={optionStyle}>
                        🗻 Topo
                    </button>
                </div>
            )}
        </div>
    );
};

const optionStyle: React.CSSProperties = {
    padding: "6px 8px",
    fontSize: "14px",
    border: "none",
    borderRadius: "5px",
    background: "#f0f0f0",
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
};

export default MapLayerToggle;
