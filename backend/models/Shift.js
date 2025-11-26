import mongoose from 'mongoose';

const shiftSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide shift name'],
    unique: true,
    trim: true
  },
  startTime: {
    type: String,
    required: [true, 'Please provide start time'],
    trim: true
  },
  endTime: {
    type: String,
    required: [true, 'Please provide end time'],
    trim: true
  },
  breakDuration: {
    type: Number,
    default: 60 // in minutes
  },
  description: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
shiftSchema.index({ name: 1 });

const Shift = mongoose.model('Shift', shiftSchema);

export default Shift;

