import React, { useState, useEffect, useRef } from "react";

interface SearchInputProps {
    query: string;
    setQuery: (q: string) => void;
    isExpanded: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ query, setQuery, isExpanded }) => {
    const debounceRef = useRef<number | null>(null);

    // Function to handle search input with debounce
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
    };

    useEffect(() => {
        if (debounceRef.current) {
            // @ts-ignore
            clearTimeout(debounceRef.current);
        }

        if (query) {
            debounceRef.current = setTimeout(() => {
                // Trigger the API or search logic here if needed
            }, 500); // 500ms debounce delay
        }

        return () => {
            if (debounceRef.current) {
                // @ts-ignore
                clearTimeout(debounceRef.current);
            }
        };
    }, [query]);

    return (
        <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search location..."
            style={{
                width: isExpanded ? "300px" : "0px",
                opacity: isExpanded ? 1 : 0,
                transition: "all 0.3s ease",
                height: "50px",
                borderRadius: "25px",
                border: "1px solid #ccc",
                padding: isExpanded ? "0 20px" : "0px",
                fontSize: "16px",
                background: "white",
                overflow: "hidden",
                whiteSpace: "nowrap",
                marginRight: "10px",
                zIndex: 10000,
            }}
        />
    );
};

export default SearchInput;
