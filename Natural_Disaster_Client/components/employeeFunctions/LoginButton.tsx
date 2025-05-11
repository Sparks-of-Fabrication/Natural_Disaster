import React, { useState } from "react";
import AddDisasterTypeButton from "@/components/employeeFunctions/AddDisasterTypeButton";
import AddEmployeeButton from "@/components/employeeFunctions/AddEmployeeButton";
import AddRoleButton from "@/components/employeeFunctions/AddRoleButton";
import AddSeverityButton from "@/components/employeeFunctions/addSeverityButton";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
const LoginButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // Check if the user is already authenticated when the page is loaded
    React.useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = async () => {
        if (!username || !password) {
            setError("Please enter both fields.");
            return;
        }

        try {
            // Send POST request to backend API with username and password
            const response = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }), // Send JSON with username and password
            });

            const text = await response.text(); // Helpful for debugging raw response text
            console.log("Raw response text:", text);

            // Check if response is OK (status code 200-299)
            if (!response.ok) {
                throw new Error(`Login failed: ${response.status} ${text}`); // Include status in error message
            }

            // Parse the JSON response
            const data = JSON.parse(text);
            console.log("Parsed data:", data); // Log parsed data to verify it

            // Store the token in localStorage and mark user as authenticated
            if(data.token != null) {
                localStorage.setItem("token", data.token);
                setIsAuthenticated(true);  // Update authentication state
                setError(""); // Clear error message after successful login
                window.location.href = "/web";
            }
        } catch (err: any) {
            console.error("Login error:", err.message);
            setError(err.message || "Login failed"); // Show error message to user
        }
    };




    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false); // Mark user as not authenticated
        window.location.href = "/web"; // Redirect to home page or logout page
    };

    return (
        <>
            {/* Circle Button */}
            {!isAuthenticated ? (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        position: "absolute",
                        bottom: "20px",
                        right: "10px",
                        zIndex: 1000,
                        background: "white",
                        padding: "6px",
                        borderRadius: "100%", // circle shape
                        width: "60px",       // slightly larger for better emoji centering
                        height: "60px",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
                        transition: "all 0.3s ease",
                    }}
                    title="Employee Login"
                >
                    <LoginIcon/>
                </button>
            ) : (
                <button
                    onClick={handleLogout}
                    style={{
                        position: "absolute",
                        bottom: "20px",
                        right: "10px",
                        zIndex: 1000,
                        background: "white",
                        padding: "6px",
                        borderRadius: "100%", // circle shape
                        width: "60px",       // slightly larger for better emoji centering
                        height: "60px",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
                        transition: "all 0.3s ease",
                    }}
                    title="Logout"
                >
                    <LogoutIcon/>
                </button>
            )}

            {/* Modal Login Prompt */}
            {isOpen && !isAuthenticated && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999,
                    }}
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: "white",
                            padding: "20px",
                            borderRadius: "10px",
                            minWidth: "300px",
                            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                        }}
                    >
                        <h3>Employee Login</h3>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
                        />
                        <button
                            onClick={handleLogin}
                            style={{
                                width: "100%",
                                padding: "8px",
                                backgroundColor: "#28a745",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                            }}
                        >
                            Login
                        </button>
                    </div>
                </div>
            )}

            {/* Additional Content for Authenticated Users */}
            {isAuthenticated && (
                <div>
                    <AddDisasterTypeButton />
                    <AddEmployeeButton/>
                    <AddRoleButton />
                    <AddSeverityButton/>
                </div>
            )}
        </>
    );
};

export default LoginButton;
