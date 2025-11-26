// Email service using nodemailer
// Uncomment and configure for production use

/*
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"PrismHR" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html
    });

    console.log('Email sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

export const sendWelcomeEmail = async (user) => {
  const html = `
    <h1>Welcome to PrismHR!</h1>
    <p>Hello ${user.name},</p>
    <p>Your account has been created successfully.</p>
    <p>Email: ${user.email}</p>
    <p>Role: ${user.role}</p>
  `;

  return await sendEmail(user.email, 'Welcome to PrismHR', '', html);
};

export const sendLeaveNotification = async (leave, employee, action) => {
  const html = `
    <h1>Leave Request ${action}</h1>
    <p>Hello ${employee.name},</p>
    <p>Your leave request has been ${action}.</p>
    <p><strong>Details:</strong></p>
    <ul>
      <li>Leave Type: ${leave.leaveType}</li>
      <li>Start Date: ${leave.startDate}</li>
      <li>End Date: ${leave.endDate}</li>
      <li>Status: ${leave.status}</li>
    </ul>
  `;

  return await sendEmail(employee.email, `Leave Request ${action}`, '', html);
};
*/

// Placeholder functions for development
export const sendEmail = async (to, subject, text, html) => {
  console.log(`[Email Service] Would send email to ${to}: ${subject}`);
  return { success: true, messageId: 'dev-mode' };
};

export const sendWelcomeEmail = async (user) => {
  console.log(`[Email Service] Would send welcome email to ${user.email}`);
  return { success: true };
};

export const sendLeaveNotification = async (leave, employee, action) => {
  console.log(`[Email Service] Would send leave notification to ${employee.email}`);
  return { success: true };
};

