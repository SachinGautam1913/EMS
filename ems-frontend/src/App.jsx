import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import EmployeeProfile from './pages/EmployeeProfile';
import Attendance from './pages/Attendance';
import Leaves from './pages/Leaves';
import Payroll from './pages/Payroll';
import Performance from './pages/Performance';
import Shifts from './pages/Shifts';
import Communication from './pages/Communication';
import Reports from './pages/Reports';
import Roles from './pages/Roles';
import Settings from './pages/Settings';
import MyProfile from './pages/MyProfile';
import MyPayslip from './pages/MyPayslip';
import MyPerformance from './pages/MyPerformance';

// Component to handle authenticated routes
const AuthenticatedRoutes = () => {
  const { isAuthenticated } = useAppContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={<Dashboard />} />
            
            {/* Employee Routes */}
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/:id" element={<EmployeeProfile />} />
            
            {/* Attendance & Leave */}
            <Route path="/attendance" element={<Attendance />} />
            <Route
              path="/leaves"
              element={
                <ProtectedRoute allowedRoles={['admin', 'hr']}>
                  <Leaves />
                </ProtectedRoute>
              }
            />
            
            {/* Employee Self-Service Routes */}
            <Route
              path="/my-profile"
              element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <MyProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-payslip"
              element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <MyPayslip />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-performance"
              element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <MyPerformance />
                </ProtectedRoute>
              }
            />
            
            {/* Payroll */}
            <Route
              path="/payroll"
              element={
                <ProtectedRoute allowedRoles={['admin', 'hr']}>
                  <Payroll />
                </ProtectedRoute>
              }
            />
            
            {/* Performance */}
            <Route path="/performance" element={<Performance />} />
            
            {/* Shifts */}
            <Route
              path="/shifts"
              element={
                <ProtectedRoute allowedRoles={['admin', 'hr']}>
                  <Shifts />
                </ProtectedRoute>
              }
            />
            
            {/* Communication */}
            <Route path="/communication" element={<Communication />} />
            
            {/* Reports */}
            <Route
              path="/reports"
              element={
                <ProtectedRoute allowedRoles={['admin', 'hr']}>
                  <Reports />
                </ProtectedRoute>
              }
            />
            
            {/* Roles & Access */}
            <Route
              path="/roles"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Roles />
                </ProtectedRoute>
              }
            />
            
            {/* Settings */}
            <Route
              path="/settings"
              element={
                <ProtectedRoute allowedRoles={['admin', 'hr']}>
                  <Settings />
                </ProtectedRoute>
              }
            />
            
        {/* Catch all - redirect to dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route path="/*" element={<AuthenticatedRoutes />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
