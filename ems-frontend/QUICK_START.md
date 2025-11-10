# Quick Start Guide

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:5173`

## Default User

The application comes with a default admin user:
- **Role**: Admin
- **Name**: Admin User
- **Email**: admin@company.com

## Sample Data

The application includes pre-loaded mock data:
- 5 sample employees
- Sample attendance records
- Sample leave requests
- Sample payroll entries
- Sample performance reviews

## Key Features to Try

1. **Dashboard**: View overview statistics and recent activities
2. **Employees**: Add, edit, delete employees
3. **Attendance**: Clock in/out and manage leave requests
4. **Payroll**: Calculate and manage employee salaries
5. **Performance**: Add performance reviews
6. **Reports**: Generate various reports

## Next Steps

1. Review the README.md for detailed documentation
2. Update `.env` file with your backend API URL
3. Replace mock data with actual API calls
4. Customize the theme colors in `tailwind.config.js`

## Troubleshooting

- **Port already in use**: Change the port in `vite.config.js` or use `npm run dev -- --port 3001`
- **Styles not loading**: Ensure Tailwind is properly configured in `tailwind.config.js`
- **Routes not working**: Check that all routes are properly defined in `App.jsx`

