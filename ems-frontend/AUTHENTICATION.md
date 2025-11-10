# Authentication & Authorization Guide

## Overview

The Employee Management System now includes complete authentication and authorization functionality with role-based access control.

## Features

### Authentication
- **Login Page**: User authentication with role selection
- **Signup Page**: New user registration with role selection
- **Logout**: Secure logout functionality
- **Session Persistence**: Authentication state saved in localStorage
- **Auto-redirect**: Automatic redirect to login if not authenticated

### Roles

1. **Administrator (admin)**
   - Full system access
   - Can manage all modules
   - Access to settings and roles management

2. **HR Manager (hr)**
   - Employee management
   - Attendance and leave management
   - Payroll access
   - Reports access
   - Settings access

3. **Employee (employee)**
   - View own profile
   - Mark attendance
   - Apply for leave
   - View own payslip
   - View own performance

## Implementation Details

### Authentication Flow

1. **Login Process**:
   - User selects role (Admin, HR Manager, or Employee)
   - Enters email and password
   - System validates credentials (currently mocked)
   - On success, user is authenticated and redirected to dashboard
   - Authentication token and user data stored in localStorage

2. **Signup Process**:
   - User selects role
   - Fills registration form
   - System creates new account (currently mocked)
   - On success, user is automatically logged in
   - New employee users are added to employees list

3. **Logout Process**:
   - User clicks logout
   - Authentication state cleared
   - localStorage cleared
   - Redirected to login page

### Protected Routes

Routes are protected based on:
- **Authentication**: User must be logged in
- **Role**: User must have required role

Example:
```jsx
<Route
  path="/payroll"
  element={
    <ProtectedRoute allowedRoles={['admin', 'hr']}>
      <Payroll />
    </ProtectedRoute>
  }
/>
```

### Route Protection Levels

1. **Public Routes**: `/login`, `/signup`
2. **Authenticated Routes**: All routes require authentication
3. **Role-Specific Routes**: 
   - Admin only: `/roles`, `/settings` (admin access)
   - Admin & HR: `/payroll`, `/shifts`, `/reports`, `/settings`
   - All roles: `/dashboard`, `/employees`, `/attendance`, `/performance`, `/communication`

## Mock Authentication

Currently, the system uses mock authentication for demonstration:

### Login
- Select any role
- Enter any email
- Enter any password (minimum 6 characters)
- System will authenticate based on selected role

### Signup
- Fill all required fields
- Select role
- System will create account and log you in

## Backend Integration

To connect to a real backend:

1. **Update Login** (`src/pages/Login.jsx`):
   ```javascript
   // Replace mock code with:
   const response = await authService.login(formData);
   login(response.data.user, response.data.token);
   ```

2. **Update Signup** (`src/pages/Signup.jsx`):
   ```javascript
   // Replace mock code with:
   const response = await authService.register(formData);
   register(response.data.user, response.data.token);
   ```

3. **Create Auth Service** (`src/services/auth.js`):
   ```javascript
   import axiosClient from '../api/axiosClient';
   
   export const authService = {
     login: async (credentials) => {
       return await axiosClient.post('/auth/login', credentials);
     },
     register: async (userData) => {
       return await axiosClient.post('/auth/register', userData);
     },
     logout: async () => {
       return await axiosClient.post('/auth/logout');
     },
   };
   ```

4. **Update AppContext** (`src/context/AppContext.jsx`):
   - Replace mock login/register with actual API calls
   - Handle token refresh if needed
   - Add token expiration handling

## Security Considerations

1. **Token Storage**: Currently using localStorage. Consider httpOnly cookies for production
2. **Token Expiration**: Implement token refresh mechanism
3. **Password Security**: Ensure backend hashes passwords
4. **HTTPS**: Always use HTTPS in production
5. **CORS**: Configure CORS properly on backend
6. **Rate Limiting**: Implement rate limiting on login endpoints

## Testing Authentication

1. **Test Login**:
   - Navigate to `/login`
   - Select a role
   - Enter credentials
   - Should redirect to dashboard

2. **Test Signup**:
   - Navigate to `/signup`
   - Fill form and select role
   - Submit
   - Should create account and log in

3. **Test Logout**:
   - Click logout in topbar
   - Should clear session and redirect to login

4. **Test Protected Routes**:
   - Logout
   - Try accessing `/payroll` directly
   - Should redirect to login

5. **Test Role-Based Access**:
   - Login as employee
   - Try accessing `/roles` (admin only)
   - Should redirect to dashboard

## Troubleshooting

**Issue**: Can't login
- Check browser console for errors
- Verify localStorage is enabled
- Check if user is already authenticated

**Issue**: Redirected to login after page refresh
- Check if token is being saved to localStorage
- Verify AppContext is loading auth state correctly

**Issue**: Can access restricted routes
- Verify ProtectedRoute is wrapping routes correctly
- Check role matching logic

---

**Note**: This is a mock implementation for development. Replace with actual backend authentication before production deployment.

