import Leave from '../models/Leave.js';
import Employee from '../models/Employee.js';
import { validationResult } from 'express-validator';

// @desc    Apply for leave
// @route   POST /api/leaves
// @access  Private
export const applyLeave = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const userId = req.user.id;
    const employee = await Employee.findOne({ userId: userId });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    const { leaveType, startDate, endDate, reason } = req.body;

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      return res.status(400).json({
        success: false,
        message: 'Start date must be before end date'
      });
    }

    const leave = await Leave.create({
      employeeId: employee._id,
      leaveType,
      startDate: start,
      endDate: end,
      reason,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      data: leave
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get leave requests
// @route   GET /api/leaves
// @access  Private
export const getLeaves = async (req, res) => {
  try {
    const { status, employeeId, page = 1, limit = 10 } = req.query;

    const query = {};

    if (employeeId) {
      const employee = await Employee.findById(employeeId);
      if (employee) {
        query.employeeId = employee._id;
      }
    } else if (req.user.role === 'employee') {
      // Employees can only see their own leaves
      const employee = await Employee.findOne({ userId: req.user.id });
      if (employee) {
        query.employeeId = employee._id;
      }
    }

    if (status) {
      query.status = status;
    }

    const leaves = await Leave.find(query)
      .populate('employeeId', 'name email employeeId')
      .populate('reviewedBy', 'name email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ appliedDate: -1 });

    const total = await Leave.countDocuments(query);

    res.json({
      success: true,
      count: leaves.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: leaves
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single leave request
// @route   GET /api/leaves/:id
// @access  Private
export const getLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id)
      .populate('employeeId', 'name email employeeId')
      .populate('reviewedBy', 'name email');

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: 'Leave request not found'
      });
    }

    // Check if employee is viewing their own leave or is admin/hr
    if (req.user.role === 'employee') {
      const employee = await Employee.findOne({ userId: req.user.id });
      if (employee && leave.employeeId._id.toString() !== employee._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to view this leave request'
        });
      }
    }

    res.json({
      success: true,
      data: leave
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update leave status (approve/reject)
// @route   PUT /api/leaves/:id/approve
// @access  Private (Admin, HR)
export const approveLeave = async (req, res) => {
  try {
    const { status, comments } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be approved or rejected'
      });
    }

    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: 'Leave request not found'
      });
    }

    leave.status = status;
    leave.reviewedBy = req.user.id;
    leave.reviewedAt = new Date();
    if (comments) {
      leave.comments = comments;
    }

    await leave.save();

    res.json({
      success: true,
      data: leave
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get leave balance for employee
// @route   GET /api/leaves/balance/:employeeId
// @access  Private
export const getLeaveBalance = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Get all approved leaves for this employee
    const approvedLeaves = await Leave.find({
      employeeId: employee._id,
      status: 'approved'
    });

    // Calculate total days taken
    let totalDays = 0;
    approvedLeaves.forEach(leave => {
      const start = new Date(leave.startDate);
      const end = new Date(leave.endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      totalDays += days;
    });

    // Default leave balance (can be configured in settings)
    const defaultLeaveBalance = 20; // days per year
    const balance = defaultLeaveBalance - totalDays;

    res.json({
      success: true,
      data: {
        employeeId: employee._id,
        totalLeaves: approvedLeaves.length,
        totalDaysTaken: totalDays,
        balance: balance > 0 ? balance : 0,
        defaultBalance: defaultLeaveBalance
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update leave request
// @route   PUT /api/leaves/:id
// @access  Private
export const updateLeave = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: 'Leave request not found'
      });
    }

    // Only allow update if status is pending
    if (leave.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update leave request that has been reviewed'
      });
    }

    // Check if employee is updating their own leave
    if (req.user.role === 'employee') {
      const employee = await Employee.findOne({ userId: req.user.id });
      if (employee && leave.employeeId.toString() !== employee._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this leave request'
        });
      }
    }

    const updatedLeave = await Leave.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('employeeId', 'name email employeeId');

    res.json({
      success: true,
      data: updatedLeave
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete leave request
// @route   DELETE /api/leaves/:id
// @access  Private
export const deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: 'Leave request not found'
      });
    }

    // Only allow delete if status is pending or user is admin
    if (leave.status !== 'pending' && req.user.role !== 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete leave request that has been reviewed'
      });
    }

    // Check if employee is deleting their own leave
    if (req.user.role === 'employee') {
      const employee = await Employee.findOne({ userId: req.user.id });
      if (employee && leave.employeeId.toString() !== employee._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to delete this leave request'
        });
      }
    }

    await Leave.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Leave request deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

