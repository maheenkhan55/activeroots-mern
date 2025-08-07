import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  activity: {
    type: String,
    required: true
  }
});

const coachSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  achievements: [String],
  photo: {
    type: String,
    default: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  }
});

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  sport: {
    type: String,
    required: true,
    enum: ['Soccer', 'Basketball', 'Volleyball', 'Football', 'Swimming', 'Tennis', 'Baseball']
  },
  description: {
    type: String,
    required: true
  },
  ageGroup: {
    min: {
      type: Number,
      required: true,
      min: 3
    },
    max: {
      type: Number,
      required: true,
      max: 18
    }
  },
  gender: {
    type: String,
    required: true,
    enum: ['Boys', 'Girls', 'Co-ed']
  },
  season: {
    type: String,
    required: true,
    enum: ['Spring', 'Summer', 'Fall', 'Winter']
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  enrolled: {
    type: Number,
    default: 0
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  schedule: [scheduleSchema],
  coach: coachSchema,
  image: {
    type: String,
    default: ''
  },
  features: [String],
  status: {
    type: String,
    enum: ['active', 'inactive', 'full'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Virtual for spots remaining
programSchema.virtual('spotsRemaining').get(function() {
  return this.capacity - this.enrolled;
});

// Virtual for age range display
programSchema.virtual('ageRange').get(function() {
  return `${this.ageGroup.min}-${this.ageGroup.max}`;
});

export default mongoose.model('Program', programSchema);

// This module defines the Program model for managing sports programs in the application.
// It includes fields for program details such as name, sport, description, age group
