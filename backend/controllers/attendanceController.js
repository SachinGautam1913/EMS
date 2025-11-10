import Attendance from '../models/Attendance.js';
import Leave from '../models/Leave.js';
import Employee from '../models/Employee.js';
import { validationResult } from 'express-validator';

// @desc    Mark attendance (clock in)
// @route   POST /api/attendance/clock-in
// @access  Private
export const clockIn = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { date, employeeId } = req.body;
    const userId = employeeId || req.user.id;

    // Find employee by userId
    const employee = await Employee.findOne({ userId: userId });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    const attendanceDate = date ? new Date(date) : new Date();
    attendanceDate.setHours(0, 0, 0, 0);

    // Check if already clocked in today
    const existing = await Attendance.findOne({
      employeeId: employee._id,
      date: attendanceDate
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Already clocked in for this date'
      });
    }

    const now = new Date();
    const clockInTime = now.toTimeString().split(' ')[0];

    const attendance = await Attendance.create({
      employeeId: employee._id,
      date: attendanceDate,
      clockIn: clockInTime,
      status: 'present'
    });

    res.status(201).json({
      success: true,
      data: attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Mark attendance (clock out)
// @route   POST /api/attendance/clock-out
// @access  Private
export const clockOut = async (req, res) => {
  try {
    const { date, employeeId } = req.body;
    const userId = employeeId || req.user.id;

    // Find employee by userId
    const employee = await Employee.findOne({ userId: userId });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    const attendanceDate = date ? new Date(date) : new Date();
    attendanceDate.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
      employeeId: employee._id,
      date: attendanceDate
    });

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'No clock-in record found for this date'
      });
    }

    if (attendance.clockOut) {
      return res.status(400).json({
        success: false,
        message: 'Already clocked out for this date'
      });
    }

    const now = new Date();
    const clockOutTime = now.toTimeString().split(' ')[0];

    // Calculate hours worked
    const clockIn = new Date(`${attendance.date.toISOString().split('T')[0]} ${attendance.clockIn}`);
    const clockOut = new Date(`${attendance.date.toISOString().split('T')[0]} ${clockOutTime}`);
    const hoursWorked = (clockOut - clockIn) / (1000 * 60 * 60);

    attendance.clockOut = clockOutTime;
    attendance.hoursWorked = hoursWorked.toFixed(2);
    await attendance.save();

    res.json({
      success: true,
      data: attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get attendance records
// @route   GET /api/attendance
// @access  Private
export const getAttendance = async (req, res) => {
  try {
    const { employeeId, startDate, endDate, page = 1, limit = 10 } = req.query;

    const query = {};

    if (employeeId) {
      const employee = await Employee.findById(employeeId);
      if (employee) {
        query.employeeId = employee._id;
      }
    } else if (req.user.role === 'employee') {
      // Employees can only see their own attendance
      const employee = await Employee.findOne({ userId: req.user.id });
      if (employee) {
        query.employeeId = employee._id;
      }
    }

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const attendance = await Attendance.find(query)
      .populate('employeeId', 'name email employeeId')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ date: -1 });

    const total = await Attendance.countDocuments(query);

    res.json({
      success: true,
      count: attendance.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Apply for leave
// @route   POST /api/attendance/leaves
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

    const leave = await Leave.create({
      ...req.body,
      employeeId: employee._id
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
// @route   GET /api/attendance/leaves
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

// @desc    Update leave status (approve/reject)
// @route   PUT /api/attendance/leaves/:id/status
// @access  Private (Admin, HR)
export const updateLeaveStatus = async (req, res) => {
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









