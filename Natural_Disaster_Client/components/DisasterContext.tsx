import React, { createContext, useContext, useState } from "react";

// Define the context shape
type Disaster = {
    id: string;
    type: string;
    description: string;
    severity: string;
    creationDate: string;
    position: {
        lat: number;
        lng: number;
    };
};

type DisasterContextType = {
    filteredDisasters: Disaster[];
    setFilteredDisasters: React.Dispatch<React.SetStateAction<Disaster[]>>;
};

// Provide a default (empty) value to avoid undefined
const DisasterContext = createContext<DisasterContextType>({
    filteredDisasters: [],
    setFilteredDisasters: () => {},
});

// Hook to use the context
export const useDisasters = () => useContext(DisasterContext);

// Context provider component
export const DisasterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [filteredDisasters, setFilteredDisasters] = useState<Disaster[]>([]);

    return (
        <DisasterContext.Provider value={{ filteredDisasters, setFilteredDisasters }}>
            {children}
        </DisasterContext.Provider>
    );
};
