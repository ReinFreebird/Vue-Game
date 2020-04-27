/* eslint-disable func-names */
/* eslint-disable no-return-await */
/* eslint-disable no-useless-escape */
/**
 * @file User Schema
 * @copyright Phire Studio, 2019
 * @version 1.0.0
 * @module models/User
 */

// Dependencies
const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // @WHY bcrypt package behave randomly in env
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name required.'],
  },
  email: {
    type: String,
    required: [true, 'Email required.'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Email not valid.',
    ],
  },
  role: {
    type: String,
    enum: ['admin', 'management', 'sales', 'purchase', 'inventory', 'production', 'finance', 'vendor', 'publisher', 'user'],
    required: [true, 'Role required.'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Password required.'],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
);

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Signing JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hashing password token
UserSchema.methods.getResetPasswordToken = function() {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('User', UserSchema);
