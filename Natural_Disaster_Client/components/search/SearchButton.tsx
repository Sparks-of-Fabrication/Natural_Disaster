import React from "react";
import SearchIcon from '@mui/icons-material/Search';
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
            width: "60px",
            height: "60px",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
            cursor: "pointer",
            fontSize: "20px",
            opacity: 0.8,
            transition: "background 0.2s ease",
            position: "relative",
            zIndex: 10001,
        }}
        title={isExpanded ? "Collapse" : "Search"}
    >
        <SearchIcon/>
    </button>
);

export default SearchButton;
