import React, { useState } from 'react';
import { FileText, Download, Calendar } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Table from '../components/Table';
import Input from '../components/Input';
import { useAppContext } from '../context/AppContext';

/**
 * Reports & Analytics Page
 */
const Reports = () => {
  const { employees, attendance, leaveRequests, payroll } = useAppContext();
  const [activeReport, setActiveReport] = useState('attendance');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleExport = (type) => {
    // TODO: Implement actual CSV/PDF export
    alert(`Exporting ${type} report...`);
  };

  const attendanceReport = attendance.filter((a) => {
    if (!startDate || !endDate) return true;
    return a.date >= startDate && a.date <= endDate;
  });

  const leaveReport = leaveRequests.filter((l) => {
    if (!startDate || !endDate) return true;
    return l.startDate >= startDate && l.endDate <= endDate;
  });

  const payrollReport = payroll.filter((p) => {
    if (!startDate || !endDate) return true;
    return p.month >= startDate.slice(0, 7) && p.month <= endDate.slice(0, 7);
  });

  const departmentStats = employees.reduce((acc, emp) => {
    if (!acc[emp.department]) {
      acc[emp.department] = { count: 0, totalSalary: 0 };
    }
    acc[emp.department].count++;
    acc[emp.department].totalSalary += emp.salary;
    return acc;
  }, {});

  const reports = [
    { id: 'attendance', label: 'Attendance Report' },
    { id: 'leave', label: 'Leave Report' },
    { id: 'payroll', label: 'Payroll Report' },
    { id: 'department', label: 'Department Analytics' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600 mt-1">Generate and export various reports</p>
      </div>

      {/* Report Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {reports.map((report) => (
            <button
              key={report.id}
              onClick={() => setActiveReport(report.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeReport === report.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {report.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <div className="flex items-end">
            <Button onClick={() => handleExport(activeReport)}>
              <Download size={16} className="inline mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </Card>

      {/* Attendance Report */}
      {activeReport === 'attendance' && (
        <Card title="Attendance Report">
          <Table
            columns={[
              { key: 'date', label: 'Date' },
              { key: 'employeeId', label: 'Employee ID' },
              { key: 'clockIn', label: 'Clock In' },
              { key: 'clockOut', label: 'Clock Out' },
              { key: 'hoursWorked', label: 'Hours' },
              { key: 'status', label: 'Status' },
            ]}
            data={attendanceReport}
          />
        </Card>
      )}

      {/* Leave Report */}
      {activeReport === 'leave' && (
        <Card title="Leave Report">
          <Table
            columns={[
              { key: 'employeeName', label: 'Employee' },
              { key: 'leaveType', label: 'Leave Type' },
              { key: 'startDate', label: 'Start Date' },
              { key: 'endDate', label: 'End Date' },
              { key: 'status', label: 'Status' },
            ]}
            data={leaveReport}
          />
        </Card>
      )}

      {/* Payroll Report */}
      {activeReport === 'payroll' && (
        <Card title="Payroll Report">
          <Table
            columns={[
              { key: 'employeeName', label: 'Employee' },
              { key: 'month', label: 'Month' },
              { key: 'grossSalary', label: 'Gross Salary' },
              { key: 'deductions', label: 'Deductions' },
              { key: 'netSalary', label: 'Net Salary' },
              { key: 'status', label: 'Status' },
            ]}
            data={payrollReport}
          />
        </Card>
      )}

      {/* Department Analytics */}
      {activeReport === 'department' && (
        <div className="space-y-6">
          <Card title="Department Statistics">
            <Table
              columns={[
                { key: 'department', label: 'Department' },
                { key: 'count', label: 'Employees' },
                {
                  key: 'totalSalary',
                  label: 'Total Salary',
                  render: (value) => `$${value.toLocaleString()}`,
                },
                {
                  key: 'averageSalary',
                  label: 'Average Salary',
                  render: (_, row) =>
                    `$${Math.round(row.totalSalary / row.count).toLocaleString()}`,
                },
              ]}
              data={Object.entries(departmentStats).map(([dept, stats]) => ({
                department: dept,
                ...stats,
              }))}
            />
          </Card>

          <Card title="Chart Placeholder">
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <FileText className="mx-auto text-gray-400 mb-2" size={48} />
                <p className="text-gray-500">
                  Chart visualization placeholder. Integrate with Chart.js, Recharts, or similar library.
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Example: npm install recharts
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Reports;

