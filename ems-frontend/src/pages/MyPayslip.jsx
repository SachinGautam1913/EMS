import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Calendar } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Table from '../components/Table';
import { useAppContext } from '../context/AppContext';

/**
 * My Payslip Page - Employee Self-Service
 * Employees can view their own payslips
 */
const MyPayslip = () => {
  const navigate = useNavigate();
  const { currentUser, payroll } = useAppContext();
  const [selectedMonth, setSelectedMonth] = useState('');

  // Filter payroll records for current user
  const myPayroll = payroll.filter(
    (p) => p.employeeId === currentUser?.id || p.employeeEmail === currentUser?.email
  );

  // Filter by selected month if provided
  const filteredPayroll = selectedMonth
    ? myPayroll.filter((p) => p.month === selectedMonth)
    : myPayroll;

  const columns = [
    {
      key: 'month',
      label: 'Month',
      render: (value) =>
        new Date(value + '-01').toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        }),
    },
    {
      key: 'grossSalary',
      label: 'Gross Salary',
      render: (value) => `$${value.toLocaleString()}`,
    },
    {
      key: 'deductions',
      label: 'Deductions',
      render: (value) => `$${value.toLocaleString()}`,
    },
    {
      key: 'netSalary',
      label: 'Net Salary',
      render: (value) => (
        <span className="font-semibold text-primary-600">${value.toLocaleString()}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {value}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <Button variant="outline" size="sm" onClick={() => handleDownloadPayslip(row)}>
          <Download size={14} className="inline mr-1" />
          Download
        </Button>
      ),
    },
  ];

  const handleDownloadPayslip = (payslip) => {
    // TODO: Implement actual PDF download
    alert(`Downloading payslip for ${payslip.month}...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Payslips</h1>
          <p className="text-gray-600 mt-1">View and download your salary statements</p>
        </div>
        <Button variant="secondary" onClick={() => navigate('/')}>
          <ArrowLeft size={16} className="inline mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Filter */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 max-w-xs">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Month
            </label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="input"
            />
          </div>
          {selectedMonth && (
            <Button variant="secondary" onClick={() => setSelectedMonth('')}>
              Clear Filter
            </Button>
          )}
        </div>
      </Card>

      {/* Payslips Table */}
      {filteredPayroll.length > 0 ? (
        <Table columns={columns} data={filteredPayroll} />
      ) : (
        <Card className="p-12 text-center">
          <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-500 text-lg mb-2">No payslips found</p>
          <p className="text-gray-400 text-sm">
            {selectedMonth
              ? 'No payslip available for the selected month'
              : 'You don\'t have any payslips yet'}
          </p>
        </Card>
      )}

      {/* Summary Card */}
      {myPayroll.length > 0 && (
        <Card title="Summary">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500">Total Payslips</p>
              <p className="text-2xl font-bold text-gray-900">{myPayroll.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Earnings</p>
              <p className="text-2xl font-bold text-primary-600">
                ${myPayroll.reduce((sum, p) => sum + p.netSalary, 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Monthly Salary</p>
              <p className="text-2xl font-bold text-gray-900">
                ${Math.round(myPayroll.reduce((sum, p) => sum + p.netSalary, 0) / myPayroll.length).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MyPayslip;

