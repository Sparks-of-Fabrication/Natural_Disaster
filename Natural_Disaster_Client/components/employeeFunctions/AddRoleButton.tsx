import React, { useState } from "react";
import {buttonStyle, inputStyle, modalStyle, overlayStyle, submitStyle} from "@/components/employeeFunctions/styles";
const AddRoleButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [roleName, setRoleName] = useState("");

    const handleAdd = () => {
        console.log("Adding role:", roleName);
        // You could call an API here
        setIsOpen(false);
    };

    return (
        <>
            <button
                style={buttonStyle(50,10)}
                onClick={() => setIsOpen(true)}
            >
                🧑‍💼
            </button>
            {isOpen && (
                <div style={overlayStyle} onClick={() => setIsOpen(false)}>
                    <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                        <h3>Add Role</h3>
                        <input
                            type="text"
                            placeholder="Role Name"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            style={inputStyle}
                        />
                        <button style={submitStyle} onClick={handleAdd}>
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddRoleButton;
