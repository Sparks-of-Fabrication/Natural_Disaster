import React, { useState, useEffect } from "react";
import { buttonStyle, inputStyle, modalStyle, overlayStyle, submitStyle } from "@/components/employeeFunctions/styles";
import WarningIcon from '@mui/icons-material/ReportProblem';
const AddSeverityButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [severity, setSeverity] = useState("");
    const [severities, setSeverities] = useState([]);
    const [selectedSeverityId, setSelectedSeverityId] = useState("");

    useEffect(() => {
        fetchSeverities();
    }, []);

    const fetchSeverities = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/employee/getSeverities");
            const data = await res.json();
            setSeverities(data);
        } catch (err) {
            console.error("Error fetching severities:", err);
        }
    };

    const handleAdd = async () => {
        if (!severity.trim()) {
            console.warn("Severity level cannot be empty.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/employee/addSeverity", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: severity }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to add severity");
            }

            const data = await response.json();
            console.log("Severity added successfully:", data);
            setIsOpen(false); // close modal
            await fetchSeverities();
        } catch (error: any) {
            console.error("Error adding severity:", error);
        }
    };

    const handleDelete = async () => {
        if (!selectedSeverityId) return;

        try {
            await fetch(`http://localhost:8080/api/employee/deleteSeverity/${selectedSeverityId}`, {
                method: "DELETE",
            });

            await fetchSeverities();
            setSelectedSeverityId(""); // Clear selected severity
        } catch (error: any) {
            console.error("Error deleting severity:", error.message);
        }
    };

    return (
        <>
            <button
                style={buttonStyle(20, 70)}
                onClick={() => setIsOpen(true)}
            >
                <WarningIcon/>
            </button>
            {isOpen && (
                <div style={overlayStyle} onClick={() => setIsOpen(false)}>
                    <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                        <h3>Add Severity</h3>
                        <input
                            type="text"
                            placeholder="Severity Name (e.g., LOW, HIGH)"
                            value={severity}
                            onChange={(e) => setSeverity(e.target.value)}
                            style={inputStyle}
                        />
                        <button style={submitStyle} onClick={handleAdd}>
                            Submit
                        </button>

                        <h4 style={{ marginTop: "20px" }}>Delete Severity</h4>
                        <select
                            value={selectedSeverityId}
                            onChange={(e) => setSelectedSeverityId(e.target.value)}
                            style={inputStyle}
                        >
                            {severities.map((severityItem) => (
                                <option key={severityItem.id} value={severityItem.id}>
                                    {severityItem.name}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={handleDelete}
                            disabled={!selectedSeverityId}
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

export default AddSeverityButton;
