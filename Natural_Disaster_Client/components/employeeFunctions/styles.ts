import { CSSProperties } from "react";

export const buttonStyle = (bottom: number,right: number): CSSProperties => ({
    position: "absolute",
    bottom: `${bottom}px`,
    right: `${right}px`,
    zIndex: 1000,
    background: "white",
    padding: "6px",
    borderRadius: "100%",
    width: "60px",
    height: "60px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
    transition: "all 0.3s ease",
});

export const overlayStyle: CSSProperties = {
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
};

export const modalStyle: CSSProperties = {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    minWidth: "300px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
};

export const inputStyle: CSSProperties = {
    width: "100%",
    marginBottom: "10px",
    padding: "5px",
};

export const submitStyle: CSSProperties = {
    width: "100%",
    padding: "8px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
};
