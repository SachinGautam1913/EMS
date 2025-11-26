import Payroll from '../models/Payroll.js';
import Employee from '../models/Employee.js';
import { validationResult } from 'express-validator';

// Calculate salary components
const calculateSalary = (basicSalary, allowances, deductions, bonus, overtime) => {
  const grossSalary = basicSalary + allowances + bonus + overtime;
  
  // Simple tax calculation (adjust based on your country's tax rules)
  const tax = grossSalary > 50000 ? grossSalary * 0.1 : 0;
  
  // PF calculation (12% of basic salary)
  const pf = basicSalary * 0.12;
  
  // ESI calculation (1.75% of gross salary, if applicable)
  const esi = grossSalary > 21000 ? grossSalary * 0.0175 : 0;
  
  const totalDeductions = deductions + tax + pf + esi;
  const netSalary = grossSalary - totalDeductions;

  return {
    grossSalary,
    tax,
    pf,
    esi,
    totalDeductions,
    netSalary
  };
};

// @desc    Get all payroll records
// @route   GET /api/payroll
// @access  Private (Admin, HR)
export const getPayroll = async (req, res) => {
  try {
    const { employeeId, month, page = 1, limit = 10 } = req.query;

    const query = {};

    if (employeeId) {
      const employee = await Employee.findById(employeeId);
      if (employee) {
        query.employeeId = employee._id;
      }
    } else if (req.user.role === 'employee') {
      // Employees can only see their own payroll
      const employee = await Employee.findOne({ userId: req.user.id });
      if (employee) {
        query.employeeId = employee._id;
      }
    }

    if (month) {
      query.month = month;
    }

    const payroll = await Payroll.find(query)
      .populate('employeeId', 'name email employeeId')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ month: -1 });

    const total = await Payroll.countDocuments(query);

    res.json({
      success: true,
      count: payroll.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: payroll
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single payroll record
// @route   GET /api/payroll/:id
// @access  Private
export const getPayrollById = async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id)
      .populate('employeeId', 'name email employeeId');

    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: 'Payroll record not found'
      });
    }

    res.json({
      success: true,
      data: payroll
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get payroll by employee ID (salary history)
// @route   GET /api/payroll/employee/:employeeId
// @access  Private
export const getPayrollByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { page = 1, limit = 12 } = req.query;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Check authorization - employees can only see their own payroll
    if (req.user.role === 'employee') {
      const userEmployee = await Employee.findOne({ userId: req.user.id });
      if (!userEmployee || userEmployee._id.toString() !== employeeId) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to view this payroll'
        });
      }
    }

    const payrolls = await Payroll.find({ employeeId: employee._id })
      .sort({ month: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Payroll.countDocuments({ employeeId: employee._id });

    res.json({
      success: true,
      count: payrolls.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: payrolls
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Define salary structure
// @route   POST /api/payroll/structure
// @access  Private (Admin, HR)
export const defineSalaryStructure = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { employeeId, basicSalary, allowances, deductions } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Update employee salary structure
    employee.salary = basicSalary;
    // You can add more fields to Employee model for salary structure
    await employee.save();

    res.json({
      success: true,
      message: 'Salary structure defined successfully',
      data: {
        employeeId: employee._id,
        basicSalary,
        allowances: allowances || 0,
        deductions: deductions || 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Generate payslip for month
// @route   POST /api/payroll/generate
// @access  Private (Admin, HR)
export const generatePayslip = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { employeeId, month, allowances, deductions, bonus, overtime } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Check if payroll already exists
    const existing = await Payroll.findOne({
      employeeId: employee._id,
      month
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Payroll already exists for this employee and month'
      });
    }

    const basicSalary = employee.salary || 0;
    const calculated = calculateSalary(
      basicSalary,
      allowances || 0,
      deductions || 0,
      bonus || 0,
      overtime || 0
    );

    const payroll = await Payroll.create({
      employeeId: employee._id,
      month,
      basicSalary,
      allowances: allowances || 0,
      deductions: deductions || 0,
      bonus: bonus || 0,
      overtime: overtime || 0,
      ...calculated,
      status: 'pending',
      payslipUrl: null // In production, generate PDF and upload to S3/Cloudinary
    });

    res.status(201).json({
      success: true,
      message: 'Payslip generated successfully',
      data: payroll
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Payroll already exists for this employee and month'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create payroll record
// @route   POST /api/payroll
// @access  Private (Admin)
export const createPayroll = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { employeeId, month, basicSalary, allowances, deductions, bonus, overtime } = req.body;

    // Check if payroll already exists for this employee and month
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    const existing = await Payroll.findOne({
      employeeId: employee._id,
      month
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Payroll already exists for this employee and month'
      });
    }

    // Calculate salary
    const calculated = calculateSalary(basicSalary, allowances || 0, deductions || 0, bonus || 0, overtime || 0);

    const payroll = await Payroll.create({
      employeeId: employee._id,
      month,
      basicSalary,
      allowances: allowances || 0,
      deductions: deductions || 0,
      bonus: bonus || 0,
      overtime: overtime || 0,
      ...calculated,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      data: payroll
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Payroll already exists for this employee and month'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Calculate salary
// @route   POST /api/payroll/calculate
// @access  Private (Admin)
export const calculateSalaryEndpoint = async (req, res) => {
  try {
    const { basicSalary, allowances, deductions, bonus, overtime } = req.body;

    const calculated = calculateSalary(
      basicSalary || 0,
      allowances || 0,
      deductions || 0,
      bonus || 0,
      overtime || 0
    );

    res.json({
      success: true,
      data: calculated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update payroll status
// @route   PUT /api/payroll/:id/status
// @access  Private (Admin)
export const updatePayrollStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'paid', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const payroll = await Payroll.findById(req.params.id);

    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: 'Payroll record not found'
      });
    }

    payroll.status = status;
    if (status === 'paid') {
      payroll.paidDate = new Date();
    }

    await payroll.save();

    res.json({
      success: true,
      data: payroll
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};









