import React, { createContext, useContext, useReducer, useEffect } from 'react';
import {
  mockEmployees,
  mockAttendance,
  mockLeaveRequests,
  mockLeaveTypes,
  mockPayroll,
  mockPerformanceReviews,
  mockShifts,
  mockDepartments,
  mockDesignations,
  mockHolidays,
  mockNotifications,
  mockAnnouncements,
  mockMessages,
} from '../data/mockData';

const AppContext = createContext();

// Load initial state from localStorage
const getInitialState = () => {
  const storedAuth = localStorage.getItem('ems_auth');
  const storedUser = localStorage.getItem('ems_user');
  
  if (storedAuth && storedUser) {
    try {
      return {
        isAuthenticated: true,
        token: JSON.parse(storedAuth),
        currentUser: JSON.parse(storedUser),
      };
    } catch (error) {
      console.error('Error loading auth state:', error);
    }
  }
  
  return {
    isAuthenticated: false,
    token: null,
    currentUser: null,
  };
};

// Initial State
const initialState = {
  // Authentication
  ...getInitialState(),
  
  // Data
  employees: mockEmployees,
  attendance: mockAttendance,
  leaveRequests: mockLeaveRequests,
  leaveTypes: mockLeaveTypes,
  payroll: mockPayroll,
  performanceReviews: mockPerformanceReviews,
  shifts: mockShifts,
  departments: mockDepartments,
  designations: mockDesignations,
  holidays: mockHolidays,
  notifications: mockNotifications,
  announcements: mockAnnouncements,
  messages: mockMessages,
  
  // UI State
  toast: {
    isVisible: false,
    message: '',
    type: 'info',
  },
};

// Action Types
const ActionTypes = {
  // Employees
  ADD_EMPLOYEE: 'ADD_EMPLOYEE',
  UPDATE_EMPLOYEE: 'UPDATE_EMPLOYEE',
  DELETE_EMPLOYEE: 'DELETE_EMPLOYEE',
  
  // Attendance
  MARK_ATTENDANCE: 'MARK_ATTENDANCE',
  
  // Leave
  APPLY_LEAVE: 'APPLY_LEAVE',
  UPDATE_LEAVE_STATUS: 'UPDATE_LEAVE_STATUS',
  ADD_LEAVE_TYPE: 'ADD_LEAVE_TYPE',
  UPDATE_LEAVE_TYPE: 'UPDATE_LEAVE_TYPE',
  DELETE_LEAVE_TYPE: 'DELETE_LEAVE_TYPE',
  
  // Payroll
  CALCULATE_SALARY: 'CALCULATE_SALARY',
  ADD_PAYROLL: 'ADD_PAYROLL',
  
  // Performance
  ADD_PERFORMANCE_REVIEW: 'ADD_PERFORMANCE_REVIEW',
  
  // Shifts
  ADD_SHIFT: 'ADD_SHIFT',
  UPDATE_SHIFT: 'UPDATE_SHIFT',
  DELETE_SHIFT: 'DELETE_SHIFT',
  
  // Departments & Designations
  ADD_DEPARTMENT: 'ADD_DEPARTMENT',
  UPDATE_DEPARTMENT: 'UPDATE_DEPARTMENT',
  DELETE_DEPARTMENT: 'DELETE_DEPARTMENT',
  ADD_DESIGNATION: 'ADD_DESIGNATION',
  DELETE_DESIGNATION: 'DELETE_DESIGNATION',
  
  // Holidays
  ADD_HOLIDAY: 'ADD_HOLIDAY',
  DELETE_HOLIDAY: 'DELETE_HOLIDAY',
  
  // Notifications
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  MARK_NOTIFICATION_READ: 'MARK_NOTIFICATION_READ',
  
  // Announcements
  ADD_ANNOUNCEMENT: 'ADD_ANNOUNCEMENT',
  
  // Messages
  SEND_MESSAGE: 'SEND_MESSAGE',
  MARK_MESSAGE_READ: 'MARK_MESSAGE_READ',
  
  // Toast
  SHOW_TOAST: 'SHOW_TOAST',
  HIDE_TOAST: 'HIDE_TOAST',
  
  // Authentication
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  LOGOUT: 'LOGOUT',
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };
    
    case ActionTypes.UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((emp) =>
          emp.id === action.payload.id ? { ...emp, ...action.payload } : emp
        ),
      };
    
    case ActionTypes.DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter((emp) => emp.id !== action.payload),
      };
    
    case ActionTypes.MARK_ATTENDANCE:
      return {
        ...state,
        attendance: [...state.attendance, action.payload],
      };
    
    case ActionTypes.APPLY_LEAVE:
      return {
        ...state,
        leaveRequests: [...state.leaveRequests, action.payload],
      };
    
    case ActionTypes.UPDATE_LEAVE_STATUS:
      return {
        ...state,
        leaveRequests: state.leaveRequests.map((leave) =>
          leave.id === action.payload.id
            ? { ...leave, status: action.payload.status }
            : leave
        ),
      };
    
    case ActionTypes.ADD_LEAVE_TYPE:
      return {
        ...state,
        leaveTypes: [...state.leaveTypes, action.payload],
      };
    
    case ActionTypes.UPDATE_LEAVE_TYPE:
      return {
        ...state,
        leaveTypes: state.leaveTypes.map((lt) =>
          lt.id === action.payload.id ? { ...lt, ...action.payload } : lt
        ),
      };
    
    case ActionTypes.DELETE_LEAVE_TYPE:
      return {
        ...state,
        leaveTypes: state.leaveTypes.filter((lt) => lt.id !== action.payload),
      };
    
    case ActionTypes.ADD_PAYROLL:
      return {
        ...state,
        payroll: [...state.payroll, action.payload],
      };
    
    case ActionTypes.ADD_PERFORMANCE_REVIEW:
      return {
        ...state,
        performanceReviews: [...state.performanceReviews, action.payload],
      };
    
    case ActionTypes.ADD_SHIFT:
      return {
        ...state,
        shifts: [...state.shifts, action.payload],
      };
    
    case ActionTypes.UPDATE_SHIFT:
      return {
        ...state,
        shifts: state.shifts.map((shift) =>
          shift.id === action.payload.id ? { ...shift, ...action.payload } : shift
        ),
      };
    
    case ActionTypes.DELETE_SHIFT:
      return {
        ...state,
        shifts: state.shifts.filter((shift) => shift.id !== action.payload),
      };
    
    case ActionTypes.ADD_DEPARTMENT:
      return {
        ...state,
        departments: [...state.departments, action.payload],
      };
    
    case ActionTypes.UPDATE_DEPARTMENT:
      return {
        ...state,
        departments: state.departments.map((dept) =>
          dept.id === action.payload.id ? { ...dept, ...action.payload } : dept
        ),
      };
    
    case ActionTypes.DELETE_DEPARTMENT:
      return {
        ...state,
        departments: state.departments.filter((dept) => dept.id !== action.payload),
      };
    
    case ActionTypes.ADD_DESIGNATION:
      return {
        ...state,
        designations: [...state.designations, action.payload],
      };
    
    case ActionTypes.DELETE_DESIGNATION:
      return {
        ...state,
        designations: state.designations.filter((d) => d !== action.payload),
      };
    
    case ActionTypes.ADD_HOLIDAY:
      return {
        ...state,
        holidays: [...state.holidays, action.payload],
      };
    
    case ActionTypes.DELETE_HOLIDAY:
      return {
        ...state,
        holidays: state.holidays.filter((h) => h.id !== action.payload),
      };
    
    case ActionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
    
    case ActionTypes.MARK_NOTIFICATION_READ:
      return {
        ...state,
        notifications: state.notifications.map((notif) =>
          notif.id === action.payload ? { ...notif, read: true } : notif
        ),
      };
    
    case ActionTypes.ADD_ANNOUNCEMENT:
      return {
        ...state,
        announcements: [action.payload, ...state.announcements],
      };
    
    case ActionTypes.SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    
    case ActionTypes.MARK_MESSAGE_READ:
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg.id === action.payload ? { ...msg, read: true } : msg
        ),
      };
    
    case ActionTypes.SHOW_TOAST:
      return {
        ...state,
        toast: {
          isVisible: true,
          message: action.payload.message,
          type: action.payload.type || 'info',
        },
      };
    
    case ActionTypes.HIDE_TOAST:
      return {
        ...state,
        toast: {
          ...state.toast,
          isVisible: false,
        },
      };
    
    case ActionTypes.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        currentUser: action.payload.user,
      };
    
    case ActionTypes.REGISTER:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        currentUser: action.payload.user,
      };
    
    case ActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        currentUser: null,
      };
    
    default:
      return state;
  }
};

// Provider Component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('ems_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Merge with initial state
        Object.keys(parsed).forEach((key) => {
          if (state[key] !== undefined) {
            dispatch({ type: `LOAD_${key.toUpperCase()}`, payload: parsed[key] });
          }
        });
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save authentication to localStorage on changes
  useEffect(() => {
    if (state.isAuthenticated && state.token && state.currentUser) {
      localStorage.setItem('ems_auth', JSON.stringify(state.token));
      localStorage.setItem('ems_user', JSON.stringify(state.currentUser));
    }
  }, [state.isAuthenticated, state.token, state.currentUser]);

  // Save data to localStorage on changes
  useEffect(() => {
    const dataToSave = {
      employees: state.employees,
      attendance: state.attendance,
      leaveRequests: state.leaveRequests,
      payroll: state.payroll,
    };
    localStorage.setItem('ems_data', JSON.stringify(dataToSave));
  }, [state.employees, state.attendance, state.leaveRequests, state.payroll]);

  // Action Creators
  const actions = {
    // Employee Actions
    addEmployee: (employee) => {
      // TODO: Replace with API call
      // await employeeService.create(employee);
      dispatch({ type: ActionTypes.ADD_EMPLOYEE, payload: employee });
      actions.showToast('Employee added successfully', 'success');
    },
    
    updateEmployee: (id, updates) => {
      // TODO: Replace with API call
      // await employeeService.update(id, updates);
      dispatch({ type: ActionTypes.UPDATE_EMPLOYEE, payload: { id, ...updates } });
      actions.showToast('Employee updated successfully', 'success');
    },
    
    deleteEmployee: (id) => {
      // TODO: Replace with API call
      // await employeeService.delete(id);
      dispatch({ type: ActionTypes.DELETE_EMPLOYEE, payload: id });
      actions.showToast('Employee deleted successfully', 'success');
    },
    
    // Attendance Actions
    markAttendance: (attendance) => {
      // TODO: Replace with API call
      // await attendanceService.mark(attendance);
      dispatch({ type: ActionTypes.MARK_ATTENDANCE, payload: attendance });
      actions.showToast('Attendance marked successfully', 'success');
    },
    
    // Leave Actions
    applyLeave: (leave) => {
      // TODO: Replace with API call
      // await leaveService.apply(leave);
      dispatch({ type: ActionTypes.APPLY_LEAVE, payload: leave });
      actions.showToast('Leave application submitted', 'success');
    },
    
    updateLeaveStatus: (id, status) => {
      // TODO: Replace with API call
      // await leaveService.updateStatus(id, status);
      dispatch({ type: ActionTypes.UPDATE_LEAVE_STATUS, payload: { id, status } });
      actions.showToast(`Leave ${status}`, 'success');
    },
    
    addLeaveType: (leaveType) => {
      dispatch({ type: ActionTypes.ADD_LEAVE_TYPE, payload: leaveType });
      actions.showToast('Leave type added', 'success');
    },
    
    updateLeaveType: (id, updates) => {
      dispatch({ type: ActionTypes.UPDATE_LEAVE_TYPE, payload: { id, ...updates } });
      actions.showToast('Leave type updated', 'success');
    },
    
    deleteLeaveType: (id) => {
      dispatch({ type: ActionTypes.DELETE_LEAVE_TYPE, payload: id });
      actions.showToast('Leave type deleted', 'success');
    },
    
    // Payroll Actions
    calculateSalary: (employeeId, month, data) => {
      // TODO: Implement salary calculation logic
      const calculated = {
        id: `PAY${Date.now()}`,
        employeeId,
        month,
        ...data,
      };
      dispatch({ type: ActionTypes.ADD_PAYROLL, payload: calculated });
      return calculated;
    },
    
    addPayroll: (payroll) => {
      dispatch({ type: ActionTypes.ADD_PAYROLL, payload: payroll });
      actions.showToast('Payroll added successfully', 'success');
    },
    
    // Performance Actions
    addPerformanceReview: (review) => {
      dispatch({ type: ActionTypes.ADD_PERFORMANCE_REVIEW, payload: review });
      actions.showToast('Performance review added', 'success');
    },
    
    // Shift Actions
    addShift: (shift) => {
      dispatch({ type: ActionTypes.ADD_SHIFT, payload: shift });
      actions.showToast('Shift added', 'success');
    },
    
    updateShift: (id, updates) => {
      dispatch({ type: ActionTypes.UPDATE_SHIFT, payload: { id, ...updates } });
      actions.showToast('Shift updated', 'success');
    },
    
    deleteShift: (id) => {
      dispatch({ type: ActionTypes.DELETE_SHIFT, payload: id });
      actions.showToast('Shift deleted', 'success');
    },
    
    // Department Actions
    addDepartment: (department) => {
      dispatch({ type: ActionTypes.ADD_DEPARTMENT, payload: department });
      actions.showToast('Department added', 'success');
    },
    
    updateDepartment: (id, updates) => {
      dispatch({ type: ActionTypes.UPDATE_DEPARTMENT, payload: { id, ...updates } });
      actions.showToast('Department updated', 'success');
    },
    
    deleteDepartment: (id) => {
      dispatch({ type: ActionTypes.DELETE_DEPARTMENT, payload: id });
      actions.showToast('Department deleted', 'success');
    },
    
    addDesignation: (designation) => {
      dispatch({ type: ActionTypes.ADD_DESIGNATION, payload: designation });
      actions.showToast('Designation added', 'success');
    },
    
    deleteDesignation: (designation) => {
      dispatch({ type: ActionTypes.DELETE_DESIGNATION, payload: designation });
      actions.showToast('Designation deleted', 'success');
    },
    
    // Holiday Actions
    addHoliday: (holiday) => {
      dispatch({ type: ActionTypes.ADD_HOLIDAY, payload: holiday });
      actions.showToast('Holiday added', 'success');
    },
    
    deleteHoliday: (id) => {
      dispatch({ type: ActionTypes.DELETE_HOLIDAY, payload: id });
      actions.showToast('Holiday deleted', 'success');
    },
    
    // Notification Actions
    addNotification: (notification) => {
      dispatch({ type: ActionTypes.ADD_NOTIFICATION, payload: notification });
    },
    
    markNotificationAsRead: (id) => {
      dispatch({ type: ActionTypes.MARK_NOTIFICATION_READ, payload: id });
    },
    
    // Announcement Actions
    addAnnouncement: (announcement) => {
      dispatch({ type: ActionTypes.ADD_ANNOUNCEMENT, payload: announcement });
      actions.showToast('Announcement published', 'success');
    },
    
    // Message Actions
    sendMessage: (message) => {
      dispatch({ type: ActionTypes.SEND_MESSAGE, payload: message });
      actions.showToast('Message sent', 'success');
    },
    
    markMessageAsRead: (id) => {
      dispatch({ type: ActionTypes.MARK_MESSAGE_READ, payload: id });
    },
    
    // Toast Actions
    showToast: (message, type = 'info') => {
      dispatch({ type: ActionTypes.SHOW_TOAST, payload: { message, type } });
      setTimeout(() => {
        dispatch({ type: ActionTypes.HIDE_TOAST });
      }, 3000);
    },
    
    hideToast: () => {
      dispatch({ type: ActionTypes.HIDE_TOAST });
    },
    
    // Authentication Actions
    login: (user, token) => {
      // Save to localStorage
      localStorage.setItem('ems_auth', JSON.stringify(token));
      localStorage.setItem('ems_user', JSON.stringify(user));
      
      dispatch({
        type: ActionTypes.LOGIN,
        payload: { user, token },
      });
    },
    
    register: (user, token) => {
      // Save to localStorage
      localStorage.setItem('ems_auth', JSON.stringify(token));
      localStorage.setItem('ems_user', JSON.stringify(user));
      
      // Add new user to employees list if they're an employee
      if (user.role === 'employee') {
        dispatch({
          type: ActionTypes.ADD_EMPLOYEE,
          payload: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            department: user.department,
            designation: user.designation,
            joiningDate: user.joiningDate,
            salary: 0, // Default salary
            avatar: null,
            status: 'active',
            documents: [],
          },
        });
      }
      
      dispatch({
        type: ActionTypes.REGISTER,
        payload: { user, token },
      });
    },
    
    logout: () => {
      // Clear localStorage
      localStorage.removeItem('ems_auth');
      localStorage.removeItem('ems_user');
      
      dispatch({ type: ActionTypes.LOGOUT });
    },
  };

  return (
    <AppContext.Provider value={{ ...state, ...actions }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

