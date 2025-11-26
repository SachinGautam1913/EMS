import express from 'express';
import { body } from 'express-validator';
import {
  // Departments
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  // Holidays
  getHolidays,
  createHoliday,
  deleteHoliday,
  // Leave Types
  getLeaveTypes,
  createLeaveType,
  updateLeaveType,
  deleteLeaveType
} from '../controllers/settingsController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// ==================== Departments ====================
router.get('/departments', getDepartments);
router.post('/departments', authorize('admin', 'hr'), [
  body('name').trim().notEmpty().withMessage('Department name is required')
], createDepartment);
router.put('/departments/:id', authorize('admin', 'hr'), updateDepartment);
router.delete('/departments/:id', authorize('admin', 'hr'), deleteDepartment);

// ==================== Holidays ====================
router.get('/holidays', getHolidays);
router.post('/holidays', authorize('admin', 'hr'), [
  body('name').trim().notEmpty().withMessage('Holiday name is required'),
  body('date').isISO8601().withMessage('Invalid date format'),
  body('type').optional().isIn(['National', 'Regional', 'Company']).withMessage('Invalid holiday type')
], createHoliday);
router.delete('/holidays/:id', authorize('admin', 'hr'), deleteHoliday);

// ==================== Leave Types ====================
router.get('/leave-types', getLeaveTypes);
router.post('/leave-types', authorize('admin', 'hr'), [
  body('name').trim().notEmpty().withMessage('Leave type name is required'),
  body('days').isInt({ min: 0 }).withMessage('Days must be a positive number')
], createLeaveType);
router.put('/leave-types/:id', authorize('admin', 'hr'), updateLeaveType);
router.delete('/leave-types/:id', authorize('admin', 'hr'), deleteLeaveType);

export default router;









