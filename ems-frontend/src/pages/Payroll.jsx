import React, { useState } from 'react';
import { DollarSign, Plus, Download, Calculator } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { useAppContext } from '../context/AppContext';

/**
 * Payroll Management Page
 */
const Payroll = () => {
  const { employees, payroll, addPayroll, calculateSalary } = useAppContext();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [salaryData, setSalaryData] = useState({
    basicSalary: '',
    allowances: '',
    deductions: '',
    bonus: '',
    overtime: '',
    month: new Date().toISOString().slice(0, 7),
  });

  const handleCalculate = () => {
    const basic = parseFloat(salaryData.basicSalary) || 0;
    const allowances = parseFloat(salaryData.allowances) || 0;
    const deductions = parseFloat(salaryData.deductions) || 0;
    const bonus = parseFloat(salaryData.bonus) || 0;
    const overtime = parseFloat(salaryData.overtime) || 0;

    // TODO: Implement actual tax/PF/ESI calculations
    const grossSalary = basic + allowances + bonus + overtime;
    const totalDeductions = deductions; // Add tax, PF, ESI calculations here
    const netSalary = grossSalary - totalDeductions;

    return { grossSalary, totalDeductions, netSalary };
  };

  const handleSubmitPayroll = (e) => {
    e.preventDefault();
    const employee = employees.find((e) => e.id === selectedEmployee);
    const calculated = handleCalculate();

    addPayroll({
      id: `PAY${Date.now()}`,
      employeeId: selectedEmployee,
      employeeName: employee?.name || '',
      month: salaryData.month,
      basicSalary: parseFloat(salaryData.basicSalary),
      allowances: parseFloat(salaryData.allowances) || 0,
      deductions: calculated.totalDeductions,
      bonus: parseFloat(salaryData.bonus) || 0,
      overtime: parseFloat(salaryData.overtime) || 0,
      grossSalary: calculated.grossSalary,
      netSalary: calculated.netSalary,
      status: 'paid',
      paidDate: new Date().toISOString().split('T')[0],
    });

    setIsAddModalOpen(false);
    setSalaryData({
      basicSalary: '',
      allowances: '',
      deductions: '',
      bonus: '',
      overtime: '',
      month: new Date().toISOString().slice(0, 7),
    });
  };

  const calculated = handleCalculate();

  const columns = [
    { key: 'employeeName', label: 'Employee' },
    {
      key: 'month',
      label: 'Month',
      render: (value) =>
        new Date(value + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
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
      render: (value) => `$${value.toLocaleString()}`,
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
        <Button variant="outline" size="sm">
          <Download size={14} className="inline mr-1" />
          Payslip
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payroll</h1>
          <p className="text-gray-600 mt-1">Manage employee salaries and payslips</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setIsCalculatorOpen(true)}>
            <Calculator size={16} className="inline mr-2" />
            Salary Calculator
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus size={16} className="inline mr-2" />
            Add Payroll
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Payroll</p>
              <p className="text-2xl font-bold text-gray-900">
                ${payroll.reduce((sum, p) => sum + p.netSalary, 0).toLocaleString()}
              </p>
            </div>
            <DollarSign className="text-primary-600" size={32} />
          </div>
        </Card>
        <Card className="p-6">
          <div>
            <p className="text-sm text-gray-600">Paid This Month</p>
            <p className="text-2xl font-bold text-gray-900">
              {payroll.filter((p) => p.status === 'paid').length}
            </p>
          </div>
        </Card>
        <Card className="p-6">
          <div>
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-gray-900">
              {payroll.filter((p) => p.status === 'pending').length}
            </p>
          </div>
        </Card>
        <Card className="p-6">
          <div>
            <p className="text-sm text-gray-600">Average Salary</p>
            <p className="text-2xl font-bold text-gray-900">
              ${Math.round(payroll.reduce((sum, p) => sum + p.netSalary, 0) / payroll.length || 0).toLocaleString()}
            </p>
          </div>
        </Card>
      </div>

      {/* Payroll Table */}
      <Table columns={columns} data={payroll} />

      {/* Salary Calculator Modal */}
      <Modal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        title="Salary Calculator"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Basic Salary"
              type="number"
              value={salaryData.basicSalary}
              onChange={(e) => setSalaryData({ ...salaryData, basicSalary: e.target.value })}
            />
            <Input
              label="Allowances"
              type="number"
              value={salaryData.allowances}
              onChange={(e) => setSalaryData({ ...salaryData, allowances: e.target.value })}
            />
            <Input
              label="Deductions"
              type="number"
              value={salaryData.deductions}
              onChange={(e) => setSalaryData({ ...salaryData, deductions: e.target.value })}
            />
            <Input
              label="Bonus"
              type="number"
              value={salaryData.bonus}
              onChange={(e) => setSalaryData({ ...salaryData, bonus: e.target.value })}
            />
            <Input
              label="Overtime"
              type="number"
              value={salaryData.overtime}
              onChange={(e) => setSalaryData({ ...salaryData, overtime: e.target.value })}
            />
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Gross Salary:</span>
              <span className="font-bold">${calculated.grossSalary.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Total Deductions:</span>
              <span>${calculated.totalDeductions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Net Salary:</span>
              <span className="text-primary-600">${calculated.netSalary.toLocaleString()}</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Note: Tax, PF, and ESI calculations are stubbed. Implement actual formulas based on your country's regulations.
          </p>
        </div>
      </Modal>

      {/* Add Payroll Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Payroll Entry"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitPayroll}>Add Payroll</Button>
          </>
        }
      >
        <form onSubmit={handleSubmitPayroll} className="space-y-4">
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="input"
            required
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name} - {emp.id}
              </option>
            ))}
          </select>
          <Input
            label="Month"
            type="month"
            value={salaryData.month}
            onChange={(e) => setSalaryData({ ...salaryData, month: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Basic Salary"
              type="number"
              value={salaryData.basicSalary}
              onChange={(e) => setSalaryData({ ...salaryData, basicSalary: e.target.value })}
              required
            />
            <Input
              label="Allowances"
              type="number"
              value={salaryData.allowances}
              onChange={(e) => setSalaryData({ ...salaryData, allowances: e.target.value })}
            />
            <Input
              label="Deductions"
              type="number"
              value={salaryData.deductions}
              onChange={(e) => setSalaryData({ ...salaryData, deductions: e.target.value })}
            />
            <Input
              label="Bonus"
              type="number"
              value={salaryData.bonus}
              onChange={(e) => setSalaryData({ ...salaryData, bonus: e.target.value })}
            />
            <Input
              label="Overtime"
              type="number"
              value={salaryData.overtime}
              onChange={(e) => setSalaryData({ ...salaryData, overtime: e.target.value })}
            />
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span>Net Salary:</span>
              <span className="font-bold text-primary-600">
                ${calculated.netSalary.toLocaleString()}
              </span>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Payroll;

