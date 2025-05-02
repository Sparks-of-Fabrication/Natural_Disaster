import React, { useEffect, useState } from "react";

type Employee = {
    id: number;
    username: string;
    role: {
        id: number;
        name: string;
    };
};

interface Props {
    username: string;
}

const EmployeeDashboard: React.FC<Props> = ({ username }) => {
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/employee/${username}`)
            .then((res) => {
                if (!res.ok) throw new Error("Employee not found");
                return res.json();
            })
            .then((data) => setEmployee(data))
            .catch((err) => setError(err.message));
    }, [username]);

    if (error) {
        return <div style={{ padding: "20px", color: "red" }}>{error}</div>;
    }

    if (!employee) {
        return <div style={{ padding: "20px" }}>Loading dashboard...</div>;
    }

    return (
        <div style={{ padding: "30px" }}>
            <h2>Welcome, {employee.username}</h2>
            <p><strong>Role:</strong> {employee.role.name}</p>
            {/* You can expand this to show assigned tasks, recent actions, etc. */}
        </div>
    );
};

export default EmployeeDashboard;
