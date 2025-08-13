import React, { useState } from "react";
import { useLeaveRequests } from "./LeaveRequestsContext";

const initialPayrollData = [
  { id: 1, name: "Neha", dept: "Sales", basicSalary: 48000, allowances: 12000, deductions: 7000 },
  { id: 2, name: "Harshan", dept: "Finance", basicSalary: 52000, allowances: 15000, deductions: 9000 },
  { id: 3, name: "Anu", dept: "HR", basicSalary: 50000, allowances: 13000, deductions: 8000 },
];

export default function AdminPage() {
  const { leaveRequests } = useLeaveRequests();
  const [payrollData, setPayrollData] = useState(initialPayrollData);

  // Handler for input changes in payroll fields
  const handleChange = (id, field, value) => {
    setPayrollData((prev) =>
      prev.map((emp) =>
        emp.id === id
          ? { ...emp, [field]: isNaN(Number(value)) ? emp[field] : Number(value) }
          : emp
      )
    );
  };

  // Calculate net salary on the fly
  const calculateNetSalary = (emp) =>
    emp.basicSalary + emp.allowances - emp.deductions;

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "20px auto",
        background: "#fff",
        padding: 20,
        borderRadius: 8,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: 20, textAlign: "center" }}>Admin Dashboard</h2>

      {/* Leave Requests Overview (read-only) */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 12, borderBottom: "1px solid #ddd", paddingBottom: 6 }}>
          All Leave Requests
        </h3>
        {leaveRequests.length === 0 ? (
          <p style={{ textAlign: "center", color: "#777" }}>
            No leave requests found
          </p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f5f5f5" }}>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Dates</th>
                <th style={thStyle}>Reason</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((req) => (
                <tr key={req.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={tdStyle}>{req.name}</td>
                  <td style={tdStyle}>{req.leaveType}</td>
                  <td style={tdStyle}>
                    {req.fromDate} to {req.toDate}
                  </td>
                  <td style={tdStyle}>{req.reason || "-"}</td>
                  <td style={tdStyle}>{req.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Editable Payroll Overview */}
      <section>
        <h3 style={{ marginBottom: 12, borderBottom: "1px solid #ddd", paddingBottom: 6 }}>
          Company Payroll Management
        </h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Department</th>
              <th style={thStyle}>Basic Salary</th>
              <th style={thStyle}>Allowances</th>
              <th style={thStyle}>Deductions</th>
              <th style={thStyle}>Net Salary</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map((emp) => (
              <tr key={emp.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={tdStyle}>{emp.name}</td>
                <td style={tdStyle}>{emp.dept}</td>
                <td style={tdInputStyle}>
                  <input
                    type="number"
                    value={emp.basicSalary}
                    onChange={(e) =>
                      handleChange(emp.id, "basicSalary", e.target.value)
                    }
                    style={inputStyle}
                  />
                </td>
                <td style={tdInputStyle}>
                  <input
                    type="number"
                    value={emp.allowances}
                    onChange={(e) =>
                      handleChange(emp.id, "allowances", e.target.value)
                    }
                    style={inputStyle}
                  />
                </td>
                <td style={tdInputStyle}>
                  <input
                    type="number"
                    value={emp.deductions}
                    onChange={(e) =>
                      handleChange(emp.id, "deductions", e.target.value)
                    }
                    style={inputStyle}
                  />
                </td>
                <td style={{ ...tdStyle, fontWeight: "600" }}>
                  ₹{calculateNetSalary(emp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

// Styling
const thStyle = {
  padding: 8,
  textAlign: "left",
  borderBottom: "2px solid #ccc",
  fontWeight: "bold",
};
const tdStyle = { padding: 8, verticalAlign: "middle" };
const tdInputStyle = { padding: 4, verticalAlign: "middle" };
const inputStyle = {
  width: "100%",
  padding: "6px 8px",
  borderRadius: 4,
  border: "1px solid #ccc",
  fontSize: 14,
};
