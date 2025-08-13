import React from "react";
import { useLeaveRequests } from "./LeaveRequestsContext";

// Mock payroll data for employees (for demo)
const mockPayrollData = [
  { name: "Neha", basicSalary: 48000, bonus: 12000, deductions: 7000, netSalary: 53000},
  { name: "Harshan", basicSalary: 52000, bonus: 15000, deductions: 9000, netSalary: 58000},
  { name: "Anu", basicSalary: 50000, bonus: 13000, deductions: 8000, netSalary: 55000},
];

export default function HRPage() {
  const { leaveRequests, updateLeave } = useLeaveRequests();

  return (
    <div style={{ maxWidth: 900, margin: "20px auto", background: "#fff", padding: 20, borderRadius: 8, boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
      <h2 style={{ marginBottom: 16, textAlign: "center" }}>Team Leave Requests</h2>
      {leaveRequests.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>No leave requests yet</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 40 }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Dates</th>
              <th style={thStyle}>Reason</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map(req => (
              <tr key={req.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={tdStyle}>{req.name}</td>
                <td style={tdStyle}>{req.leaveType}</td>
                <td style={tdStyle}>{req.fromDate} to {req.toDate}</td>
                <td style={tdStyle}>{req.reason || "-"}</td>
                <td style={tdStyle}>{req.status}</td>
                <td style={tdStyle}>
                  <button style={actionBtn("green")} disabled={req.status === "Accepted"} onClick={() => updateLeave(req.id, { status: "Accepted" })}>Accept</button>
                  <button style={actionBtn("red")} disabled={req.status === "Denied"} onClick={() => updateLeave(req.id, { status: "Denied" })}>Deny</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Payroll Summary Table */}
      <h3 style={{ marginBottom: 12, borderBottom: "1px solid #ddd", paddingBottom: 6 }}>Payroll Summary</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Basic Salary</th>
            <th style={thStyle}>Bonus</th>
            <th style={thStyle}>Deductions</th>
            <th style={thStyle}>Net Salary</th>
          </tr>
        </thead>
        <tbody>
          {mockPayrollData.map((p) => (
            <tr key={p.name} style={{borderBottom: "1px solid #eee"}}>
              <td style={tdStyle}>{p.name}</td>
              <td style={tdStyle}>₹{p.basicSalary.toLocaleString()}</td>
              <td style={tdStyle}>₹{p.bonus.toLocaleString()}</td>
              <td style={tdStyle}>₹{p.deductions.toLocaleString()}</td>
              <td style={tdStyle}>₹{p.netSalary.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = { padding: 8, textAlign: "left", borderBottom: "2px solid #ccc" };
const tdStyle = { padding: 8, verticalAlign: "top" };
const actionBtn = (color) => ({
  background: color,
  color: "#fff",
  padding: "4px 8px",
  marginRight: 6,
  border: "none",
  borderRadius: 4,
  cursor: "pointer"
});
