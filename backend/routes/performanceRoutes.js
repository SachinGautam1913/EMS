import express from 'express';
import { body } from 'express-validator';
import {
  getPerformanceReviews,
  getPerformanceReview,
  createPerformanceReview,
  updatePerformanceReview,
  deletePerformanceReview
} from '../controllers/performanceController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Get all performance reviews
router.get('/', getPerformanceReviews);

// Get single performance review
router.get('/:id', getPerformanceReview);

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









