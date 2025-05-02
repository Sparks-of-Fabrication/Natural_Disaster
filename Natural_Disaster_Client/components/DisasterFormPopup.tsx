import React, { useEffect, useState } from "react";

type Props = {
    position: { lat: number; lng: number };
};

const DisasterFormPopup: React.FC<Props> = ({ position }) => {
    const [disasterTypes, setDisasterTypes] = useState<string[]>([]);
    const [disasterType, setDisasterType] = useState("");
    const [description, setDescription] = useState("");
    const [severity, setSeverity] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [severities, setSeverities] = useState<string[]>([]);
    useEffect(() => {
        fetch("http://localhost:8080/api/startup/disaster-types")
            .then((response) => response.json())
            .then((data) => setDisasterTypes(data))
            .catch((error) => {
                console.error("Error fetching disaster types:", error);
                setError("Failed to load disaster types.");
            });

        fetch("http://localhost:8080/api/startup/severity-levels")
            .then((response) => response.json())
            .then((data) => {
                console.log("Severity levels from server:", data); // <--- Add this
                setSeverities(data);
            })
            .catch((error) => {
                console.error("Error fetching severities:", error);
                setError("Failed to load severity levels.");
            });

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!disasterType || !severity || !description || !position) {
            setError("Please fill out all fields, including selecting a location.");
            return;
        }

        const disasterData = {
            type: disasterType, // Must be like "WILDFIRE"
            severity: severity, // Must be like "HIGH"
            description: description,
            position: {
                latitude: position.lat,
                longitude: position.lng
            },
                creationDate: new Date().toISOString(),
            approved: false // Optional
        };

        try {
            const response = await fetch('http://localhost:8080/api/startup/addDisaster', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(disasterData)
            });

            if (response.ok) {
                setSuccess("Disaster reported successfully!");
                setError(null);
                setDisasterType("");
                setSeverity("");
                setDescription("");
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Failed to submit disaster.");
            }
        } catch (error) {
            setError("An error occurred while submitting the disaster.");
            console.error(error);
        }
    };



    return (
        <form onSubmit={handleSubmit}>
            {error && <div style={{ color: "red" }}>{error}</div>}
            {success && <div style={{ color: "green" }}>{success}</div>}

            <label>
                Disaster Type:
                <select
                    value={disasterType}
                    onChange={(e) => setDisasterType(e.target.value)}
                    style={{ width: "100%" }}
                >
                    <option value="">Select type</option>
                    {disasterTypes.map((type) => (
                        <option key={type} value={type}>
                            {type.replaceAll("_", " ").toLowerCase().replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Severity:
                <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    style={{width: "100%"}}
                >
                    <option value="">Select severity</option>
                    {severities.map((level) => (
                        <option key={level} value={level}>
                            {level.replaceAll("_", " ").toLowerCase().replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
                        </option>
                    ))}
                </select>

            </label>

            <label>
                Description:
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{width: "100%"}}
                />
            </label>

            <button type="submit">Submit</button>
        </form>
    );
};

export default DisasterFormPopup;
