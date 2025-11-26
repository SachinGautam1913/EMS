import express from 'express';
import { body } from 'express-validator';
import {
  applyLeave,
  getLeaves,
  getLeave,
  approveLeave,
  getLeaveBalance,
  updateLeave,
  deleteLeave
} from '../controllers/leaveController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Apply for leave
router.post('/', [
  body('leaveType').trim().notEmpty().withMessage('Leave type is required'),
  body('startDate').isISO8601().withMessage('Invalid start date'),
  body('endDate').isISO8601().withMessage('Invalid end date'),
  body('reason').trim().notEmpty().withMessage('Reason is required')
], applyLeave);

// Get all leave requests
// Query params: status, employeeId, page, limit
router.get('/', getLeaves);

// Get leave balance for employee
router.get('/balance/:employeeId', getLeaveBalance);

// Get single leave request
router.get('/:id', getLeave);

// Approve/reject leave (Admin, HR only)
router.put('/:id/approve', authorize('admin', 'hr'), [
  body('status').isIn(['approved', 'rejected']).withMessage('Status must be approved or rejected'),
  body('comments').optional().trim()
], approveLeave);

// Update leave request
router.put('/:id', [
  body('leaveType').optional().trim().notEmpty().withMessage('Leave type is required'),
  body('startDate').optional().isISO8601().withMessage('Invalid start date'),
  body('endDate').optional().isISO8601().withMessage('Invalid end date'),
  body('reason').optional().trim().notEmpty().withMessage('Reason is required')
], updateLeave);

// Delete leave request
router.delete('/:id', deleteLeave);

export default router;

