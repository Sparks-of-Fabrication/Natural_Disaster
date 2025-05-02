import React, { useState } from "react";
import {buttonStyle, inputStyle, modalStyle, overlayStyle, submitStyle} from "@/components/employeeFunctions/styles";

const AddDisasterTypeButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [disasterType, setDisasterType] = useState("");

    const handleAdd = () => {
        console.log("Disaster Type:", disasterType);
        setIsOpen(false);
    };

    return (
        <>
            <button style={buttonStyle(90,30)} onClick={() => setIsOpen(true)}>
                🌪️
            </button>
            {isOpen && (
                <div style={overlayStyle} onClick={() => setIsOpen(false)}>
                    <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                        <h3>Add Disaster Type</h3>
                        <input
                            style={inputStyle}
                            placeholder="Disaster Enum (e.g., EARTHQUAKE)"
                            value={disasterType}
                            onChange={(e) => setDisasterType(e.target.value)}
                        />
                        <button style={submitStyle} onClick={handleAdd}>Submit</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddDisasterTypeButton;
