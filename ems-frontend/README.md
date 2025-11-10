# Employee Management System - Frontend

A modern, responsive frontend application for managing employees, attendance, payroll, performance, and more. Built with React 18+, Tailwind CSS, and React Router DOM.

## 🚀 Features

### Core Modules
- **Employee Management**: Complete CRUD operations for employee records
- **Attendance & Leave**: Clock in/out, leave requests, and attendance tracking
- **Payroll Management**: Salary calculation, payslip generation, and payroll history
- **Performance Reviews**: Track employee performance, goals, and feedback
- **Shifts & Scheduling**: Define shifts and manage employee schedules
- **Communication**: Announcements and internal messaging system
- **Reports & Analytics**: Generate reports for attendance, payroll, leaves, and departments
- **Roles & Access Control**: Role-based access control (Admin, HR, Employee)
- **Settings**: Manage departments, designations, holidays, and system configurations

### UI Features
- Modern, responsive design with Tailwind CSS
- Sidebar navigation with active state indicators
- Topbar with search, notifications, and profile menu
- Reusable components (Button, Card, Modal, Table, Input, Avatar, etc.)
- Toast notifications for user feedback
- Confirmation modals for destructive actions
- Form validation and error handling
- Avatar uploader with preview
- File upload UI for documents

## 📋 Prerequisites

- Node.js 16+ and npm/yarn
- Modern web browser

## 🛠️ Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd ems-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and update `VITE_API_BASE_URL` with your backend API URL.

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
The application will start on `http://localhost:5173` (or the next available port).

### Build for Production
```bash
npm run build
```
The production build will be in the `dist` directory.

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
ems-frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Avatar.jsx
│   │   ├── AvatarUploader.jsx
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── ConfirmModal.jsx
│   │   ├── Input.jsx
│   │   ├── Layout.jsx
│   │   ├── Modal.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Table.jsx
│   │   ├── Toast.jsx
│   │   └── Topbar.jsx
│   ├── pages/               # Page components
│   │   ├── Attendance.jsx
│   │   ├── Communication.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EmployeeProfile.jsx
│   │   ├── Employees.jsx
│   │   ├── Payroll.jsx
│   │   ├── Performance.jsx
│   │   ├── Reports.jsx
│   │   ├── Roles.jsx
│   │   ├── Settings.jsx
│   │   └── Shifts.jsx
│   ├── context/             # Context API for state management
│   │   └── AppContext.jsx
│   ├── data/                # Mock data
│   │   └── mockData.js
│   ├── api/                 # API client configuration
│   │   └── axiosClient.js
│   ├── services/            # API service stubs
│   │   └── employees.js
│   ├── App.jsx              # Main app component with routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles and Tailwind imports
├── public/                  # Static assets
├── .env.example            # Environment variables template
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── vite.config.js          # Vite configuration
```

## 🔌 Backend Integration

### Current State
The application currently uses **mock data** stored in Context API. All data operations are performed locally.

### Connecting to Backend

1. **Update API Base URL**:
   - Set `VITE_API_BASE_URL` in your `.env` file to point to your backend API.

2. **Replace Mock Functions**:
   - Open `src/context/AppContext.jsx`
   - Find action creators (e.g., `addEmployee`, `updateEmployee`)
   - Replace mock implementations with actual API calls
   - Example:
     ```javascript
     addEmployee: async (employee) => {
       // Replace this:
       // dispatch({ type: ActionTypes.ADD_EMPLOYEE, payload: employee });
       
       // With this:
       const response = await employeeService.create(employee);
       dispatch({ type: ActionTypes.ADD_EMPLOYEE, payload: response.data });
     }
     ```

3. **Update Service Files**:
   - Open service files in `src/services/`
   - Uncomment the actual API calls
   - Remove or comment out mock implementations

4. **Authentication**:
   - Update `src/api/axiosClient.js` to handle authentication tokens
   - Implement login/logout functionality
   - Update `ProtectedRoute` component to check authentication status

### API Endpoints Expected

The application expects the following API structure (adjust as needed):

```
GET    /api/employees          - Get all employees
GET    /api/employees/:id      - Get employee by ID
POST   /api/employees          - Create employee
PUT    /api/employees/:id      - Update employee
DELETE /api/employees/:id      - Delete employee

GET    /api/attendance         - Get attendance records
POST   /api/attendance         - Mark attendance

GET    /api/leaves             - Get leave requests
POST   /api/leaves             - Apply for leave
PUT    /api/leaves/:id/status  - Update leave status

GET    /api/payroll            - Get payroll records
POST   /api/payroll            - Create payroll entry

... (and so on for other modules)
```

## 🎨 Styling

The project uses **Tailwind CSS** for styling. Custom utilities and components are defined in `src/index.css`.

### Custom Classes
- `.btn` - Base button styles
- `.btn-primary`, `.btn-secondary`, `.btn-danger` - Button variants
- `.input` - Input field styles
- `.card` - Card container styles

### Theme Colors
Primary color palette is defined in `tailwind.config.js`. You can customize colors there.

## 🔐 Role-Based Access Control

The application includes stubbed role-based access control:

- **Admin**: Full system access
- **HR**: Employee and attendance management
- **Employee**: Basic access (own profile, attendance, leaves)

To implement:
1. Update `ProtectedRoute` component with actual authentication checks
2. Add role checks in action creators
3. Conditionally render UI elements based on user role

## 📊 State Management

Currently using **Context API** for state management. To migrate to Redux:

1. Install Redux Toolkit:
   ```bash
   npm install @reduxjs/toolkit react-redux
   ```

2. Create Redux store and slices
3. Replace `AppContext` with Redux store
4. Update components to use `useSelector` and `useDispatch`

## 🧪 Testing

Testing setup is not included. To add testing:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

## 📦 Dependencies

### Core
- `react` ^19.1.1
- `react-dom` ^19.1.1
- `react-router-dom` ^6.28.0

### Utilities
- `axios` ^1.7.7 - HTTP client
- `lucide-react` ^0.445.0 - Icons

### Development
- `vite` ^7.1.7 - Build tool
- `tailwindcss` ^3.4.18 - CSS framework
- `autoprefixer` ^10.4.21 - CSS post-processor
- `postcss` ^8.5.6 - CSS transformer

## 🚧 Known Limitations & TODOs

- [ ] Implement actual authentication and authorization
- [ ] Connect to backend API (currently using mock data)
- [ ] Add file upload functionality for documents and avatars
- [ ] Implement CSV/PDF export for reports
- [ ] Add chart visualizations (integrate Chart.js or Recharts)
- [ ] Add unit and integration tests
- [ ] Implement real-time notifications (WebSocket)
- [ ] Add pagination for large datasets
- [ ] Implement advanced filtering and search
- [ ] Add data validation on forms
- [ ] Implement image cropping for avatar upload

## 📝 Notes

- All data is currently stored in browser localStorage (for persistence during development)
- Mock data is seeded on app initialization
- Toast notifications auto-dismiss after 3 seconds
- Modals can be closed with Escape key
- Forms include basic HTML5 validation

## 🤝 Contributing

This is a portfolio project. Feel free to fork and modify as needed.

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Development Tips

1. **Hot Reload**: Vite provides instant HMR (Hot Module Replacement)
2. **Tailwind IntelliSense**: Install the Tailwind CSS IntelliSense extension for VS Code
3. **Component Structure**: Follow the existing component patterns for consistency
4. **API Integration**: Start by updating one module at a time (e.g., employees first)
5. **State Updates**: Always use the action creators in Context, don't mutate state directly

## 🐛 Troubleshooting

**Issue**: Tailwind styles not applying
- **Solution**: Ensure `tailwind.config.js` includes correct content paths

**Issue**: Routes not working
- **Solution**: Check that all routes are wrapped in `<Router>` and `<Routes>`

**Issue**: Context not available
- **Solution**: Ensure components are wrapped in `<AppProvider>`

**Issue**: Icons not showing
- **Solution**: Ensure `lucide-react` is installed: `npm install lucide-react`

---

**Built with ❤️ for Employee Management**
