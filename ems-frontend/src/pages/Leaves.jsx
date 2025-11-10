import React, { useState } from 'react';
import { Plus, CheckCircle, XCircle, Calendar } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { useAppContext } from '../context/AppContext';

/**
 * Leaves Management Page - HR/Admin Only
 * Manage all leave requests
 */
const Leaves = () => {
  const {
    employees,
    leaveRequests,
    leaveTypes,
    updateLeaveStatus,
  } = useAppContext();

  const [filterStatus, setFilterStatus] = useState('');

  const filteredLeaves = filterStatus
    ? leaveRequests.filter((l) => l.status === filterStatus)
    : leaveRequests;

  const columns = [
    { key: 'employeeName', label: 'Employee' },
    { key: 'leaveType', label: 'Leave Type' },
    {
      key: 'startDate',
      label: 'Start Date',
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: 'endDate',
      label: 'End Date',
      render: (value) => new Date(value).toLocaleDateString(),
    },
    { key: 'reason', label: 'Reason' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const colors = {
          pending: 'bg-yellow-100 text-yellow-800',
          approved: 'bg-green-100 text-green-800',
          rejected: 'bg-red-100 text-red-800',
        };
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[value] || colors.pending}`}>
            {value}
          </span>
        );
      },
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        row.status === 'pending' && (
          <div className="flex gap-2">
            <button
              onClick={() => updateLeaveStatus(row.id, 'approved')}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Approve"
            >
              <CheckCircle size={18} />
            </button>
            <button
              onClick={() => updateLeaveStatus(row.id, 'rejected')}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Reject"
            >
              <XCircle size={18} />
            </button>
          </div>
        )
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Leaves</h1>
          <p className="text-gray-600 mt-1">Review and manage employee leave requests</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 max-w-xs">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          {filterStatus && (
            <Button variant="secondary" onClick={() => setFilterStatus('')}>
              Clear Filter
            </Button>
          )}
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900">{leaveRequests.length}</p>
            </div>
            <Calendar className="text-primary-600" size={32} />
          </div>
        </Card>
        <Card className="p-6">
          <div>
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {leaveRequests.filter((l) => l.status === 'pending').length}
            </p>
          </div>
        </Card>
        <Card className="p-6">
          <div>
            <p className="text-sm text-gray-600">Approved</p>
            <p className="text-2xl font-bold text-green-600">
              {leaveRequests.filter((l) => l.status === 'approved').length}
            </p>
          </div>
        </Card>
        <Card className="p-6">
          <div>
            <p className="text-sm text-gray-600">Rejected</p>
            <p className="text-2xl font-bold text-red-600">
              {leaveRequests.filter((l) => l.status === 'rejected').length}
            </p>
          </div>
        </Card>
      </div>

      {/* Leaves Table */}
      <Table columns={columns} data={filteredLeaves} />
    </div>
  );
};

export default Leaves;

