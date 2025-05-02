import React, { useEffect, useState } from 'react';

interface MarkerPosition {
    latitude: number;
    longitude: number;
}

interface Disaster {
    id: string;
    type: string;
    severity: string;
    description: string;
    position: MarkerPosition;
    approved: boolean;
    creationDate?: string; // ← Updated to match your backend field
}

interface DisasterFilter {
    type: string;
    startDate: string;
    endDate: string;
}

const DisasterList: React.FC = () => {
    const [disasters, setDisasters] = useState<Disaster[]>([]);
    const [filter, setFilter] = useState<DisasterFilter>({
        type: '',
        startDate: '',
        endDate: '',
    });

    const fetchDisasters = async () => {
        try {
            const response = await fetch('/api/startup/getDisasters'); // <-- ⚡ Update this to your real API
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDisasters(data);
        } catch (error) {
            console.error('Error fetching disasters:', error);
        }
    };

    useEffect(() => {
        fetchDisasters();
    }, []);

    const filteredDisasters = disasters.filter((disaster) => {
        const matchesType = filter.type ? disaster.type === filter.type : true;

        const createdAt = disaster.creationDate ? new Date(disaster.creationDate) : null;
        const startDate = filter.startDate ? new Date(filter.startDate) : null;
        const endDate = filter.endDate ? new Date(filter.endDate) : null;

        const matchesDate = createdAt && startDate && endDate
            ? createdAt >= startDate && createdAt <= endDate
            : true;

        return matchesType && matchesDate;
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilter((prev) => ({ ...prev, [name]: value }));
    };

    const formatLocalDateTime = (isoDate: string) => {
        const date = new Date(isoDate);
        return date.toLocaleString(); // Converts to user's local timezone
    };

    return (
        <div style={{
            position: 'absolute',
            top: '80px', // Below the zoom buttons
            left: '10px',
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
            width: '300px',
            maxHeight: '70vh',
            overflowY: 'auto',
            zIndex: 1000,
        }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Disaster List</h2>

            {/* Filters */}
            <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <select
                    name="type"
                    value={filter.type}
                    onChange={handleFilterChange}
                    style={{ padding: '0.5rem' }}
                >
                    <option value="">All Types</option>
                    <option value="EARTHQUAKE">Earthquake</option>
                    <option value="FLOOD">Flood</option>
                    <option value="TORNADO">Tornado</option>
                    {/* Add more types if needed */}
                </select>

                <input
                    type="date"
                    name="startDate"
                    value={filter.startDate}
                    onChange={handleFilterChange}
                    style={{ padding: '0.5rem' }}
                />
                <input
                    type="date"
                    name="endDate"
                    value={filter.endDate}
                    onChange={handleFilterChange}
                    style={{ padding: '0.5rem' }}
                />
            </div>

            {/* Disaster List */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {filteredDisasters.length > 0 ? (
                    filteredDisasters.map((disaster) => (
                        <li key={disaster.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
                            <strong>{disaster.type}</strong> - {disaster.severity} <br />
                            <span style={{ fontSize: '0.9rem', color: '#555' }}>{disaster.description}</span><br />
                            {disaster.creationDate && (
                                <small>Reported: {formatLocalDateTime(disaster.creationDate)}</small>
                            )}
                        </li>
                    ))
                ) : (
                    <li>No disasters found</li>
                )}
            </ul>
        </div>
    );
};

export default DisasterList;
