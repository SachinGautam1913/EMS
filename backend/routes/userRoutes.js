import express from 'express';
import { body } from 'express-validator';
import {
  getUsers,
  getUser,
  updateUserRole,
  updateUserStatus,
  deleteUser
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

// Get all users
router.get('/', getUsers);

// Get single user
router.get('/:id', getUser);

// Update user role
router.put('/:id/role', [
  body('role').isIn(['admin', 'hr', 'employee']).withMessage('Invalid role')
], updateUserRole);

// Update user status
router.put('/:id/status', [
  body('isActive').isBoolean().withMessage('isActive must be a boolean')
], updateUserStatus);

// Delete user
router.delete('/:id', deleteUser);

export default router;

