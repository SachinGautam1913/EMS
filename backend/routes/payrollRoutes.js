import express from 'express';
import { body } from 'express-validator';
import {
  getPayroll,
  getPayrollById,
  getPayrollByEmployee,
  createPayroll,
  calculateSalaryEndpoint,
  updatePayrollStatus,
  defineSalaryStructure,
  generatePayslip
} from '../controllers/payrollController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Get all payroll records (Admin, HR, Employee - own only)
router.get('/', getPayroll);

// Get payroll by employee ID (salary history)
router.get('/employee/:employeeId', getPayrollByEmployee);

// Get single payroll record
router.get('/:id', getPayrollById);

// Define salary structure (Admin, HR)
router.post('/structure', authorize('admin', 'hr'), [
  body('employeeId').isMongoId().withMessage('Invalid employee ID'),
  body('basicSalary').isNumeric().withMessage('Basic salary must be a number'),
  body('allowances').optional().isNumeric().withMessage('Allowances must be a number'),
  body('deductions').optional().isNumeric().withMessage('Deductions must be a number')
], defineSalaryStructure);

// Generate payslip for month (Admin, HR)
router.post('/generate', authorize('admin', 'hr'), [
  body('employeeId').isMongoId().withMessage('Invalid employee ID'),
  body('month').matches(/^\d{4}-\d{2}$/).withMessage('Month must be in YYYY-MM format'),
  body('allowances').optional().isNumeric().withMessage('Allowances must be a number'),
  body('deductions').optional().isNumeric().withMessage('Deductions must be a number'),
  body('bonus').optional().isNumeric().withMessage('Bonus must be a number'),
  body('overtime').optional().isNumeric().withMessage('Overtime must be a number')
], generatePayslip);

// Calculate salary (Admin only)
router.post('/calculate', authorize('admin'), [
  body('basicSalary').isNumeric().withMessage('Basic salary must be a number'),
  body('allowances').optional().isNumeric().withMessage('Allowances must be a number'),
  body('deductions').optional().isNumeric().withMessage('Deductions must be a number'),
  body('bonus').optional().isNumeric().withMessage('Bonus must be a number'),
  body('overtime').optional().isNumeric().withMessage('Overtime must be a number')
], calculateSalaryEndpoint);

// Create payroll (Admin only)
router.post('/', authorize('admin'), [
  body('employeeId').isMongoId().withMessage('Invalid employee ID'),
  body('month').matches(/^\d{4}-\d{2}$/).withMessage('Month must be in YYYY-MM format'),
  body('basicSalary').isNumeric().withMessage('Basic salary must be a number')
], createPayroll);

// Update payroll status (Admin only)
router.put('/:id/status', authorize('admin'), [
  body('status').isIn(['pending', 'paid', 'cancelled']).withMessage('Invalid status')
], updatePayrollStatus);

export default router;









