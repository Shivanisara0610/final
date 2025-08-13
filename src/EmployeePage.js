import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLeaveRequests } from "./LeaveRequestsContext";

const leaveTypes = [
  { label: "Select a leave type", value: "" },
  { label: "Sick Leave", value: "Sick Leave" },
  { label: "Casual Leave", value: "Casual Leave" },
  { label: "Annual Leave", value: "Annual Leave" }
];

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  leaveType: Yup.string().required("Select a leave type"),
  fromDate: Yup.date().required("Start date is required"),
  toDate: Yup.date()
    .required("End date is required")
    .min(Yup.ref("fromDate"), "End date cannot be before start"),
  reason: Yup.string().when("leaveType", (val, s) =>
    val === "Sick Leave" ? s.required("Reason is required") : s
  )
});

// Mock payroll data for the current employee
const mockPayroll = {
  basicSalary: 50000,
  allowances: 15000,
  deductions: 8000,
  netSalary: 57000,
  lastPaidMonth: "July 2025",
};

export default function EmployeePage() {
  const { addLeave } = useLeaveRequests();
  const [toast, setToast] = useState("");

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", background: "#fff", padding: 20, borderRadius: 8, boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
      <h2 style={{ marginBottom: 16, textAlign: "center" }}>Leave Application</h2>
      <Formik
        initialValues={{ name: "", leaveType: "", fromDate: "", toDate: "", reason: "" }}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          addLeave(values);
          setToast("Leave request submitted!");
          resetForm();
        }}
      >
        <Form style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <Field name="name" placeholder="Your Name" style={inputStyle} />
            <ErrorMessage name="name" component="div" style={errorStyle} />
          </div>
          <div>
            <Field as="select" name="leaveType" style={inputStyle}>
              {leaveTypes.map(opt => <option value={opt.value} key={opt.value}>{opt.label}</option>)}
            </Field>
            <ErrorMessage name="leaveType" component="div" style={errorStyle} />
          </div>
          <div>
            <Field type="date" name="fromDate" style={inputStyle} />
            <ErrorMessage name="fromDate" component="div" style={errorStyle} />
          </div>
          <div>
            <Field type="date" name="toDate" style={inputStyle} />
            <ErrorMessage name="toDate" component="div" style={errorStyle} />
          </div>
          <div>
            <Field name="reason" placeholder="Reason (if applicable)" style={inputStyle} />
            <ErrorMessage name="reason" component="div" style={errorStyle} />
          </div>
          <button type="submit" style={buttonStyle}>Submit</button>
        </Form>
      </Formik>
      {toast && (
        <div style={toastStyle} onClick={() => setToast("")}>
          {toast} (click to dismiss)
        </div>
      )}

      {/* Payroll Overview Section */}
      <section style={{ marginTop: 40 }}>
        <h3 style={{ borderBottom: "1px solid #ddd", paddingBottom: 6, marginBottom: 12 }}>Payroll Overview</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={tdLabel}>Basic Salary</td>
              <td style={tdValue}>₹{mockPayroll.basicSalary.toLocaleString()}</td>
            </tr>
            <tr>
              <td style={tdLabel}>Allowances</td>
              <td style={tdValue}>₹{mockPayroll.allowances.toLocaleString()}</td>
            </tr>
            <tr>
              <td style={tdLabel}>Deductions</td>
              <td style={tdValue}>₹{mockPayroll.deductions.toLocaleString()}</td>
            </tr>
            <tr>
              <td style={tdLabel}><strong>Net Salary</strong></td>
              <td style={tdValue}><strong>₹{mockPayroll.netSalary.toLocaleString()}</strong></td>
            </tr>
            <tr>
              <td style={tdLabel}>Last Paid Month</td>
              <td style={tdValue}>{mockPayroll.lastPaidMonth}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

const inputStyle = { width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 4 };
const errorStyle = { color: "red", fontSize: 12, marginTop: 4 };
const buttonStyle = { padding: "10px", background: "#1976d2", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" };
const toastStyle = { marginTop: 12, background: "#4caf50", color: "#fff", padding: "8px", borderRadius: 4, cursor: "pointer", textAlign: "center" };
const tdLabel = { padding: "6px 8px", fontWeight: "600", color: "#444", width: "50%" };
const tdValue = { padding: "6px 8px", color: "#222", width: "50%" };
