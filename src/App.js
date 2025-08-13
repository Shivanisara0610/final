import React, { useState } from "react";
import LoginPage from "./LoginPage";
import AdminPage from "./AdminPage";
import EmployeePage from "./EmployeePage";
import HRPage from "./HRPage";
import { LeaveRequestsProvider } from "./LeaveRequestsContext";

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = ({ username, password }) => {
    if (username === "hr" && password === "hr12345") setUser({ role: "hr" });
    else if (username === "employee" && password === "emp12345") setUser({ role: "employee" });
    else if (username === "admin" && password === "admin123") setUser({ role: "admin" });
    else alert("Invalid credentials");
  };

  const handleLogout = () => setUser(null);

  return (
    <LeaveRequestsProvider>
      {!user ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <>
          <div style={{ background: "#1976d2", padding: "10px 20px", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>{user.role.toUpperCase()} Dashboard</strong>
            <button onClick={handleLogout} style={{ background: "#e53935", color: "#fff", border: "none", padding: "6px 12px", borderRadius: 4, cursor: "pointer" }}>
              Logout
            </button>
          </div>
          {user.role === "hr" && <HRPage />}
          {user.role === "employee" && <EmployeePage />}
          {user.role === "admin" && <AdminPage />}
        </>
      )}
    </LeaveRequestsProvider>
  );
}
