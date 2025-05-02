import React, { useState, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import SearchButton from "./SearchButton";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

interface SearchBarProps {
    onSelectLocation: (lat: number, lng: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSelectLocation }) => {
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
        }, 300);
    }, [query]);

    const handleSelect = (lat: number, lon: number) => {
        setResults([]);
        onSelectLocation(lat, lon);
        map.setView([lat, lon], 13);
        setIsExpanded(false);
        setQuery("");
    };

    return (
        <div style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            display: "flex",
            alignItems: "center",
            zIndex: 9999,
        }}>
            <SearchInput
                query={query}
                setQuery={setQuery}
                isExpanded={isExpanded}
            />
            <SearchButton
                isExpanded={isExpanded}
                toggle={() => {
                    setIsExpanded(!isExpanded);
                    if (!isExpanded) {
                        setQuery("");
                        setResults([]);
                    }
                }}
            />
            <SearchResults
                results={results}
                loading={loading}
                onSelect={handleSelect}
                show={isExpanded && query.length > 0}
            />
        </div>
    );
};

export default SearchBar;
