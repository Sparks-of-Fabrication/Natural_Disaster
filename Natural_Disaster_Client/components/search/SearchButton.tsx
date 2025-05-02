import React from "react";

interface SearchButtonProps {
    isExpanded: boolean;
    toggle: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ isExpanded, toggle }) => (
    <button
        onClick={toggle}
        style={{
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "50%",
            width: "52px",
            height: "52px",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
            cursor: "pointer",
            fontSize: "20px",
            opacity: 0.9,
            transition: "background 0.2s ease",
            position: "relative",
            zIndex: 10001,
        }}
        title={isExpanded ? "Collapse" : "Search"}
    >
        🔍
    </button>
);

export default SearchButton;
