import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  head: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    default: null
  }
}, {
  timestamps: true
});

const holidaySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: ['National', 'Regional', 'Company'],
    default: 'National'
  }
}, {
  timestamps: true
});

const leaveTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  days: {
    type: Number,
    required: true,
    min: 0
  },
  carryForward: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export const Department = mongoose.model('Department', departmentSchema);
export const Holiday = mongoose.model('Holiday', holidaySchema);
export const LeaveType = mongoose.model('LeaveType', leaveTypeSchema);









