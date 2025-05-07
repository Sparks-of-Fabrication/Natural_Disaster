import React, { useState, useEffect } from "react";
import TornadoIcon from '@mui/icons-material/Tornado'; // ✅ MUI Tornado icon
import {
    buttonStyle,
    inputStyle,
    modalStyle,
    overlayStyle,
    submitStyle,
} from "@/components/employeeFunctions/styles";

const AddDisasterTypeButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [disasterType, setDisasterType] = useState("");
    const [disasterTypes, setDisasterTypes] = useState([]);
    const [selectedDisasterTypeId, setSelectedDisasterTypeId] = useState("");

    useEffect(() => {
        fetchDisasterTypes();
    }, []);

    const fetchDisasterTypes = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/employee/getTypes");
            const data = await res.json();
            setDisasterTypes(data);
        } catch (err) {
            console.error("Error fetching disaster types:", err);
        }
    };

    const handleAdd = async () => {
        if (!disasterType.trim()) {
            console.warn("Disaster type cannot be empty.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/employee/addType", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: disasterType }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to add disaster type");
            }

            const data = await response.json();
            console.log("Disaster type added successfully:", data);
            setIsOpen(false);
            setDisasterTypes((prevTypes) => [...prevTypes, data]);
        } catch (error: any) {
            console.error("Error adding disaster type:", error);
        }
    };

    const handleDelete = async () => {
        if (!selectedDisasterTypeId) return;

        try {
            const response = await fetch(
                `http://localhost:8080/api/employee/deleteType/${selectedDisasterTypeId}`,
                { method: "DELETE" }
            );

            if (!response.ok) {
                throw new Error("Failed to delete disaster type");
            }

            setDisasterTypes((prevDisasterTypes) =>
                prevDisasterTypes.filter((item) => item.id !== selectedDisasterTypeId)
            );
            setSelectedDisasterTypeId("");
        } catch (error: any) {
            console.error("Error deleting disaster type:", error.message);
        }
    };

    return (
        <>
            <button style={buttonStyle(20, 130)} onClick={() => setIsOpen(true)}>
                <TornadoIcon />
            </button>

            {isOpen && (
                <div style={overlayStyle} onClick={() => setIsOpen(false)}>
                    <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                        <h3>Add Disaster Type</h3>
                        <input
                            type="text"
                            placeholder="Disaster Name (e.g., EARTHQUAKE)"
                            value={disasterType}
                            onChange={(e) => setDisasterType(e.target.value)}
                            style={inputStyle}
                        />
                        <button style={submitStyle} onClick={handleAdd}>
                            Submit
                        </button>

                        <h4 style={{ marginTop: "20px" }}>Delete Disaster Type</h4>
                        <select
                            value={selectedDisasterTypeId}
                            onChange={(e) => setSelectedDisasterTypeId(e.target.value)}
                            style={inputStyle}
                        >
                            {disasterTypes.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={handleDelete}
                            disabled={!selectedDisasterTypeId}
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

export default AddDisasterTypeButton;
