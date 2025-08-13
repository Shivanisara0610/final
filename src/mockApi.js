// mockApi.js
// Mock data and API functions simulating backend endpoints with async delays

// Mock Users for authentication
const mockUsers = {
  admin: { password: 'admin123', role: 'admin' },
  hr: { password: 'hr12345', role: 'hr' },
  employee: { password: 'emp12345', role: 'employee' },
};

// Mock subscription data (AdminPage)
let subscriptions = [
  { id: 1, name: 'Basic Plan', price: 9.99 },
  { id: 2, name: 'Pro Plan', price: 29.99 },
];

// Mock leave requests data (HRPage)
let leaveRequests = [
  { id: 1, employee: 'Alice Johnson', dates: '2025-08-01 to 2025-08-04', fallback: '' },
  { id: 2, employee: 'Bob Smith', dates: '2025-08-10 to 2025-08-12', fallback: 'Carol' },
];

// Mock leaves data (EmployeePage)
let leaves = []; // For storing employee leave applications

// Helper delay (simulate network latency)
const delay = (ms) => new Promise(res => setTimeout(res, ms));

// Auth API: login
export async function loginApi({ username, password }) {
  await delay(1000); // simulate network latency
  const user = mockUsers[username];
  if (user && user.password === password) {
    return { role: user.role, username }; 
  }
  throw new Error('Invalid username or password');
}

// Admin API: subscriptions CRUD
export async function getSubscriptions() {
  await delay(400);
  return [...subscriptions];
}

export async function addSubscription(sub) {
  await delay(400);
  const newSub = { id: Date.now(), ...sub };
  subscriptions.push(newSub);
  return newSub;
}

export async function updateSubscription(id, updatedData) {
  await delay(400);
  subscriptions = subscriptions.map(sub => (sub.id === id ? { id, ...updatedData } : sub));
  return subscriptions.find(sub => sub.id === id);
}

export async function deleteSubscription(id) {
  await delay(400);
  subscriptions = subscriptions.filter(sub => sub.id !== id);
  return true;
}

// HR API: leave requests 
export async function getLeaveRequests() {
  await delay(400);
  return [...leaveRequests];
}

export async function assignFallbackLeave(id, fallback) {
  await delay(400);
  leaveRequests = leaveRequests.map(lr => (lr.id === id ? { ...lr, fallback } : lr));
  return leaveRequests.find(lr => lr.id === id);
}

// Employee API: apply leave
export async function submitLeaveApplication(leave) {
  await delay(400);
  const newLeave = { id: Date.now(), ...leave };
  leaves.push(newLeave);
  return newLeave;
}

// Export others as needed
