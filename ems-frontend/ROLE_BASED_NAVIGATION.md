# Role-Based Navigation System

## Overview

The Employee Management System now implements a comprehensive role-based navigation system that dynamically displays menu options in the sidebar based on the logged-in user's role.

## Role Definitions

### 👔 HR Manager
**Access Level**: Limited Management Access

**Menu Items**:
- Dashboard
- Manage Employees
- Manage Attendance
- Manage Leaves
- View Payroll
- View Reports

**Capabilities**:
- Can manage employee records
- Can view and manage attendance
- Can approve/reject leave requests
- Can view payroll information (read-only)
- Can view reports and analytics

### 🧠 Administrator
**Access Level**: Full System Access

**Menu Items**:
- Dashboard
- Employee Management
- Attendance & Leave
- Payroll (full access)
- Performance
- Shifts & Schedule
- Communication
- Reports & Analytics
- Roles & Access Control
- System Settings

**Capabilities**:
- Full access to all system modules
- Can manage all employees, attendance, leaves
- Can manage payroll (create, edit, delete)
- Can manage performance reviews
- Can manage shifts and schedules
- Can send announcements and messages
- Can view all reports
- Can manage roles and permissions
- Can configure system settings

### 👨‍💻 Employee
**Access Level**: Self-Service Only

**Menu Items**:
- Dashboard
- Mark Attendance
- Apply for Leave
- View Own Profile
- View Own Payslip
- View Own Performance

**Capabilities**:
- Can view personal dashboard
- Can mark attendance (clock in/out)
- Can apply for leave requests
- Can view own profile information
- Can view own payslips
- Can view own performance reviews

## Implementation Details

### Sidebar Component (`src/components/Sidebar.jsx`)

The sidebar dynamically filters menu items based on the current user's role:

```javascript
// Menu items are defined with role permissions
const allMenuItems = [
  { path: '/', label: 'Dashboard', roles: ['admin', 'hr', 'employee'] },
  { path: '/employees', label: 'Manage Employees', roles: ['admin', 'hr'] },
  // ... more items
];

// Filter based on current user role
const menuItems = getMenuItemsForRole(currentUser.role);
```

**Features**:
- Role-based filtering
- Dynamic label display (e.g., "Manage Attendance" vs "Mark Attendance")
- Role indicator in sidebar header
- Sorted menu items (Dashboard first, then alphabetically)

### Route Protection (`src/components/ProtectedRoute.jsx`)

All routes are protected with role-based access control:

```javascript
<ProtectedRoute allowedRoles={['admin', 'hr']}>
  <Payroll />
</ProtectedRoute>
```

**Protection Levels**:
1. **Authentication Check**: User must be logged in
2. **Role Check**: User must have required role(s)
3. **Auto-redirect**: Unauthorized users redirected to dashboard

### Page-Level Role Adaptation

Pages adapt their content based on user role:

#### Attendance Page
- **Employees**: See "Clock In/Out" and "Apply for Leave" tabs
- **HR/Admin**: See "Attendance Records", "Leave Requests", and "Leave Types" tabs

#### Payroll Page
- **Admin**: Full payroll management
- **HR**: View-only access
- **Employees**: Redirected to "My Payslip" page

## New Employee Pages

### My Profile (`/my-profile`)
- View personal information
- Quick actions (Mark Attendance, Apply Leave, etc.)
- Employee-only access

### My Payslip (`/my-payslip`)
- View all payslips
- Filter by month
- Download payslip (placeholder)
- Summary statistics
- Employee-only access

### My Performance (`/my-performance`)
- View performance reviews
- Average rating display
- Goals and feedback
- Employee-only access

### Leaves Management (`/leaves`)
- View all leave requests
- Approve/reject functionality
- Filter by status
- Statistics dashboard
- HR/Admin only

## Route Configuration

All routes are configured in `src/App.jsx`:

```javascript
// Employee self-service routes
<Route path="/my-profile" element={
  <ProtectedRoute allowedRoles={['employee']}>
    <MyProfile />
  </ProtectedRoute>
} />

// HR/Admin routes
<Route path="/leaves" element={
  <ProtectedRoute allowedRoles={['admin', 'hr']}>
    <Leaves />
  </ProtectedRoute>
} />

// Admin-only routes
<Route path="/roles" element={
  <ProtectedRoute allowedRoles={['admin']}>
    <Roles />
  </ProtectedRoute>
} />
```

## Testing Role-Based Navigation

### Test as Administrator
1. Login as Administrator
2. Verify all menu items are visible
3. Verify access to all pages
4. Check that role indicator shows "Administrator"

### Test as HR Manager
1. Login as HR Manager
2. Verify only HR menu items are visible:
   - Dashboard
   - Manage Employees
   - Manage Attendance
   - Manage Leaves
   - View Payroll
   - View Reports
3. Verify access to restricted pages is blocked
4. Check that role indicator shows "HR Manager"

### Test as Employee
1. Login as Employee
2. Verify only employee menu items are visible:
   - Dashboard
   - Mark Attendance
   - Apply for Leave
   - View Own Profile
   - View Own Payslip
   - View Own Performance
3. Verify access to management pages is blocked
4. Check that role indicator shows "Employee"

## Security Considerations

1. **Client-Side Protection**: Menu items are filtered in the sidebar
2. **Route Protection**: All routes are protected with `ProtectedRoute`
3. **Page-Level Protection**: Pages check user role and adapt content
4. **Backend Validation**: When connecting to backend, ensure server-side role validation

## Customization

### Adding New Menu Items

1. Add to `allMenuItems` array in `Sidebar.jsx`:
```javascript
{ 
  path: '/new-page', 
  label: 'New Page', 
  icon: NewIcon, 
  roles: ['admin', 'hr'] 
}
```

2. Add route in `App.jsx`:
```javascript
<Route path="/new-page" element={
  <ProtectedRoute allowedRoles={['admin', 'hr']}>
    <NewPage />
  </ProtectedRoute>
} />
```

### Modifying Role Permissions

Update the `roles` array in menu item definitions:
```javascript
// Make a page accessible to all roles
roles: ['admin', 'hr', 'employee']

// Make a page admin-only
roles: ['admin']

// Make a page HR and Admin only
roles: ['admin', 'hr']
```

## Troubleshooting

**Issue**: Menu items not showing for a role
- Check that the role is included in the menu item's `roles` array
- Verify `currentUser.role` matches expected values ('admin', 'hr', 'employee')
- Check browser console for errors

**Issue**: Can access restricted pages
- Verify `ProtectedRoute` is wrapping the route
- Check that `allowedRoles` array includes correct roles
- Ensure authentication state is properly loaded

**Issue**: Wrong menu labels showing
- Check duplicate path handling in `uniqueMenuItems` logic
- Verify role-specific labels are correctly defined

---

**Note**: This implementation provides client-side role-based navigation. For production, ensure backend API also validates user roles and permissions.

