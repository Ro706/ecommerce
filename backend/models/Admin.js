const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [4, 'Username must be at least 4 characters'],
    maxlength: [20, 'Username cannot exceed 20 characters'],
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9_]+$/.test(v);
      },
      message: 'Username can only contain letters, numbers and underscores'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false // Never return password in queries
  },
  role: {
    type: String,
    enum: ['admin', 'superadmin'],
    default: 'admin'
  },
  lastLogin: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
AdminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
AdminSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Static method for login
AdminSchema.statics.login = async function(username, password) {
  const admin = await this.findOne({ username }).select('+password');
  
  if (!admin) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await admin.comparePassword(password);
  
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  admin.lastLogin = Date.now();
  await admin.save({ validateBeforeSave: false });
  
  return admin;
};

// Prevent version key in responses
AdminSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.__v;
    delete ret.password;
    return ret;
  }
});

module.exports = mongoose.model('Admin', AdminSchema);