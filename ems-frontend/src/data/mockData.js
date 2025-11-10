/**
 * Mock Data for Employee Management System
 * TODO: Replace with actual API calls
 */

// Sample Employees
export const mockEmployees = [
  {
    id: 'EMP001',
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+1 234-567-8900',
    department: 'Engineering',
    designation: 'Senior Developer',
    joiningDate: '2022-01-15',
    salary: 75000,
    avatar: null,
    status: 'active',
    documents: [],
  },
  {
    id: 'EMP002',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    phone: '+1 234-567-8901',
    department: 'HR',
    designation: 'HR Manager',
    joiningDate: '2021-06-20',
    salary: 85000,
    avatar: null,
    status: 'active',
    documents: [],
  },
  {
    id: 'EMP003',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    phone: '+1 234-567-8902',
    department: 'Sales',
    designation: 'Sales Executive',
    joiningDate: '2023-03-10',
    salary: 60000,
    avatar: null,
    status: 'active',
    documents: [],
  },
  {
    id: 'EMP004',
    name: 'Sarah Williams',
    email: 'sarah.williams@company.com',
    phone: '+1 234-567-8903',
    department: 'Marketing',
    designation: 'Marketing Manager',
    joiningDate: '2022-08-05',
    salary: 70000,
    avatar: null,
    status: 'active',
    documents: [],
  },
  {
    id: 'EMP005',
    name: 'David Brown',
    email: 'david.brown@company.com',
    phone: '+1 234-567-8904',
    department: 'Engineering',
    designation: 'Junior Developer',
    joiningDate: '2024-01-10',
    salary: 55000,
    avatar: null,
    status: 'active',
    documents: [],
  },
];

// Sample Attendance Records
export const mockAttendance = [
  {
    id: 'ATT001',
    employeeId: 'EMP001',
    date: '2024-01-15',
    clockIn: '09:00:00',
    clockOut: '18:00:00',
    status: 'present',
    hoursWorked: 9,
  },
  {
    id: 'ATT002',
    employeeId: 'EMP001',
    date: '2024-01-16',
    clockIn: '09:15:00',
    clockOut: '18:30:00',
    status: 'present',
    hoursWorked: 9.25,
  },
  {
    id: 'ATT003',
    employeeId: 'EMP002',
    date: '2024-01-15',
    clockIn: '08:45:00',
    clockOut: '17:45:00',
    status: 'present',
    hoursWorked: 9,
  },
];

// Sample Leave Requests
export const mockLeaveRequests = [
  {
    id: 'LEAVE001',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    leaveType: 'Sick Leave',
    startDate: '2024-02-01',
    endDate: '2024-02-03',
    reason: 'Fever and cold',
    status: 'pending',
    appliedDate: '2024-01-25',
  },
  {
    id: 'LEAVE002',
    employeeId: 'EMP003',
    employeeName: 'Mike Johnson',
    leaveType: 'Vacation',
    startDate: '2024-02-10',
    endDate: '2024-02-15',
    reason: 'Family vacation',
    status: 'approved',
    appliedDate: '2024-01-20',
  },
];

// Sample Leave Types
export const mockLeaveTypes = [
  { id: 'LT001', name: 'Sick Leave', days: 10, carryForward: true },
  { id: 'LT002', name: 'Vacation', days: 15, carryForward: false },
  { id: 'LT003', name: 'Personal Leave', days: 5, carryForward: false },
  { id: 'LT004', name: 'Maternity Leave', days: 90, carryForward: false },
  { id: 'LT005', name: 'Paternity Leave', days: 7, carryForward: false },
];

// Sample Payroll Records
export const mockPayroll = [
  {
    id: 'PAY001',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    month: '2024-01',
    basicSalary: 60000,
    allowances: 10000,
    deductions: 5000,
    bonus: 5000,
    overtime: 2000,
    grossSalary: 80000,
    netSalary: 75000,
    status: 'paid',
    paidDate: '2024-02-01',
  },
  {
    id: 'PAY002',
    employeeId: 'EMP002',
    employeeName: 'Jane Smith',
    month: '2024-01',
    basicSalary: 68000,
    allowances: 12000,
    deductions: 6000,
    bonus: 5000,
    overtime: 0,
    grossSalary: 85000,
    netSalary: 79000,
    status: 'paid',
    paidDate: '2024-02-01',
  },
];

// Sample Performance Reviews
export const mockPerformanceReviews = [
  {
    id: 'PERF001',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    reviewPeriod: 'Q4 2023',
    rating: 4.5,
    goals: ['Complete project X', 'Improve code quality'],
    feedback: 'Excellent performance this quarter',
    reviewedBy: 'Manager',
    reviewDate: '2024-01-15',
  },
];

// Sample Shifts
export const mockShifts = [
  {
    id: 'SHIFT001',
    name: 'Morning Shift',
    startTime: '09:00',
    endTime: '18:00',
    breakDuration: 60,
  },
  {
    id: 'SHIFT002',
    name: 'Evening Shift',
    startTime: '14:00',
    endTime: '23:00',
    breakDuration: 60,
  },
  {
    id: 'SHIFT003',
    name: 'Night Shift',
    startTime: '22:00',
    endTime: '06:00',
    breakDuration: 60,
  },
];

// Sample Departments
export const mockDepartments = [
  { id: 'DEPT001', name: 'Engineering', head: 'EMP001' },
  { id: 'DEPT002', name: 'HR', head: 'EMP002' },
  { id: 'DEPT003', name: 'Sales', head: null },
  { id: 'DEPT004', name: 'Marketing', head: 'EMP004' },
];

// Sample Designations
export const mockDesignations = [
  'Junior Developer',
  'Senior Developer',
  'Team Lead',
  'HR Manager',
  'HR Executive',
  'Sales Executive',
  'Sales Manager',
  'Marketing Manager',
  'Marketing Executive',
];

// Sample Holidays
export const mockHolidays = [
  { id: 'HOL001', name: 'New Year', date: '2024-01-01', type: 'National' },
  { id: 'HOL002', name: 'Independence Day', date: '2024-07-04', type: 'National' },
  { id: 'HOL003', name: 'Christmas', date: '2024-12-25', type: 'National' },
];

// Sample Notifications
export const mockNotifications = [
  {
    id: 'NOTIF001',
    title: 'New Leave Request',
    message: 'John Doe has applied for leave',
    type: 'info',
    timestamp: new Date().toISOString(),
    read: false,
  },
  {
    id: 'NOTIF002',
    title: 'Payroll Processed',
    message: 'January payroll has been processed',
    type: 'success',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    read: false,
  },
];

// Sample Announcements
export const mockAnnouncements = [
  {
    id: 'ANN001',
    title: 'Company Meeting',
    message: 'All-hands meeting scheduled for next Friday',
    author: 'Admin',
    createdAt: new Date().toISOString(),
  },
];

// Sample Messages
export const mockMessages = [
  {
    id: 'MSG001',
    from: 'EMP002',
    fromName: 'Jane Smith',
    to: 'EMP001',
    toName: 'John Doe',
    subject: 'Meeting Reminder',
    message: 'Don\'t forget about the team meeting tomorrow',
    timestamp: new Date().toISOString(),
    read: false,
  },
];

