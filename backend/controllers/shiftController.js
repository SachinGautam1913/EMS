import Shift from '../models/Shift.js';
import Employee from '../models/Employee.js';
import { validationResult } from 'express-validator';

// @desc    Get all shifts
// @route   GET /api/shifts
// @access  Private
export const getShifts = async (req, res) => {
  try {
    const { isActive, page = 1, limit = 10 } = req.query;

    const query = {};

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const shifts = await Shift.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Shift.countDocuments(query);

    res.json({
      success: true,
      count: shifts.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: shifts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single shift
// @route   GET /api/shifts/:id
// @access  Private
export const getShift = async (req, res) => {
  try {
    const shift = await Shift.findById(req.params.id);

    if (!shift) {
      return res.status(404).json({
        success: false,
        message: 'Shift not found'
      });
    }

    res.json({
      success: true,
      data: shift
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create shift
// @route   POST /api/shifts
// @access  Private (Admin, HR)
export const createShift = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const shift = await Shift.create(req.body);

    res.status(201).json({
      success: true,
      data: shift
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Shift with this name already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update shift
// @route   PUT /api/shifts/:id
// @access  Private (Admin, HR)
export const updateShift = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const shift = await Shift.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!shift) {
      return res.status(404).json({
        success: false,
        message: 'Shift not found'
      });
    }

    res.json({
      success: true,
      data: shift
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete shift
// @route   DELETE /api/shifts/:id
// @access  Private (Admin)
export const deleteShift = async (req, res) => {
  try {
    const shift = await Shift.findByIdAndDelete(req.params.id);

    if (!shift) {
      return res.status(404).json({
        success: false,
        message: 'Shift not found'
      });
    }

    res.json({
      success: true,
      message: 'Shift deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Assign shift to employee
// @route   POST /api/shifts/:id/assign
// @access  Private (Admin, HR)
export const assignShift = async (req, res) => {
  try {
    const { employeeId } = req.body;

    const shift = await Shift.findById(req.params.id);
    if (!shift) {
      return res.status(404).json({
        success: false,
        message: 'Shift not found'
      });
    }

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Store shift assignment (you can add a shiftId field to Employee model)
    employee.shiftId = shift._id;
    await employee.save();

    res.json({
      success: true,
      message: 'Shift assigned successfully',
      data: {
        employee: {
          id: employee._id,
          name: employee.name,
          employeeId: employee.employeeId
        },
        shift: {
          id: shift._id,
          name: shift.name,
          startTime: shift.startTime,
          endTime: shift.endTime
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get employees by shift
// @route   GET /api/shifts/:id/employees
// @access  Private (Admin, HR)
export const getShiftEmployees = async (req, res) => {
  try {
    const shift = await Shift.findById(req.params.id);
    if (!shift) {
      return res.status(404).json({
        success: false,
        message: 'Shift not found'
      });
    }

    const employees = await Employee.find({ shiftId: shift._id })
      .select('name email employeeId department designation');

    res.json({
      success: true,
      count: employees.length,
      data: employees
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

