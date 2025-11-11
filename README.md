# 💼 Employee Management System (EMS)

![React](https://img.shields.io/badge/Frontend-React.js-blue?logo=react)
![Tailwind](https://img.shields.io/badge/UI-TailwindCSS-38bdf8?logo=tailwindcss)
![NodeJS](https://img.shields.io/badge/Backend-Node.js-43853d?logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-4EA94B?logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-green)
![MadeBy](https://img.shields.io/badge/Made%20by-Sachin%20Jatav-orange)

---

> ⚡ A **modern full-stack Employee Management System** built using **React.js**, **Tailwind CSS**, **Node.js**, **Express**, and **MongoDB Atlas**.  
> Built for **Admins**, **HR Managers**, and **Employees** to simplify HR operations — from attendance & payroll to performance management and analytics.  

---

**🚀 Overview**

The Employee Management System (EMS) centralizes HR workflows with real-time dashboards, dynamic data management, and role-based access.  
It’s clean, scalable, responsive, and perfect for both enterprise and portfolio-level projects.

---

**🧩 Key Features**

👑 **Admin Panel**
- Full system access and control ⚙️  
- Manage all employees, payrolls, and performance records  
- Approve or reject leave and attendance requests  
- Configure departments, holidays, and system settings  
- Generate reports and analytics  

🧍‍♂️ **HR Manager Panel**
- Add, edit, and manage employee records  
- Approve or reject leave and attendance requests  
- Manage payroll data and performance reviews  
- Generate performance and salary reports  

👤 **Employee Panel**
- View personal profile, attendance, and payslips  
- Mark attendance (Check-In / Check-Out)  
- Apply for leave and view leave balance  
- Access internal announcements and notifications  

---

**⚙️ Modules**

| Module | Description |
|:--------|:-------------|
| 🧾 Authentication | JWT-based login & registration with role-based permissions |
| 👥 Employee Management | CRUD operations, photo & document uploads |
| 📅 Attendance & Leave | Mark attendance, apply/approve leave, view history |
| 💰 Payroll | Define salary, bonuses, deductions, and generate payslips |
| ⭐ Performance | Add reviews, set KPIs, and rate performance |
| 🕐 Shift & Schedule | Create and assign work shifts |
| 📈 Reports & Analytics | Department-wise & attendance insights |
| ⚙️ System Settings | Manage holidays, departments, logs, and roles |

---

**🧰 Tech Stack**

**Frontend:**  
⚛️ React.js · 💨 Tailwind CSS · 🧱 ShadCN UI · 🧭 React Router DOM · ⚡ Context API / Redux  

**Backend:**  
🟢 Node.js · ⚙️ Express.js · 🍃 MongoDB Atlas · 🔐 JWT Auth · 🧂 Bcrypt.js · 🧩 Express Validator · 📦 Multer · 🌍 CORS · Nodemon  

---

**📁 Folder Structure**
```
EMS/
│
├── backend/                  # 🧠 Server-side code (Node.js + Express)
│   ├── server.js             # Main entry point for backend server
│   ├── config/               # Database & environment configuration files
│   ├── controllers/          # Logic for handling API requests
│   ├── middleware/           # Custom middleware (auth, error handling, etc.)
│   ├── models/               # Mongoose/Sequelize models for DB schemas
│   ├── routes/               # Express routes (API endpoints)
│   ├── utils/                # Utility/helper functions
│   └── .env                  # Environment variables (not pushed to GitHub)
│
├── frontend/                 # 💻 Client-side code (React)
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components (Dashboard, Login, etc.)
│   │   ├── context/          # Context API for global state management
│   │   ├── services/         # API calls to backend
│   │   ├── App.jsx           # Root React component
│   │   └── main.jsx          # React entry point
│   │
│   ├── public/               # Static files (images, icons, etc.)
│   └── package.json          # Frontend dependencies
│
└── README.md                 # 📘 Project documentation
```
---

**⚡ Getting Started**

1️⃣ **Clone the Repository**
```bash
git clone https://github.com/<your-username>/employee-management-system.git
cd employee-management-system
2️⃣ Backend Setup

bash
Copy code
cd backend
npm install
Create .env file:

env
Copy code
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/emsdb
JWT_SECRET=mySecretKey123
Run backend:

bash
Copy code
npm run dev
✅ Server running at http://localhost:5000

3️⃣ Frontend Setup

bash
Copy code
cd ../frontend
npm install
npm run dev
✅ Frontend running at http://localhost:5173
```
🧠 API Endpoints

Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	User login (returns JWT token)
GET	/api/employees	Fetch all employees
POST	/api/employees	Add new employee
PUT	/api/employees/:id	Update employee
DELETE	/api/employees/:id	Delete employee
POST	/api/employees/:id/avatar	Upload employee photo
POST	/api/employees/:id/documents	Upload employee documents

🔐 Role-Based Access

Role	Access Level
👑 Admin	Full system access
🧍‍♂️ HR Manager	Manage employees, attendance, leaves, payroll
👤 Employee	View & manage own profile, attendance & payslips

📊 Dashboard Highlights

🖥️ Admin Dashboard
👥 Total Employees
🧾 Active Leaves
💰 Payroll Summary
📈 Performance Stats
🗓️ Upcoming Holidays
💼 Employee Dashboard
📅 Attendance Logs
💸 Payslip Records
🌴 Leave Histor
⭐ Performance Reviews
🧱 Build & Deployment
🧩 Build Frontend

cd frontend
npm run build
☁️ Deploy Backend
Deploy using Render, Railway, or Vercel (API Mode)
Make sure to configure environment variables in hosting settings.

🧪 Future Enhancements

📱 Mobile App (React Native)
📧 Email / SMS Notifications
🧾 Recruitment Tracking
🖇️ Asset Management (Laptops, IDs, etc.)
🧮 Biometric Attendance Integration

🤝 Contributing
Contributions are welcome! 💬

Fork the repository
Create a new feature branch
Commit your changes
Submit a Pull Request 🚀

🪪 License
Licensed under the MIT License — free to use, modify, and share with credit 💡

👨‍💻 Author

👤 Developed by Sachin Gautam
💻 Full Stack Developer | Passionate about Clean UI & Scalable Systems
🌍 “Build smart, ship fast.”

⭐ If you like this project, don’t forget to drop a star!

---

✅ **Pro-ready look:**  
- Headers replaced with bold icons & emojis  
- Cleaner spacing  
- Consistent tone  
- Perfect for GitHub dark mode  

Wanna me make a **banner image** (like “Employee Management System – React + Node + MongoDB”) to pl

