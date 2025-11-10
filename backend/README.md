# Employee Management System - Backend API

A complete RESTful API backend for the Employee Management System built with Node.js, Express.js, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control (Admin, HR, Employee)
- **Employee Management**: CRUD operations for employee records
- **Attendance & Leave**: Clock in/out, leave requests, and approval system
- **Payroll Management**: Salary calculation, payslip generation
- **Performance Reviews**: Track employee performance and goals
- **Settings Management**: Departments, holidays, leave types, shifts
- **Input Validation**: Express-validator for request validation
- **Error Handling**: Centralized error handling middleware
- **File Uploads**: Support for avatar and document uploads

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository** and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   - Update the `.env` file with your MongoDB connection string
   - Replace `<db_password>` in MONGO_URI with your actual MongoDB password
   - Update JWT_SECRET if needed

4. **Create uploads directory** (for file uploads):
   ```bash
   mkdir -p uploads/avatars uploads/documents
   ```

5. **Seed initial data** (optional):
   ```bash
   npm run seed
   ```

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
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Employees
- `GET /api/employees` - Get all employees (Admin, HR)
- `GET /api/employees/:id` - Get single employee
- `POST /api/employees` - Create employee (Admin, HR)
- `PUT /api/employees/:id` - Update employee (Admin, HR)
- `DELETE /api/employees/:id` - Delete employee (Admin)
- `POST /api/employees/:id/avatar` - Upload avatar (Admin, HR)
- `POST /api/employees/:id/documents` - Upload document (Admin, HR)

### Attendance
- `POST /api/attendance/clock-in` - Clock in
- `POST /api/attendance/clock-out` - Clock out
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance/leaves` - Apply for leave
- `GET /api/attendance/leaves` - Get leave requests
- `PUT /api/attendance/leaves/:id/status` - Update leave status (Admin, HR)

### Payroll
- `GET /api/payroll` - Get payroll records
- `GET /api/payroll/:id` - Get single payroll record
- `POST /api/payroll` - Create payroll (Admin)
- `POST /api/payroll/calculate` - Calculate salary (Admin)
- `PUT /api/payroll/:id/status` - Update payroll status (Admin)

### Performance
- `GET /api/performance` - Get performance reviews
- `GET /api/performance/:id` - Get single review
- `POST /api/performance` - Create review (Admin, HR)
- `PUT /api/performance/:id` - Update review (Admin, HR)
- `DELETE /api/performance/:id` - Delete review (Admin)

### Settings
- **Departments**: `GET/POST/PUT/DELETE /api/settings/departments`
- **Holidays**: `GET/POST/DELETE /api/settings/holidays`
- **Leave Types**: `GET/POST/PUT/DELETE /api/settings/leave-types`
- **Shifts**: `GET/POST/PUT/DELETE /api/settings/shifts`

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
│   ├── employeeController.js # Employee CRUD
│   ├── attendanceController.js # Attendance & Leave
│   ├── payrollController.js  # Payroll management
│   ├── performanceController.js # Performance reviews
│   └── settingsController.js # Settings management
├── middleware/
│   ├── authMiddleware.js     # JWT authentication
│   └── roleMiddleware.js     # Role-based authorization
├── models/
│   ├── User.js              # User model
│   ├── Employee.js          # Employee model
│   ├── Attendance.js        # Attendance model
│   ├── Leave.js             # Leave model
│   ├── Payroll.js           # Payroll model
│   ├── Performance.js       # Performance model
│   └── Settings.js          # Settings models
├── routes/
│   ├── authRoutes.js        # Auth routes
│   ├── employeeRoutes.js    # Employee routes
│   ├── attendanceRoutes.js  # Attendance routes
│   ├── payrollRoutes.js     # Payroll routes
│   ├── performanceRoutes.js # Performance routes
│   └── settingsRoutes.js    # Settings routes
├── utils/
│   ├── errorHandler.js      # Error handling
│   └── seedData.js          # Seed script
├── .env                     # Environment variables
├── server.js                # Entry point
└── package.json             # Dependencies
```

## 🔒 Role-Based Access Control

- **Admin**: Full access to all endpoints
- **HR Manager**: Access to employee management, attendance, leaves, payroll (view), reports
- **Employee**: Access to own data only (attendance, leaves, payroll, performance)

## 📝 Environment Variables

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=EMS
JWT_SECRET=your-secret-key
```

## 🧪 Testing the API

You can test the API using:
- **Postman**
- **Thunder Client** (VS Code extension)
- **curl** commands
- **Frontend application** (http://localhost:5173)

### Example API Request:

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@company.com","password":"admin123"}'

# Get employees (with token)
curl -X GET http://localhost:5000/api/employees \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Verify your MongoDB connection string in `.env`
- Ensure your IP is whitelisted in MongoDB Atlas
- Check if the password is correctly set

**Port Already in Use:**
- Change PORT in `.env` file
- Or kill the process using port 5000

**JWT Token Errors:**
- Ensure JWT_SECRET is set in `.env`
- Check token expiration (default: 30 days)

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing
- **express-validator**: Input validation
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables
- **multer**: File uploads
- **nodemon**: Development auto-reload

## 🚧 Future Enhancements

- [ ] Email notifications
- [ ] PDF generation for payslips
- [ ] Advanced reporting and analytics
- [ ] Real-time notifications (WebSocket)
- [ ] File storage integration (AWS S3, Cloudinary)
- [ ] Rate limiting
- [ ] API documentation (Swagger)

## 📄 License

This project is open source and available for educational purposes.

---

**Built with ❤️ for Employee Management**









