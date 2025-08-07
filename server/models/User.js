import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const childSchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 3,
    max: 18
  },
  enrollments: [{
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program'
    },
    enrollmentDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active'
    },
    sessionsAttended: {
      type: Number,
      default: 0
    }
  }]
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  phone: { type: String, trim: true },
  role: {
    type: String,
    enum: ['parent', 'coach', 'admin'],
    default: 'parent'
  },
  children: [childSchema],
  cart: [{
    program: { type: mongoose.Schema.Types.ObjectId, ref: 'Program' },
    child: { type: String, required: true },
    addedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS));
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);


// This module defines the User model for managing user accounts in the application.
// It includes fields for user details such as name, email, password, phone, role,
// and a list of children. The schema also includes methods for password hashing and comparison.
// The User model is essential for user authentication and authorization,
// allowing users to manage their accounts and enroll their children in programs. 