import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Program',
    required: true
  },
  childName: {
    type: String,
    required: true
  },
  childAge: {
    type: Number,
    required: true
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  sessionsAttended: {
    type: Number,
    default: 0
  },
  totalSessions: {
    type: Number,
    required: true
  },
  monthlyFee: {
    type: Number,
    required: true
  },
  nextPaymentDate: {
    type: Date,
    required: true
  },
  notes: [{
    date: {
      type: Date,
      default: Date.now
    },
    note: String,
    author: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

// Virtual field to calculate progress
enrollmentSchema.virtual('progressPercentage').get(function() {
  return Math.round((this.sessionsAttended / this.totalSessions) * 100);
});

export default mongoose.model('Enrollment', enrollmentSchema);
