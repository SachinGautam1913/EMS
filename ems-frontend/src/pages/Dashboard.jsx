import React from 'react';
import { Users, Clock, DollarSign, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';
import Card from '../components/Card';
import { useAppContext } from '../context/AppContext';

/**
 * Dashboard Page
 * Displays overview statistics and recent activities
 */
const Dashboard = () => {
  const { employees, leaveRequests, payroll, attendance } = useAppContext();

  // Calculate statistics
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.status === 'active').length;
  const pendingLeaves = leaveRequests.filter((l) => l.status === 'pending').length;
  const totalPayroll = payroll.reduce((sum, p) => sum + p.netSalary, 0);
  const recentHires = employees
    .sort((a, b) => new Date(b.joiningDate) - new Date(a.joiningDate))
    .slice(0, 5);

  const stats = [
    {
      title: 'Total Employees',
      value: totalEmployees,
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Employees',
      value: activeEmployees,
      change: '+5%',
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: 'Pending Leaves',
      value: pendingLeaves,
      change: '-3%',
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      title: 'Total Payroll',
      value: `$${(totalPayroll / 1000).toFixed(1)}k`,
      change: '+8%',
      icon: DollarSign,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight size={16} className="text-green-500" />
                    <span className="text-sm text-green-600 ml-1">{stat.change}</span>
                    <span className="text-sm text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Hires */}
      <Card title="Recent Hires">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Designation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Joining Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentHires.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-primary-700 font-medium">
                            {employee.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.designation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(employee.joiningDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Quick Actions" className="p-6">
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors">
              <div className="font-medium text-primary-900">Mark Attendance</div>
              <div className="text-sm text-primary-600">Clock in/out for today</div>
            </button>
            <button className="w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <div className="font-medium text-green-900">Apply for Leave</div>
              <div className="text-sm text-green-600">Submit a new leave request</div>
            </button>
            <button className="w-full text-left px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <div className="font-medium text-purple-900">View Payslip</div>
              <div className="text-sm text-purple-600">Download your latest payslip</div>
            </button>
          </div>
        </Card>

        <Card title="Upcoming Holidays" className="p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">New Year</div>
                <div className="text-sm text-gray-600">January 1, 2024</div>
              </div>
              <Calendar className="text-yellow-600" size={20} />
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Independence Day</div>
                <div className="text-sm text-gray-600">July 4, 2024</div>
              </div>
              <Calendar className="text-blue-600" size={20} />
            </div>
          </div>
        </Card>

        <Card title="Attendance Summary" className="p-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">This Month</span>
                <span className="font-medium text-gray-900">22/23 days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">On Time</span>
                <span className="font-medium text-gray-900">20 days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

