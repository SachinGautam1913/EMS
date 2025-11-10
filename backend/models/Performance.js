import mongoose from 'mongoose';

const performanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  reviewPeriod: {
    type: String,
    required: [true, 'Please provide review period'],
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  goals: [{
    type: String,
    trim: true
  }],
  feedback: {
    type: String,
    required: [true, 'Please provide feedback'],
    trim: true
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewDate: {
    type: Date,
    default: Date.now
  },
  strengths: [{
    type: String,
    trim: true
  }],
  areasForImprovement: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

const Performance = mongoose.model('Performance', performanceSchema);

export default Performance;









