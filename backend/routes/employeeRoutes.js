import express from 'express';
import { body } from 'express-validator';
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  uploadAvatar,
  uploadDocument
} from '../controllers/employeeController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import multer from 'multer';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Validation rules
const employeeValidation = [
  body('employeeId').trim().notEmpty().withMessage('Employee ID is required'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('department').trim().notEmpty().withMessage('Department is required'),
  body('designation').trim().notEmpty().withMessage('Designation is required'),
  body('salary').isNumeric().withMessage('Salary must be a number')
];

// All routes require authentication
router.use(protect);

// Get all employees (Admin, HR)
router.get('/', authorize('admin', 'hr'), getEmployees);

// Get single employee
router.get('/:id', getEmployee);

// Create employee (Admin, HR)
router.post('/', authorize('admin', 'hr'), employeeValidation, createEmployee);

// Update employee (Admin, HR)
router.put('/:id', authorize('admin', 'hr'), employeeValidation, updateEmployee);

// Delete employee (Admin only)
router.delete('/:id', authorize('admin'), deleteEmployee);

// Upload avatar (Admin, HR)
router.post('/:id/avatar', authorize('admin', 'hr'), upload.single('avatar'), uploadAvatar);

// Upload document (Admin, HR)
router.post('/:id/documents', authorize('admin', 'hr'), upload.single('document'), uploadDocument);

export default router;









