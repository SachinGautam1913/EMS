import React from 'react';
import { Shield, Users, UserCheck, UserX } from 'lucide-react';
import Card from '../components/Card';
import { useAppContext } from '../context/AppContext';

/**
 * Roles & Access Control Page
 * Stubbed for role-based access control implementation
 */
const Roles = () => {
  const { currentUser } = useAppContext();

  const roles = [
    {
      id: 'admin',
      name: 'Administrator',
      description: 'Full system access with all permissions',
      permissions: [
        'Manage Employees',
        'Manage Payroll',
        'Manage Attendance',
        'Manage Leaves',
        'Manage Settings',
        'View Reports',
        'Manage Roles',
      ],
      icon: Shield,
      color: 'bg-red-500',
    },
    {
      id: 'hr',
      name: 'HR Manager',
      description: 'Human resources management access',
      permissions: [
        'Manage Employees',
        'Manage Attendance',
        'Manage Leaves',
        'View Payroll',
        'View Reports',
      ],
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      id: 'employee',
      name: 'Employee',
      description: 'Basic employee access',
      permissions: [
        'View Own Profile',
        'Mark Attendance',
        'Apply for Leave',
        'View Own Payslip',
        'View Own Performance',
      ],
      icon: UserCheck,
      color: 'bg-green-500',
    },
  ];

  const ProtectedRouteExample = () => {
    return (
      <Card title="Protected Route Example" className="p-6">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            This is a stubbed implementation. In a real application, you would:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
            <li>Create a ProtectedRoute component that checks user roles</li>
            <li>Wrap routes with role-based access control</li>
            <li>Implement permission checks in components</li>
            <li>Redirect unauthorized users to appropriate pages</li>
          </ul>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-blue-900 mb-2">Example Implementation:</p>
            <pre className="text-xs bg-white p-3 rounded overflow-x-auto">
              {`<Route
  path="/admin"
  element={
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminPage />
    </ProtectedRoute>
  }
/>`}
            </pre>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Roles & Access Control</h1>
        <p className="text-gray-600 mt-1">Manage user roles and permissions</p>
      </div>

      {/* Current User Role */}
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary-100 rounded-lg">
            <Shield className="text-primary-600" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Current User Role</h3>
            <p className="text-sm text-gray-600">
              You are logged in as: <span className="font-medium">{currentUser.role}</span>
            </p>
          </div>
        </div>
      </Card>

      {/* Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <Card key={role.id} className="p-6">
              <div className="flex items-start gap-4">
                <div className={`${role.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{role.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{role.description}</p>
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-2">Permissions:</p>
                    <ul className="space-y-1">
                      {role.permissions.map((permission, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                          <UserCheck size={12} className="text-green-500" />
                          {permission}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Implementation Guide */}
      <ProtectedRouteExample />
    </div>
  );
};

export default Roles;

