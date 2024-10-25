const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Simple user schema with validation
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      // Simple regex for basic email validation
      validator: (v) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(v);
      },
      message: 'Invalid email format!',
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      // Check password length and character requirements
      validator: (v) => {
        return v.length >= 8 && /[A-Z]/.test(v) && /[a-z]/.test(v);
      },
      message: 'Password must be at least 8 characters long and contain at least one uppercase letter and one lowercase letter!',
    },
  },
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
