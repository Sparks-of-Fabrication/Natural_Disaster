import React, { useState } from "react";
import {buttonStyle, inputStyle, modalStyle, overlayStyle, submitStyle} from "@/components/employeeFunctions/styles";
const AddEmployeeButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [roleId, setRoleId] = useState("");

    const handleAdd = () => {
        console.log("New Employee:", { username, password, name, roleId });
        setIsOpen(false);
    };

    return (
        <>
            <button style={buttonStyle(70,10)} onClick={() => setIsOpen(true)}>
                👷
            </button>
            {isOpen && (
                <div style={overlayStyle} onClick={() => setIsOpen(false)}>
                    <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                        <h3>Add Employee</h3>
                        <input style={inputStyle} placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input style={inputStyle} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input style={inputStyle} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <input style={inputStyle} placeholder="Role ID" value={roleId} onChange={(e) => setRoleId(e.target.value)} />
                        <button style={submitStyle} onClick={handleAdd}>Submit</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddEmployeeButton;
