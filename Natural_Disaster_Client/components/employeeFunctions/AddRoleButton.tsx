import React, {useEffect, useState} from "react";
import {buttonStyle, inputStyle, modalStyle, overlayStyle, submitStyle} from "@/components/employeeFunctions/styles";
import WorkIcon from '@mui/icons-material/Work';
const AddRoleButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [roles, setRoles] = useState([]);
    const [roleName, setRoleName] = useState("");
    const [selectedRoleId, setSelectedRoleId] = useState("");

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/employee/getRoles");
            const data = await res.json();
            setRoles(data);
        } catch (err) {
            console.error("Error fetching roles:", err);
        }
    };


    const handleAdd = async () => {
        if (!roleName.trim()) {
            console.warn("Role name cannot be empty.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/employee/addRole", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: roleName }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to add role");
            }

            const data = await response.json();
            console.log("Role added successfully:", data);
            setIsOpen(false); // close modal
            await fetchRoles();
        } catch (error: any) {
            console.error("Error adding role:", error);
        }
    };

    const handleDelete = async () => {
        if (!selectedRoleId) return;

        try {
            await fetch(`http://localhost:8080/api/employee/deleteRole/${selectedRoleId}`, {
                method: "DELETE",
            });

            await fetchRoles();
            // Clear selected role
            setSelectedRoleId("");
        } catch (error: any) {
            console.error("Error deleting role:", error.message);
        }
    };


    return (
        <>
            <button
                style={buttonStyle(80,10)}
                onClick={() => setIsOpen(true)}
            >
                <WorkIcon/>
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
                        <h4 style={{marginTop: "20px"}}>Delete Role</h4>
                        <select
                            value={selectedRoleId}
                            onChange={(e) => setSelectedRoleId(e.target.value)}
                            style={inputStyle}
                        >
                            {roles.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={handleDelete}
                            disabled={!selectedRoleId}
                            style={submitStyle}
                        >
                        Delete
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddRoleButton;
