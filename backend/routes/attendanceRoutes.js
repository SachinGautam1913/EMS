import express from 'express';
import { body } from 'express-validator';
import {
  clockIn,
  clockOut,
  getAttendance
} from '../controllers/attendanceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Clock in
router.post('/check-in', [
  body('date').optional().isISO8601().withMessage('Invalid date format'),
  body('employeeId').optional().isMongoId().withMessage('Invalid employee ID')
], clockIn);

// Clock out
router.post('/check-out', [
  body('date').optional().isISO8601().withMessage('Invalid date format'),
  body('employeeId').optional().isMongoId().withMessage('Invalid employee ID')
], clockOut);

// Get attendance records
// Query params: employeeId, from, to, page, limit
router.get('/', getAttendance);

export default router;









