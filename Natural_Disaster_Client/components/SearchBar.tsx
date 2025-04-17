import React, { useState } from "react";
import { useMap } from "react-leaflet";

interface SearchBarProps {
    onSelectLocation: (lat: number, lng: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSelectLocation }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [isExpanded, setIsExpanded] = useState(false); // Toggle state
    const map = useMap();

    const handleSearch = async () => {
        if (!query) return;

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
        );
        const data = await response.json();
        setResults(data);
    };

    const handleSelect = (lat: number, lon: number) => {
        setResults([]);
        onSelectLocation(lat, lon);
        map.setView([lat, lon], 13); // Move map to selected location
        setIsExpanded(false); // Collapse after selection
    };

    return (
        <div
            style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 1000,
                background: "white",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
                width: isExpanded ? "250px" : "50px", // Adjust width
                transition: "width 0.3s ease-in-out",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
            }}
        >
            {/* Search Icon Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "20px",
                    padding: "5px",
                }}
            >
                🔍
            </button>

            {/* Input Field (Shown only if expanded) */}
            {isExpanded && (
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search location..."
                    style={{
                        padding: "5px",
                        width: "80%",
                        border: "none",
                        outline: "none",
                    }}
                />
            )}

            {/* Search Button */}
            {isExpanded && (
                <button onClick={handleSearch} style={{ marginLeft: "5px", padding: "5px" }}>
                    🔎
                </button>
            )}

            {/* Search Results */}
            {isExpanded && results.length > 0 && (
                <ul
                    style={{
                        position: "absolute",
                        top: "40px",
                        right: "0",
                        background: "white",
                        listStyle: "none",
                        padding: "5px",
                        margin: "5px 0",
                        maxHeight: "150px",
                        overflowY: "auto",
                        width: "100%",
                        borderRadius: "5px",
                        boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
                    }}
                >
                    {results.map((place) => (
                        <li
                            key={place.place_id}
                            onClick={() => handleSelect(place.lat, place.lon)}
                            style={{
                                cursor: "pointer",
                                padding: "5px",
                                borderBottom: "1px solid #ccc",
                                background: "#f9f9f9",
                                transition: "background 0.2s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#ddd")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "#f9f9f9")}
                        >
                            {place.display_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
