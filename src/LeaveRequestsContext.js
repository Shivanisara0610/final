// src/LeaveRequestsContext.js
import React, { createContext, useContext, useState } from "react";

const LeaveRequestsContext = createContext();

export function LeaveRequestsProvider({ children }) {
  const [leaveRequests, setLeaveRequests] = useState([]);

  function addLeave(leave) {
    setLeaveRequests(prev => [
      ...prev,
      { id: Date.now(), status: "Pending", fallback: "", ...leave }
    ]);
  }

  function updateLeave(id, updates) {
    setLeaveRequests(prev =>
      prev.map(lr => (lr.id === id ? { ...lr, ...updates } : lr))
    );
  }

  return (
    <LeaveRequestsContext.Provider value={{ leaveRequests, addLeave, updateLeave }}>
      {children}
    </LeaveRequestsContext.Provider>
  );
}

export function useLeaveRequests() {
  return useContext(LeaveRequestsContext);
}
