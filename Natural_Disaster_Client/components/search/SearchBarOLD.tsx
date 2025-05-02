import React, { useState, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

interface SearchBarProps {
    onSelectLocation: (lat: number, lng: number) => void;
}

const SearchBarOLD: React.FC<SearchBarProps> = ({ onSelectLocation }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const debounceRef = useRef<number | null>(null);
    const map = useMap();

    const handleSearch = async (input: string) => {
        if (!input) {
            setResults([]);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${input}`
            );
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Debounce search input
    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        if (debounceRef.current) {
            clearTimeout(debounceRef.current as number);
        }


        debounceRef.current = setTimeout(() => {
            handleSearch(query);
        }, 300); // Adjust debounce delay here
    }, [query]);

    const handleSelect = (lat: number, lon: number) => {
        setResults([]);
        onSelectLocation(lat, lon);
        map.setView([lat, lon], 13);
        setIsExpanded(false);
        setQuery("");
    };

    return (
        <div>
            {/* Toggle Search */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    position: "absolute",
                    background: "rgba(255, 255, 255, 0.7)",
                    borderRadius: "50%",
                    top: "10px",
                    width: "50px",
                    height: "50px",
                    right: "10px",
                    display: "flex",
                    zIndex: 9999,
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    cursor: "pointer",
                    opacity: 0.6,
                    flexShrink: 0,
                    transition: "transform 0.3s ease",
                }}
                title={isExpanded ? "Collapse" : "Search"}
            >
                🔍
            </button>

            {/* Search input & close button */}
            {isExpanded && (
                <div style={{ flex: 1, display: "flex", alignItems: "center", marginLeft: "10px" }}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search location..."
                        style={{
                            flex: 1,
                            padding: "5px",
                            border: "none",
                            outline: "none",
                            zIndex: 9999,
                            fontSize: "14px",
                            background: "transparent",
                        }}
                    />
                    <button
                        onClick={() => {
                            setIsExpanded(false);
                            setQuery("");
                            setResults([]);
                        }}
                        style={{
                            background: "transparent",
                            border: "none",
                            zIndex: 9999,
                            fontSize: "16px",
                            cursor: "pointer",
                            marginLeft: "5px",
                        }}
                        title="Close"
                    >
                    </button>
                </div>
            )}

            {/* Results dropdown */}
            {isExpanded && (
                <ul
                    style={{
                        position: "absolute",
                        top: "50px",
                        right: "10px",
                        background: "white",
                        listStyle: "none",
                        padding: "5px",
                        margin: 0,
                        maxHeight: "200px",
                        overflowY: "auto",
                        width: "300px",
                        borderRadius: "5px",
                        boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
                    }}
                >
                    {loading && (
                        <li style={{ padding: "5px", fontStyle: "italic", color: "#666" }}>
                            Searching...
                        </li>
                    )}
                    {!loading && results.map((place) => (
                        <li
                            key={place.place_id}
                            onClick={() => handleSelect(place.lat, place.lon)}
                            style={{
                                cursor: "pointer",
                                padding: "5px",
                                borderBottom: "1px solid #eee",
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

export default SearchBarOLD;
