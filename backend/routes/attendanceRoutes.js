import express from 'express';
import { body } from 'express-validator';
import {
  clockIn,
  clockOut,
  getAttendance,
  applyLeave,
  getLeaves,
  updateLeaveStatus
} from '../controllers/attendanceController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Clock in/out
router.post('/clock-in', [
  body('date').optional().isISO8601().withMessage('Invalid date format'),
  body('employeeId').optional().isMongoId().withMessage('Invalid employee ID')
], clockIn);

router.post('/clock-out', [
  body('date').optional().isISO8601().withMessage('Invalid date format'),
  body('employeeId').optional().isMongoId().withMessage('Invalid employee ID')
], clockOut);

// Get attendance records
router.get('/', getAttendance);

// Leave routes
router.post('/leaves', [
  body('leaveType').trim().notEmpty().withMessage('Leave type is required'),
  body('startDate').isISO8601().withMessage('Invalid start date'),
  body('endDate').isISO8601().withMessage('Invalid end date'),
  body('reason').trim().notEmpty().withMessage('Reason is required')
], applyLeave);

router.get('/leaves', getLeaves);

// Update leave status (Admin, HR only)
router.put('/leaves/:id/status', authorize('admin', 'hr'), [
  body('status').isIn(['approved', 'rejected']).withMessage('Status must be approved or rejected')
], updateLeaveStatus);

export default router;









