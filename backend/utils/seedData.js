import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Employee from '../models/Employee.js';
import { Department, Holiday, LeaveType, Shift } from '../models/Settings.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data (optional - comment out if you want to keep existing data)
    // await User.deleteMany();
    // await Employee.deleteMany();
    // await Department.deleteMany();
    // await Holiday.deleteMany();
    // await LeaveType.deleteMany();
    // await Shift.deleteMany();

    // Create Admin User
    const adminExists = await User.findOne({ email: 'admin@company.com' });
    if (!adminExists) {
      const admin = await User.create({
        name: 'Admin User',
        email: 'admin@company.com',
        password: 'admin123',
        role: 'admin',
        phone: '+1 234-567-8900',
        department: 'Administration',
        designation: 'System Administrator'
      });
      console.log('✅ Admin user created');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Create HR User
    const hrExists = await User.findOne({ email: 'hr@company.com' });
    if (!hrExists) {
      const hr = await User.create({
        name: 'HR Manager',
        email: 'hr@company.com',
        password: 'hr123456',
        role: 'hr',
        phone: '+1 234-567-8901',
        department: 'HR',
        designation: 'HR Manager'
      });
      console.log('✅ HR user created');
    } else {
      console.log('ℹ️  HR user already exists');
    }

    // Create Employee User
    const empExists = await User.findOne({ email: 'employee@company.com' });
    if (!empExists) {
      const employee = await User.create({
        name: 'John Employee',
        email: 'employee@company.com',
        password: 'emp123456',
        role: 'employee',
        phone: '+1 234-567-8902',
        department: 'Engineering',
        designation: 'Software Developer'
      });

      // Create Employee record
      await Employee.create({
        employeeId: 'EMP001',
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        designation: employee.designation,
        joiningDate: new Date(),
        salary: 60000,
        userId: employee._id
      });
      console.log('✅ Employee user created');
    } else {
      console.log('ℹ️  Employee user already exists');
    }

    // Create Departments
    const departments = [
      { name: 'Engineering', head: null },
      { name: 'HR', head: null },
      { name: 'Sales', head: null },
      { name: 'Marketing', head: null },
      { name: 'Finance', head: null }
    ];

    for (const dept of departments) {
      const exists = await Department.findOne({ name: dept.name });
      if (!exists) {
        await Department.create(dept);
        console.log(`✅ Department ${dept.name} created`);
      }
    }

    // Create Leave Types
    const leaveTypes = [
      { name: 'Sick Leave', days: 10, carryForward: true },
      { name: 'Vacation', days: 15, carryForward: false },
      { name: 'Personal Leave', days: 5, carryForward: false },
      { name: 'Maternity Leave', days: 90, carryForward: false },
      { name: 'Paternity Leave', days: 7, carryForward: false }
    ];

    for (const lt of leaveTypes) {
      const exists = await LeaveType.findOne({ name: lt.name });
      if (!exists) {
        await LeaveType.create(lt);
        console.log(`✅ Leave type ${lt.name} created`);
      }
    }

    // Create Holidays
    const holidays = [
      { name: 'New Year', date: new Date('2024-01-01'), type: 'National' },
      { name: 'Independence Day', date: new Date('2024-07-04'), type: 'National' },
      { name: 'Christmas', date: new Date('2024-12-25'), type: 'National' }
    ];

    for (const holiday of holidays) {
      const exists = await Holiday.findOne({ name: holiday.name, date: holiday.date });
      if (!exists) {
        await Holiday.create(holiday);
        console.log(`✅ Holiday ${holiday.name} created`);
      }
    }

    // Create Shifts
    const shifts = [
      { name: 'Morning Shift', startTime: '09:00', endTime: '18:00', breakDuration: 60 },
      { name: 'Evening Shift', startTime: '14:00', endTime: '23:00', breakDuration: 60 },
      { name: 'Night Shift', startTime: '22:00', endTime: '06:00', breakDuration: 60 }
    ];

    for (const shift of shifts) {
      const exists = await Shift.findOne({ name: shift.name });
      if (!exists) {
        await Shift.create(shift);
        console.log(`✅ Shift ${shift.name} created`);
      }
    }

    console.log('\n✅ Seed data created successfully!');
    console.log('\n📝 Default Login Credentials:');
    console.log('Admin: admin@company.com / admin123');
    console.log('HR: hr@company.com / hr123456');
    console.log('Employee: employee@company.com / emp123456');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();









