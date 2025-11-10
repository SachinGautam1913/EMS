import React, { useState } from 'react';
import { Clock, Calendar, Plus, CheckCircle, XCircle } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { useAppContext } from '../context/AppContext';

/**
 * Attendance & Leave Management Page
 */
const Attendance = () => {
  const {
    currentUser,
    employees,
    attendance,
    leaveRequests,
    leaveTypes,
    markAttendance,
    applyLeave,
    updateLeaveStatus,
    addLeaveType,
    updateLeaveType,
    deleteLeaveType,
  } = useAppContext();

  // Determine available tabs based on user role
  const isEmployee = currentUser?.role === 'employee';
  const isHRorAdmin = currentUser?.role === 'hr' || currentUser?.role === 'admin';

  const [activeTab, setActiveTab] = useState(isEmployee ? 'clock' : 'attendance');
  const [isClockIn, setIsClockIn] = useState(true);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isLeaveTypeModalOpen, setIsLeaveTypeModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [leaveForm, setLeaveForm] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [leaveTypeForm, setLeaveTypeForm] = useState({
    name: '',
    days: '',
    carryForward: false,
  });

  const todayAttendance = attendance.find(
    (a) => (a.employeeId === currentUser?.id || a.employeeEmail === currentUser?.email) && a.date === selectedDate
  );

  const handleClockIn = () => {
    const now = new Date();
    const time = now.toTimeString().split(' ')[0];
    
    markAttendance({
      id: `ATT${Date.now()}`,
      employeeId: currentUser?.id || 'EMP001',
      employeeEmail: currentUser?.email,
      date: selectedDate,
      clockIn: time,
      clockOut: null,
      status: 'present',
      hoursWorked: 0,
    });
    setIsClockIn(false);
  };

  const handleClockOut = () => {
    const now = new Date();
    const time = now.toTimeString().split(' ')[0];
    const clockInTime = new Date(`${selectedDate} ${todayAttendance.clockIn}`);
    const clockOutTime = now;
    const hoursWorked = (clockOutTime - clockInTime) / (1000 * 60 * 60);

    // TODO: Update attendance record via API
    // For now, we'll just show a message
    alert(`Clocked out at ${time}. Hours worked: ${hoursWorked.toFixed(2)}`);
  };

  const handleApplyLeave = (e) => {
    e.preventDefault();
    const employee = employees.find((e) => e.id === currentUser?.id || e.email === currentUser?.email);
    
    applyLeave({
      id: `LEAVE${Date.now()}`,
      employeeId: currentUser?.id || 'EMP001',
      employeeEmail: currentUser?.email,
      employeeName: employee?.name || currentUser?.name || 'Employee',
      leaveType: leaveForm.leaveType,
      startDate: leaveForm.startDate,
      endDate: leaveForm.endDate,
      reason: leaveForm.reason,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0],
    });
    
    setIsLeaveModalOpen(false);
    setLeaveForm({ leaveType: '', startDate: '', endDate: '', reason: '' });
  };

  const handleAddLeaveType = (e) => {
    e.preventDefault();
    addLeaveType({
      id: `LT${Date.now()}`,
      name: leaveTypeForm.name,
      days: parseInt(leaveTypeForm.days),
      carryForward: leaveTypeForm.carryForward,
    });
    setIsLeaveTypeModalOpen(false);
    setLeaveTypeForm({ name: '', days: '', carryForward: false });
  };

  const attendanceColumns = [
    { key: 'date', label: 'Date' },
    { key: 'clockIn', label: 'Clock In' },
    { key: 'clockOut', label: 'Clock Out' },
    {
      key: 'hoursWorked',
      label: 'Hours',
      render: (value) => `${value} hrs`,
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
  ];

  const leaveColumns = [
    { key: 'employeeName', label: 'Employee' },
    { key: 'leaveType', label: 'Leave Type' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
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
              className="p-1 text-green-600 hover:bg-green-50 rounded"
            >
              <CheckCircle size={16} />
            </button>
            <button
              onClick={() => updateLeaveStatus(row.id, 'rejected')}
              className="p-1 text-red-600 hover:bg-red-50 rounded"
            >
              <XCircle size={16} />
            </button>
          </div>
        )
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Attendance & Leave</h1>
        <p className="text-gray-600 mt-1">Manage attendance and leave requests</p>
      </div>

      {/* Tabs - Different tabs for different roles */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {(isEmployee
            ? [
                { id: 'clock', label: 'Clock In/Out' },
                { id: 'leave', label: 'Apply for Leave' },
              ]
            : [
                { id: 'attendance', label: 'Attendance Records' },
                { id: 'leave', label: 'Leave Requests' },
                { id: 'leave-types', label: 'Leave Types' },
              ]
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Clock In/Out */}
      {activeTab === 'clock' && (
        <Card className="p-8">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-6">
              <Clock className="mx-auto text-primary-600" size={64} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {todayAttendance ? 'Clocked In' : 'Not Clocked In'}
            </h2>
            <p className="text-gray-600 mb-6">
              {todayAttendance
                ? `Clocked in at ${todayAttendance.clockIn}`
                : 'Click the button below to clock in'}
            </p>
            <div className="mb-4">
              <Input
                label="Date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            {todayAttendance && !todayAttendance.clockOut ? (
              <Button onClick={handleClockOut} size="lg" className="w-full">
                Clock Out
              </Button>
            ) : (
              <Button onClick={handleClockIn} size="lg" className="w-full">
                Clock In
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* Attendance Records */}
      {activeTab === 'attendance' && (
        <div>
          <div className="mb-4">
            <Input
              label="Filter by Date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="max-w-xs"
            />
          </div>
          <Table
            columns={attendanceColumns}
            data={attendance.filter((a) => a.date === selectedDate || !selectedDate)}
          />
        </div>
      )}

      {/* Leave Requests */}
      {activeTab === 'leave' && (
        <div>
          {isEmployee ? (
            // Employee view - Apply for leave
            <div>
              <div className="mb-4 flex justify-between items-center">
                <Button onClick={() => setIsLeaveModalOpen(true)}>
                  <Plus size={16} className="inline mr-2" />
                  Apply for Leave
                </Button>
              </div>
              <Card title="My Leave Requests">
                <Table 
                  columns={leaveColumns.filter(col => col.key !== 'actions')} 
                  data={leaveRequests.filter(l => l.employeeId === currentUser?.id || l.employeeEmail === currentUser?.email)} 
                />
              </Card>
            </div>
          ) : (
            // HR/Admin view - Manage all leave requests
            <div>
              <Table columns={leaveColumns} data={leaveRequests} />
            </div>
          )}
        </div>
      )}

      {/* Leave Types - Only for HR/Admin */}
      {activeTab === 'leave-types' && isHRorAdmin && (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <Button onClick={() => setIsLeaveTypeModalOpen(true)}>
              <Plus size={16} className="inline mr-2" />
              Add Leave Type
            </Button>
          </div>
          <Table
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'days', label: 'Days' },
              {
                key: 'carryForward',
                label: 'Carry Forward',
                render: (value) => (value ? 'Yes' : 'No'),
              },
            ]}
            data={leaveTypes}
          />
        </div>
      )}

      {/* Apply Leave Modal */}
      <Modal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        title="Apply for Leave"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsLeaveModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApplyLeave}>Submit</Button>
          </>
        }
      >
        <form onSubmit={handleApplyLeave} className="space-y-4">
          <select
            value={leaveForm.leaveType}
            onChange={(e) => setLeaveForm({ ...leaveForm, leaveType: e.target.value })}
            className="input"
            required
          >
            <option value="">Select Leave Type</option>
            {leaveTypes.map((lt) => (
              <option key={lt.id} value={lt.name}>
                {lt.name}
              </option>
            ))}
          </select>
          <Input
            label="Start Date"
            type="date"
            value={leaveForm.startDate}
            onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
            required
          />
          <Input
            label="End Date"
            type="date"
            value={leaveForm.endDate}
            onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason
            </label>
            <textarea
              value={leaveForm.reason}
              onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
              className="input"
              rows={4}
              required
            />
          </div>
        </form>
      </Modal>

      {/* Add Leave Type Modal */}
      <Modal
        isOpen={isLeaveTypeModalOpen}
        onClose={() => setIsLeaveTypeModalOpen(false)}
        title="Add Leave Type"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsLeaveTypeModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddLeaveType}>Add</Button>
          </>
        }
      >
        <form onSubmit={handleAddLeaveType} className="space-y-4">
          <Input
            label="Leave Type Name"
            value={leaveTypeForm.name}
            onChange={(e) => setLeaveTypeForm({ ...leaveTypeForm, name: e.target.value })}
            required
          />
          <Input
            label="Number of Days"
            type="number"
            value={leaveTypeForm.days}
            onChange={(e) => setLeaveTypeForm({ ...leaveTypeForm, days: e.target.value })}
            required
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              id="carryForward"
              checked={leaveTypeForm.carryForward}
              onChange={(e) =>
                setLeaveTypeForm({ ...leaveTypeForm, carryForward: e.target.checked })
              }
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="carryForward" className="ml-2 block text-sm text-gray-900">
              Allow Carry Forward
            </label>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Attendance;

