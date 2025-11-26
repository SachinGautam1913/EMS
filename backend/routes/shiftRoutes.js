import express from 'express';
import { body } from 'express-validator';
import {
  getShifts,
  getShift,
  createShift,
  updateShift,
  deleteShift,
  assignShift,
  getShiftEmployees
} from '../controllers/shiftController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Get all shifts
router.get('/', getShifts);

// Get single shift
router.get('/:id', getShift);

// Get employees by shift
router.get('/:id/employees', authorize('admin', 'hr'), getShiftEmployees);

// Create shift (Admin, HR)
router.post('/', authorize('admin', 'hr'), [
  body('name').trim().notEmpty().withMessage('Shift name is required'),
  body('startTime').trim().notEmpty().withMessage('Start time is required'),
  body('endTime').trim().notEmpty().withMessage('End time is required'),
  body('breakDuration').optional().isInt({ min: 0 }).withMessage('Break duration must be a positive number')
], createShift);

// Update shift (Admin, HR)
router.put('/:id', authorize('admin', 'hr'), updateShift);

// Delete shift (Admin only)
router.delete('/:id', authorize('admin'), deleteShift);

// Assign shift to employee (Admin, HR)
router.post('/:id/assign', authorize('admin', 'hr'), [
  body('employeeId').isMongoId().withMessage('Invalid employee ID')
], assignShift);

export default router;

