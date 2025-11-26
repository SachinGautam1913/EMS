import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Please provide employee name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
    trim: true
  },
  department: {
    type: String,
    required: [true, 'Please provide department'],
    trim: true
  },
  designation: {
    type: String,
    required: [true, 'Please provide designation'],
    trim: true
  },
  joiningDate: {
    type: Date,
    required: [true, 'Please provide joining date'],
    default: Date.now
  },
  salary: {
    type: Number,
    required: [true, 'Please provide salary'],
    min: 0
  },
  avatar: {
    type: String,
    default: null
  },
  documents: [{
    name: String,
    type: String,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'terminated'],
    default: 'active'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  shiftId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shift',
    default: null
  }
}, {
  timestamps: true
});

// Index for search
employeeSchema.index({ name: 'text', email: 'text', employeeId: 'text' });

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;









