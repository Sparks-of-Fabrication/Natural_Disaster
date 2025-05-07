import React, { useState, useEffect } from "react";
import { buttonStyle, inputStyle, modalStyle, overlayStyle, submitStyle } from "@/components/employeeFunctions/styles";
import GroupIcon from "@mui/icons-material/Group";

const AddEmployeeButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [employees, setEmployees] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
    const [selectedRole, setSelectedRole] = useState({ id: "", name: "" });

    useEffect(() => {
        fetchEmployees();
        fetchRoles();
    }, []);

    const fetchEmployees = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/employee/getEmployees");
            const data = await res.json();
            setEmployees(data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const fetchRoles = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/employee/getRoles");
            const data = await res.json();
            setRoles(data);
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    };

    const handleAdd = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/employee/addEmployee", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, name, roleId: selectedRole.id }),
            });

            if (!response.ok) throw new Error("Failed to add employee");

            await fetchEmployees(); // Refresh the employee list
            resetForm();
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };

    const handleUpdate = async () => {
        if (!selectedEmployeeId) return;

        try {
            const response = await fetch(
                `http://localhost:8080/api/employee/updateEmployee/${selectedEmployeeId}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password, name, roleId: selectedRole.id }),
                }
            );

            if (!response.ok) throw new Error("Failed to update employee");

            await fetchEmployees(); // Refresh the employee list
            resetForm();
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    const handleDelete = async () => {
        if (!selectedEmployeeId) return;

        try {
            const response = await fetch(
                `http://localhost:8080/api/employee/deleteEmployee/${selectedEmployeeId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) throw new Error("Failed to delete employee");

            await fetchEmployees(); // Refresh the employee list
            resetForm();
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    const resetForm = () => {
        setSelectedEmployeeId("");
        setUsername("");
        setPassword("");
        setName("");
        setSelectedRole({ id: "", name: "" });
        setIsOpen(false);
    };

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        setSelectedEmployeeId(id);

        if (!id) {
            setUsername("");
            setPassword("");
            setName("");
            setSelectedRole({ id: "", name: "" });
            return;
        }

        const employee = employees.find((emp) => emp.id.toString() === id);
        if (employee) {
            setUsername(employee.username || "");
            setName(employee.name || "");
            setSelectedRole(employee.role || { id: "", name: "" });
            setPassword(""); // Do not show stored password for security
        }
    };

    return (
        <>
            <button style={buttonStyle(140, 10)} onClick={() => setIsOpen(true)}>
                <GroupIcon />
            </button>

            {isOpen && (
                <div style={overlayStyle} onClick={() => setIsOpen(false)}>
                    <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                        <h3>{selectedEmployeeId ? "Update Employee" : "Add Employee"}</h3>

                        <select
                            value={selectedEmployeeId}
                            onChange={handleSelect}
                            style={{ ...inputStyle, marginBottom: "10px" }}
                        >
                            <option value="">-- Select Employee to Edit --</option>
                            {employees.map((emp) => (
                                <option key={emp.id} value={emp.id.toString()}>
                                    {emp.name} ({emp.username})
                                </option>
                            ))}
                        </select>

                        <input
                            style={inputStyle}
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            style={inputStyle}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            style={inputStyle}
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <select
                            value={selectedRole.id}
                            onChange={(e) => setSelectedRole({ id: e.target.value, name: e.target.options[e.target.selectedIndex].text })}
                            style={inputStyle}
                        >
                            <option value="">-- Select Role --</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>

                        <button
                            style={submitStyle}
                            onClick={selectedEmployeeId ? handleUpdate : handleAdd}
                        >
                            {selectedEmployeeId ? "Update" : "Submit"}
                        </button>

                        {selectedEmployeeId && (
                            <button
                                style={submitStyle}
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default AddEmployeeButton;
