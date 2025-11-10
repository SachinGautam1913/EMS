import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Clock,
  DollarSign,
  TrendingUp,
  Calendar,
  MessageSquare,
  FileText,
  Settings,
  Shield,
  User,
  FileText as PayslipIcon,
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

/**
 * Sidebar Navigation Component
 * Dynamically displays menu items based on user role
 */
const Sidebar = () => {
  const location = useLocation();
  const { currentUser } = useAppContext();

  // Define all possible menu items with role-based access
  const allMenuItems = [
    // Dashboard - All roles
    { path: '/', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'hr', 'employee'] },
    
    // Employee Management - Admin & HR
    { path: '/employees', label: 'Manage Employees', icon: Users, roles: ['admin', 'hr'] },
    
    // Attendance - Different labels for different roles
    { path: '/attendance', label: 'Manage Attendance', icon: Clock, roles: ['admin', 'hr'] },
    { path: '/attendance', label: 'Mark Attendance', icon: Clock, roles: ['employee'] },
    
    // Leaves - HR/Admin manage, Employees apply
    { path: '/leaves', label: 'Manage Leaves', icon: Clock, roles: ['admin', 'hr'] },
    
    // Payroll - Admin full access, HR view only
    { path: '/payroll', label: 'Payroll', icon: DollarSign, roles: ['admin'] },
    { path: '/payroll', label: 'View Payroll', icon: DollarSign, roles: ['hr'] },
    
    // Performance - Admin manages, Employees view own
    { path: '/performance', label: 'Performance', icon: TrendingUp, roles: ['admin'] },
    
    // Shifts - Admin only
    { path: '/shifts', label: 'Shifts & Schedule', icon: Calendar, roles: ['admin'] },
    
    // Communication - Admin only
    { path: '/communication', label: 'Communication', icon: MessageSquare, roles: ['admin'] },
    
    // Reports - Admin full, HR view
    { path: '/reports', label: 'Reports & Analytics', icon: FileText, roles: ['admin'] },
    { path: '/reports', label: 'View Reports', icon: FileText, roles: ['hr'] },
    
    // Roles & Settings - Admin only
    { path: '/roles', label: 'Roles & Access Control', icon: Shield, roles: ['admin'] },
    { path: '/settings', label: 'System Settings', icon: Settings, roles: ['admin'] },
    
    // Employee Self-Service
    { path: '/my-profile', label: 'View Own Profile', icon: User, roles: ['employee'] },
    { path: '/my-payslip', label: 'View Own Payslip', icon: PayslipIcon, roles: ['employee'] },
    { path: '/my-performance', label: 'View Own Performance', icon: TrendingUp, roles: ['employee'] },
  ];

  // Filter menu items based on user role
  const getMenuItemsForRole = (role) => {
    if (!role) return [];
    
    return allMenuItems.filter((item) => {
      // For employee role, show specific employee menu items
      if (role === 'employee') {
        return item.roles.includes('employee');
      }
      // For admin and hr, show their respective menu items
      return item.roles.includes(role);
    });
  };

  // Get menu items for current user
  const menuItems = currentUser ? getMenuItemsForRole(currentUser.role) : [];

  // Remove duplicates and prioritize more specific labels
  // For same path, keep the one with more specific label (longer label)
  const uniqueMenuItems = menuItems.reduce((acc, item) => {
    const existing = acc.find((i) => i.path === item.path);
    if (!existing) {
      acc.push(item);
    } else {
      // If path exists, keep the more specific label (longer or employee-specific)
      const isEmployeeSpecific = item.label.toLowerCase().includes('own') || 
                                  item.label.toLowerCase().includes('my');
      const existingIsEmployeeSpecific = existing.label.toLowerCase().includes('own') || 
                                         existing.label.toLowerCase().includes('my');
      
      if (isEmployeeSpecific && !existingIsEmployeeSpecific) {
        const index = acc.indexOf(existing);
        acc[index] = item;
      } else if (item.label.length > existing.label.length && !existingIsEmployeeSpecific) {
        const index = acc.indexOf(existing);
        acc[index] = item;
      }
    }
    return acc;
  }, []);

  // Sort menu items: Dashboard first, then alphabetically
  uniqueMenuItems.sort((a, b) => {
    if (a.path === '/') return -1;
    if (b.path === '/') return 1;
    return a.label.localeCompare(b.label);
  });

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary-600">EMS</h1>
        <p className="text-sm text-gray-500 mt-1">Employee Management</p>
        {currentUser && (
          <p className="text-xs text-gray-400 mt-2 capitalize">
            {currentUser.role === 'hr' ? 'HR Manager' : currentUser.role === 'admin' ? 'Administrator' : 'Employee'}
          </p>
        )}
      </div>
      
      <nav className="px-4 pb-4">
        {uniqueMenuItems.length > 0 ? (
          <ul className="space-y-1">
            {uniqueMenuItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <li key={`${item.path}-${index}`}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      active
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="px-4 py-8 text-center text-gray-500 text-sm">
            No menu items available
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;

