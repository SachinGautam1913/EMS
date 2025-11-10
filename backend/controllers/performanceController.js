import Performance from '../models/Performance.js';
import Employee from '../models/Employee.js';
import { validationResult } from 'express-validator';

// @desc    Get all performance reviews
// @route   GET /api/performance
// @access  Private
export const getPerformanceReviews = async (req, res) => {
  try {
    const { employeeId, page = 1, limit = 10 } = req.query;

    const query = {};

    if (employeeId) {
      const employee = await Employee.findById(employeeId);
      if (employee) {
        query.employeeId = employee._id;
      }
    } else if (req.user.role === 'employee') {
      // Employees can only see their own reviews
      const employee = await Employee.findOne({ userId: req.user.id });
      if (employee) {
        query.employeeId = employee._id;
      }
    }

    const reviews = await Performance.find(query)
      .populate('employeeId', 'name email employeeId')
      .populate('reviewedBy', 'name email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ reviewDate: -1 });

    const total = await Performance.countDocuments(query);

    res.json({
      success: true,
      count: reviews.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single performance review
// @route   GET /api/performance/:id
// @access  Private
export const getPerformanceReview = async (req, res) => {
  try {
    const review = await Performance.findById(req.params.id)
      .populate('employeeId', 'name email employeeId')
      .populate('reviewedBy', 'name email');

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Performance review not found'
      });
    }

    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create performance review
// @route   POST /api/performance
// @access  Private (Admin, HR)
export const createPerformanceReview = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { employeeId, reviewPeriod, rating, goals, feedback, strengths, areasForImprovement } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    const review = await Performance.create({
      employeeId: employee._id,
      reviewPeriod,
      rating,
      goals: goals || [],
      feedback,
      strengths: strengths || [],
      areasForImprovement: areasForImprovement || [],
      reviewedBy: req.user.id
    });

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update performance review
// @route   PUT /api/performance/:id
// @access  Private (Admin, HR)
export const updatePerformanceReview = async (req, res) => {
  try {
    const review = await Performance.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Performance review not found'
      });
    }

    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete performance review
// @route   DELETE /api/performance/:id
// @access  Private (Admin)
export const deletePerformanceReview = async (req, res) => {
  try {
    const review = await Performance.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Performance review not found'
      });
    }

    res.json({
      success: true,
      message: 'Performance review deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};









