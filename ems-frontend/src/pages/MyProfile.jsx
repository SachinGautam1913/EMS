import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Avatar from '../components/Avatar';
import { useAppContext } from '../context/AppContext';

/**
 * My Profile Page - Employee Self-Service
 * Employees can view their own profile information
 */
const MyProfile = () => {
  const navigate = useNavigate();
  const { currentUser, employees } = useAppContext();
  
  // Find employee data for current user
  const employeeData = employees.find((e) => e.id === currentUser?.id || e.email === currentUser?.email);

  if (!currentUser) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Please log in to view your profile</p>
        <Button onClick={() => navigate('/login')} className="mt-4">
          Go to Login
        </Button>
      </div>
    );
  }

  const displayData = employeeData || currentUser;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">View and manage your personal information</p>
        </div>
        <Button variant="secondary" onClick={() => navigate('/')}>
          <ArrowLeft size={16} className="inline mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex items-start gap-6">
          <Avatar src={displayData.avatar} name={displayData.name} size="xl" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{displayData.name}</h2>
            <p className="text-gray-600 mt-1">
              {displayData.designation || 'Employee'} • {displayData.department || 'N/A'}
            </p>
            <div className="flex items-center gap-6 mt-4">
              <div>
                <p className="text-sm text-gray-500">Employee ID</p>
                <p className="font-medium text-gray-900">{displayData.id || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{displayData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">{displayData.phone || 'N/A'}</p>
              </div>
            </div>
          </div>
          <Button>
            <Edit size={16} className="inline mr-2" />
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Personal Information">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium text-gray-900">{displayData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-medium text-gray-900">{displayData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium text-gray-900">{displayData.phone || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-medium text-gray-900">{displayData.department || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Designation</p>
              <p className="font-medium text-gray-900">{displayData.designation || 'N/A'}</p>
            </div>
            {displayData.joiningDate && (
              <div>
                <p className="text-sm text-gray-500">Joining Date</p>
                <p className="font-medium text-gray-900">
                  {new Date(displayData.joiningDate).toLocaleDateString()}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {displayData.status || 'Active'}
              </span>
            </div>
          </div>
        </Card>

        <Card title="Quick Actions">
          <div className="space-y-3">
            <Button
              variant="secondary"
              className="w-full justify-start"
              onClick={() => navigate('/attendance')}
            >
              Mark Attendance
            </Button>
            <Button
              variant="secondary"
              className="w-full justify-start"
              onClick={() => navigate('/attendance')}
            >
              Apply for Leave
            </Button>
            <Button
              variant="secondary"
              className="w-full justify-start"
              onClick={() => navigate('/my-payslip')}
            >
              View Payslip
            </Button>
            <Button
              variant="secondary"
              className="w-full justify-start"
              onClick={() => navigate('/my-performance')}
            >
              View Performance
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MyProfile;

