import express from 'express';
import { body } from 'express-validator';
import {
  getPerformanceReviews,
  getPerformanceReview,
  getPerformanceByEmployee,
  createPerformanceReview,
  updatePerformanceReview,
  deletePerformanceReview,
  setGoals
} from '../controllers/performanceController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Get all performance reviews
router.get('/', getPerformanceReviews);

// Get performance by employee ID
router.get('/employee/:employeeId', getPerformanceByEmployee);

// Get single performance review
router.get('/:id', getPerformanceReview);

// Set goals/KPIs (Admin, HR)
router.post('/goals', authorize('admin', 'hr'), [
  body('employeeId').isMongoId().withMessage('Invalid employee ID'),
  body('goals').isArray().withMessage('Goals must be an array'),
  body('reviewPeriod').optional().trim()
], setGoals);

// Create performance review (Admin, HR)
router.post('/', authorize('admin', 'hr'), [
  body('employeeId').isMongoId().withMessage('Invalid employee ID'),
  body('reviewPeriod').trim().notEmpty().withMessage('Review period is required'),
  body('rating').isFloat({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('feedback').trim().notEmpty().withMessage('Feedback is required')
], createPerformanceReview);

// Update performance review (Admin, HR)
router.put('/:id', authorize('admin', 'hr'), updatePerformanceReview);

// Delete performance review (Admin only)
router.delete('/:id', authorize('admin'), deletePerformanceReview);

export default router;









