import React from "react";

interface SearchResultsProps {
    results: any[];
    loading: boolean;
    onSelect: (lat: number, lon: number) => void;
    show: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, loading, onSelect, show }) => {
    if (!show) return null; // Hide if no query!

    return (
        <ul
            style={{
                position: "absolute",
                top: "50px", // below input
                right: "80px",
                width: "300px",
                background: "white",
                listStyle: "none",
                padding: "5px",
                margin: 0,
                maxHeight: "200px",
                overflowY: "auto",
                borderRadius: "5px",
                boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
                zIndex: 9999,
                transition: "opacity 0.3s ease",
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
                    onClick={() => onSelect(place.lat, place.lon)}
                    style={{
                        cursor: "pointer",
                        padding: "8px",
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
    );
};

export default SearchResults;
