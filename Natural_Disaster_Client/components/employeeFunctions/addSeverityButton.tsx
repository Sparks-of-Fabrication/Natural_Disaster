import React, { useState } from "react";
import {buttonStyle, inputStyle, modalStyle, overlayStyle, submitStyle} from "@/components/employeeFunctions/styles";
const AddSeverityButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [severity, setSeverity] = useState("");

    const handleAdd = () => {
        console.log("Severity Level:", severity);
        setIsOpen(false);
    };

    return (
        <>
            <button style={buttonStyle(50,30)} onClick={() => setIsOpen(true)}>
                ⚠️
            </button>
            {isOpen && (
                <div style={overlayStyle} onClick={() => setIsOpen(false)}>
                    <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                        <h3>Add Severity</h3>
                        <input
                            style={inputStyle}
                            placeholder="Severity Enum (e.g., LOW, HIGH)"
                            value={severity}
                            onChange={(e) => setSeverity(e.target.value)}
                        />
                        <button style={submitStyle} onClick={handleAdd}>Submit</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddSeverityButton;
