import React, { useEffect, useState } from 'react';
import { useDisasters } from './DisasterContext'; // Adjust the path as needed

// Define the disaster type interface
interface Disaster {
    id: string;
    type: string;
    position: {
        lat: number;
        lng: number;
    };
    description: string;
    severity: string;
    creationDate: string;
    approved: boolean;
}

interface DisasterType {
    id: string;
    name: string;
}

const DisasterList: React.FC = () => {
    const { filteredDisasters, setFilteredDisasters } = useDisasters();
    const [disasterTypes, setDisasterTypes] = useState<DisasterType[]>([]);
    const [selectedType, setSelectedType] = useState<string | undefined>();
    const [startDate, setStartDate] = useState<string | undefined>();
    const [endDate, setEndDate] = useState<string | undefined>();
    const [dateOption, setDateOption] = useState<'single' | 'range' | 'none'>('none');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const fetchDisasters = async () => {
        console.log("fetchDisasters called");
        try {
            const token = localStorage.getItem("token");
            const response = await fetch('http://localhost:8080/api/disaster/getDisasters', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data: Disaster[] = await response.json();
            applyFilters(data);
        } catch (error) {
            console.error('Error fetching disasters:', error);
        }
    };

    const fetchDisasterTypes = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/employee/getTypes');
            const data = await res.json();
            setDisasterTypes(data);
        } catch (err) {
            console.error('Error fetching disaster types:', err);
        }
    };
    const handleApprove = async (id: string) => {
        try {
            const token = localStorage.getItem("token");
            await fetch(`http://localhost:8080/api/disaster/approve/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchDisasters(); // Refresh list
        } catch (err) {
            console.error("Error approving disaster:", err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const token = localStorage.getItem("token");
            await fetch(`http://localhost:8080/api/disaster/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchDisasters(); // Refresh list
        } catch (err) {
            console.error("Error deleting disaster:", err);
        }
    };


    const applyFilters = (data: Disaster[]) => {
        const filtered = data.filter((disaster) => {
            const matchesType = selectedType ? disaster.type === selectedType : true;
            const createdAt = disaster.creationDate ? new Date(disaster.creationDate) : null;

            if (dateOption === 'single' && startDate) {
                const start = new Date(startDate);
                return matchesType && createdAt && createdAt.toDateString() === start.toDateString();
            }

            if (dateOption === 'range' && startDate && endDate) {
                const start = new Date(startDate);
                const end = new Date(endDate);
                return matchesType && createdAt && createdAt >= start && createdAt <= end;
            }

            return matchesType;
        });

        setFilteredDisasters(filtered);
    };

    useEffect(() => {
        fetchDisasters();
        fetchDisasterTypes();
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
        console.log(isAuthenticated);
    }, []);

    useEffect(() => {
        fetchDisasters();
    }, [selectedType, startDate, endDate, dateOption]);


    return (
        <div style={{
            position: 'absolute',
            top: '80px',
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

                <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} style={{ padding: '0.5rem' }}>
                    <option value="">All Types</option>
                    {disasterTypes.map((type) => (
                        <option key={type.id} value={type.name}>{type.name}</option>
                    ))}
                </select>

                <select
                    value={dateOption}
                    onChange={(e) => setDateOption(e.target.value as 'single' | 'range' | 'none')}
                    style={{ padding: '0.5rem' }}
                >
                    <option value="none">No Date Filter</option>
                    <option value="single">Single Date</option>
                    <option value="range">Date Range</option>
                </select>

                {dateOption === 'single' && (
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        style={{ padding: '0.5rem' }}
                    />
                )}

                {dateOption === 'range' && (
                    <>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            style={{ padding: '0.5rem' }}
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            style={{ padding: '0.5rem' }}
                        />
                    </>
                )}
            </div>

            {/* Disaster List */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {filteredDisasters.map((disaster) => (
                    <li key={disaster.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
                        <strong>{disaster.type}</strong> - {disaster.severity} <br />
                        <span style={{ fontSize: '0.9rem', color: '#555' }}>{disaster.description}</span><br />
                        {disaster.creationDate && (
                            <small>Reported: {new Date(disaster.creationDate).toLocaleString()}</small>
                        )}

                        {/* Show buttons if unapproved */}
                        {!disaster.approved && (
                            <div style={{ marginTop: '0.5rem' }}>
                                <button onClick={() => handleApprove(disaster.id)} style={{ marginRight: '0.5rem', backgroundColor: 'green', color: 'white', padding: '0.3rem 0.5rem' }}>
                                    Approve
                                </button>
                                <button onClick={() => handleDelete(disaster.id)} style={{ backgroundColor: 'red', color: 'white', padding: '0.3rem 0.5rem' }}>
                                    Delete
                                </button>
                            </div>
                        )}
                    </li>
                ))}

            </ul>
        </div>
    );
};

export default DisasterList;
