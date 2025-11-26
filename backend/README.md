# PrismHR - Backend API

A complete, production-ready RESTful API backend for **PrismHR** (Full Stack Employee Management System) built with Node.js, Express.js, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control (Admin, HR, Employee)
- **User Management**: Admin can manage users and roles
- **Employee Management**: Complete CRUD operations for employee records with file uploads
- **Attendance Management**: Clock in/out tracking with detailed records
- **Leave Management**: Leave application, approval workflow, and balance tracking
- **Payroll Management**: Salary structure definition, payslip generation, and history
- **Performance Reviews**: Employee performance tracking, goals/KPIs management
- **Shift Management**: Shift creation, assignment, and scheduling
- **Settings Management**: Departments, holidays, leave types configuration
- **Input Validation**: Express-validator for comprehensive request validation
- **Error Handling**: Centralized error handling middleware
- **File Uploads**: Support for avatar and document uploads (local storage, ready for S3/Cloudinary)
- **Email Service**: Scaffold for nodemailer (commented, ready for production)

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

## 🛠️ Installation

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   - Copy `.env.example` to `.env` (if not exists, create one)
   - Update the `.env` file with your configuration:
   ```env
   PORT=5000
   MONGO_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/prismhr?retryWrites=true&w=majority"
   JWT_SECRET=change_this_to_a_strong_secret
   EMAIL_HOST=smtp.example.com
   EMAIL_PORT=587
   EMAIL_USER=you@example.com
   EMAIL_PASS=yourpassword
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
   ```

4. **Seed initial data** (recommended):
   ```bash
   npm run seed
   ```
   This creates:
   - 1 Admin user
   - 1 HR user
   - 1 Sample employee
   - Sample departments, leave types, holidays, and shifts

## 🏃 Running the Application

### Development Mode (with nodemon):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on **PORT 5000** (or the port specified in `.env`).

You should see:
```
✅ MongoDB connected successfully: ...
✅ Server running on port 5000
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user (Admin can create users)
- `POST /api/auth/login` - Login user (returns JWT token)
- `GET /api/auth/me` - Get current user (Protected)

### Users (Admin Only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id/role` - Update user role
- `PUT /api/users/:id/status` - Update user status (activate/deactivate)
- `DELETE /api/users/:id` - Delete user

### Employees
- `GET /api/employees` - Get all employees with pagination, search, filters (Admin, HR)
- `GET /api/employees/:id` - Get single employee profile
- `POST /api/employees` - Create employee (Admin, HR)
- `PUT /api/employees/:id` - Update employee (Admin, HR)
- `DELETE /api/employees/:id` - Delete employee (Admin)
- `POST /api/employees/:id/avatar` - Upload avatar (multipart/form-data)
- `POST /api/employees/:id/documents` - Upload document (multipart/form-data)

### Attendance
- `POST /api/attendance/check-in` - Mark check-in (employee)
- `POST /api/attendance/check-out` - Mark check-out (employee)
- `GET /api/attendance?employeeId=&from=&to=` - Fetch attendance records

### Leaves
- `POST /api/leaves` - Apply for leave (employee)
- `GET /api/leaves` - List leaves (hr/admin sees all; employee sees own)
- `GET /api/leaves/:id` - Get single leave request
- `PUT /api/leaves/:id/approve` - Approve/reject leave (hr/admin)
- `GET /api/leaves/balance/:employeeId` - Get leave balance for employee
- `PUT /api/leaves/:id` - Update leave request
- `DELETE /api/leaves/:id` - Delete leave request

### Payroll
- `GET /api/payroll` - Get payroll records (Admin, HR, Employee - own only)
- `GET /api/payroll/employee/:employeeId` - Get salary history for employee
- `GET /api/payroll/:id` - Get single payroll record
- `POST /api/payroll/structure` - Define salary structure (Admin, HR)
- `POST /api/payroll/generate` - Generate payslip for month (Admin, HR)
- `POST /api/payroll/calculate` - Calculate salary components (Admin)
- `POST /api/payroll` - Create payroll record (Admin)
- `PUT /api/payroll/:id/status` - Update payroll status (Admin)

### Performance
- `GET /api/performance` - Get all performance reviews
- `GET /api/performance/employee/:employeeId` - Get employee reviews & ratings
- `GET /api/performance/:id` - Get single performance review
- `POST /api/performance` - Add review (hr/admin)
- `POST /api/performance/goals` - Set goals/KPIs (hr/admin)
- `PUT /api/performance/:id` - Update review (Admin, HR)
- `DELETE /api/performance/:id` - Delete review (Admin)

### Shifts
- `GET /api/shifts` - Get all shifts
- `GET /api/shifts/:id` - Get single shift
- `GET /api/shifts/:id/employees` - Get employees by shift (Admin, HR)
- `POST /api/shifts` - Create shift (Admin, HR)
- `PUT /api/shifts/:id` - Update shift (Admin, HR)
- `DELETE /api/shifts/:id` - Delete shift (Admin)
- `POST /api/shifts/:id/assign` - Assign shift to employee (Admin, HR)

### Settings
- **Departments**: `GET/POST/PUT/DELETE /api/settings/departments`
- **Holidays**: `GET/POST/DELETE /api/settings/holidays`
- **Leave Types**: `GET/POST/PUT/DELETE /api/settings/leave-types`

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

### Default Login Credentials (after seeding):

**Admin:**
- Email: `admin@company.com`
- Password: `admin123`

**HR Manager:**
- Email: `hr@company.com`
- Password: `hr123456`

**Employee:**
- Email: `employee@company.com`
- Password: `emp123456`

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── userController.js     # User management
│   ├── employeeController.js # Employee CRUD
│   ├── attendanceController.js # Attendance tracking
│   ├── leaveController.js    # Leave management
│   ├── payrollController.js  # Payroll management
│   ├── performanceController.js # Performance reviews
│   ├── shiftController.js    # Shift management
│   └── settingsController.js # Settings management
├── middleware/
│   ├── authMiddleware.js     # JWT authentication
│   ├── roleMiddleware.js     # Role-based authorization
│   └── errorMiddleware.js    # Error handling
├── models/
│   ├── User.js              # User model
│   ├── Employee.js          # Employee model
│   ├── Attendance.js        # Attendance model
│   ├── Leave.js             # Leave model
│   ├── Payroll.js           # Payroll model
│   ├── Performance.js       # Performance model
│   ├── Shift.js             # Shift model
│   └── Settings.js          # Settings models
├── routes/
│   ├── authRoutes.js        # Auth routes
│   ├── userRoutes.js        # User routes
│   ├── employeeRoutes.js    # Employee routes
│   ├── attendanceRoutes.js  # Attendance routes
│   ├── leaveRoutes.js       # Leave routes
│   ├── payrollRoutes.js     # Payroll routes
│   ├── performanceRoutes.js # Performance routes
│   ├── shiftRoutes.js       # Shift routes
│   └── settingsRoutes.js    # Settings routes
├── services/
│   ├── mailService.js       # Email service (nodemailer scaffold)
│   └── storageService.js    # File storage (local/S3/Cloudinary)
├── utils/
│   └── generateToken.js     # JWT token generation
├── seed/
│   └── seedData.js          # Seed script
├── uploads/
│   ├── avatars/             # Avatar uploads
│   └── documents/           # Document uploads
├── .env.example             # Environment variables template
├── server.js                 # Entry point
└── package.json              # Dependencies
```

## 🔒 Role-Based Access Control

- **Admin**: Full access to all endpoints, can manage users, roles, and system settings
- **HR Manager**: Access to employee management, attendance, leaves, payroll (view), performance reviews, shifts
- **Employee**: Access to own data only (attendance, leaves, payroll, performance)

## 📝 Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGO_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/prismhr?retryWrites=true&w=majority"
JWT_SECRET=change_this_to_a_strong_secret
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=you@example.com
EMAIL_PASS=yourpassword
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

## 🧪 Testing the API

### Using cURL

**1. Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@company.com","password":"admin123"}'
```

**2. Create Employee (with token):**
```bash
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "employeeId": "EMP002",
    "name": "Jane Doe",
    "email": "jane@company.com",
    "phone": "+1 234-567-8903",
    "department": "Engineering",
    "designation": "Senior Developer",
    "salary": 80000,
    "joiningDate": "2024-01-15"
  }'
```

**3. Upload Avatar (multipart/form-data):**
```bash
curl -X POST http://localhost:5000/api/employees/EMPLOYEE_ID/avatar \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "avatar=@/path/to/image.jpg"
```

### Using Postman

1. Import the collection (see Postman Collection section below)
2. Set environment variables:
   - `base_url`: `http://localhost:5000`
   - `token`: (set after login)

## 📦 Postman Collection

Here's a sample Postman collection structure:

```json
{
  "info": {
    "name": "PrismHR API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\"email\":\"admin@company.com\",\"password\":\"admin123\"}"
            },
            "url": {
              "raw": "{{base_url}}/api/auth/login",
              "host": ["{{base_url}}"],
              "path": ["api", "auth", "login"]
            }
          }
        }
      ]
    }
  ]
}
```

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Verify your MongoDB connection string in `.env`
- Ensure your IP is whitelisted in MongoDB Atlas
- Check if the password is correctly URL-encoded
- Verify database name in connection string

**Port Already in Use:**
- Change PORT in `.env` file
- Or kill the process using port 5000: `lsof -ti:5000 | xargs kill -9` (Mac/Linux)

**JWT Token Errors:**
- Ensure JWT_SECRET is set in `.env`
- Check token expiration (default: 30 days)
- Verify token is sent in Authorization header: `Bearer <token>`

**File Upload Errors:**
- Ensure `uploads/avatars` and `uploads/documents` directories exist
- Check file size limits (default: 5MB)
- Verify multer configuration

## 📦 Dependencies

### Production
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing
- **express-validator**: Input validation
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables
- **multer**: File uploads

### Development
- **nodemon**: Development auto-reload

## 🔧 Production Deployment

### 1. Environment Setup
- Set `NODE_ENV=production` in `.env`
- Use strong `JWT_SECRET`
- Configure MongoDB Atlas with proper security
- Set up email service (uncomment and configure `services/mailService.js`)

### 2. File Storage
- For production, switch to cloud storage:
  - **AWS S3**: Uncomment S3 code in `services/storageService.js` and configure
  - **Cloudinary**: Uncomment Cloudinary code in `services/storageService.js` and configure
- Update environment variables accordingly

### 3. Email Service
- Uncomment nodemailer code in `services/mailService.js`
- Configure SMTP credentials in `.env`
- Test email sending

### 4. Security
- Enable HTTPS
- Set up rate limiting
- Configure CORS properly for production domain
- Use environment variables for all secrets
- Regularly update dependencies

## 🚧 Future Enhancements

- [ ] PDF generation for payslips
- [ ] Advanced reporting and analytics
- [ ] Real-time notifications (WebSocket)
- [ ] Rate limiting middleware
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Unit and integration tests
- [ ] Audit trail logging
- [ ] Backup and restore functionality

## 📄 License

This project is open source and available for educational purposes.

---

**Built with ❤️ for PrismHR - Employee Management System**
