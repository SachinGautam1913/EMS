import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Download, Edit } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Avatar from '../components/Avatar';
import { useAppContext } from '../context/AppContext';

/**
 * Employee Profile Page
 * Detailed view of employee with tabs for Overview, Documents, Attendance, Payroll, Performance
 */
const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, attendance, payroll, performanceReviews } = useAppContext();
  
  const [activeTab, setActiveTab] = useState('overview');
  const employee = employees.find((e) => e.id === id);

  if (!employee) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Employee not found</p>
        <Button onClick={() => navigate('/employees')} className="mt-4">
          Back to Employees
        </Button>
      </div>
    );
  }

  const employeeAttendance = attendance.filter((a) => a.employeeId === id);
  const employeePayroll = payroll.filter((p) => p.employeeId === id);
  const employeeReviews = performanceReviews.filter((r) => r.employeeId === id);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'documents', label: 'Documents' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'payroll', label: 'Payroll' },
    { id: 'performance', label: 'Performance' },
  ];

  return (
    <div className="space-y-6">
      <Button variant="secondary" onClick={() => navigate('/employees')}>
        <ArrowLeft size={16} className="inline mr-2" />
        Back to Employees
      </Button>

      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex items-start gap-6">
          <Avatar src={employee.avatar} name={employee.name} size="xl" />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{employee.name}</h1>
            <p className="text-gray-600 mt-1">{employee.designation} • {employee.department}</p>
            <div className="flex items-center gap-6 mt-4">
              <div>
                <p className="text-sm text-gray-500">Employee ID</p>
                <p className="font-medium text-gray-900">{employee.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{employee.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">{employee.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Joining Date</p>
                <p className="font-medium text-gray-900">
                  {new Date(employee.joiningDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <Button>
            <Edit size={16} className="inline mr-2" />
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Personal Information">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-900">{employee.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{employee.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{employee.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium text-gray-900">{employee.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Designation</p>
                  <p className="font-medium text-gray-900">{employee.designation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Joining Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(employee.joiningDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Salary</p>
                  <p className="font-medium text-gray-900">${employee.salary.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {employee.status}
                  </span>
                </div>
              </div>
            </Card>

            <Card title="Quick Stats">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Total Attendance Days</p>
                  <p className="text-2xl font-bold text-gray-900">{employeeAttendance.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Payroll Records</p>
                  <p className="text-2xl font-bold text-gray-900">{employeePayroll.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Performance Reviews</p>
                  <p className="text-2xl font-bold text-gray-900">{employeeReviews.length}</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'documents' && (
          <Card title="Documents">
            <div className="mb-4">
              <Button>
                <Upload size={16} className="inline mr-2" />
                Upload Document
              </Button>
            </div>
            {employee.documents && employee.documents.length > 0 ? (
              <div className="space-y-2">
                {employee.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{doc.name}</p>
                      <p className="text-sm text-gray-500">{doc.type}</p>
                    </div>
                    <Button variant="secondary" size="sm">
                      <Download size={16} className="inline mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No documents uploaded</p>
            )}
          </Card>
        )}

        {activeTab === 'attendance' && (
          <Card title="Attendance History">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Clock In
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Clock Out
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Hours Worked
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {employeeAttendance.map((att) => (
                    <tr key={att.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(att.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {att.clockIn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {att.clockOut}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {att.hoursWorked} hrs
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {att.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'payroll' && (
          <Card title="Payroll History">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Month
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Gross Salary
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Deductions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Net Salary
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {employeePayroll.map((pay) => (
                    <tr key={pay.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(pay.month + '-01').toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${pay.grossSalary.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${pay.deductions.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${pay.netSalary.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {pay.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Button variant="outline" size="sm">
                          <Download size={14} className="inline mr-1" />
                          Payslip
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'performance' && (
          <Card title="Performance Reviews">
            {employeeReviews.length > 0 ? (
              <div className="space-y-4">
                {employeeReviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{review.reviewPeriod}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">{review.rating}</span>
                        <span className="text-gray-500">/ 5.0</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{review.feedback}</p>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Goals:</p>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {review.goals.map((goal, idx) => (
                          <li key={idx}>{goal}</li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Reviewed by {review.reviewedBy} on{' '}
                      {new Date(review.reviewDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No performance reviews yet</p>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default EmployeeProfile;

