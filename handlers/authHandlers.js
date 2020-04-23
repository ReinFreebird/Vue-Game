/* eslint-disable arrow-body-style */
/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
/**
 * @file Authorization handlers
 * @copyright Phire Studio, 2019
 * @version 1.0.0
 * @module handlers/auth
 */

// Dependencies
const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandlers');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];

    // Set token from cookie (Disable this if working only with JSON token)
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return next(
      new ErrorResponse('Not authorized to access this page', 401),
    );
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(
      new ErrorResponse('Not authorized to access this page', 401),
    );
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} not authorized to access this page`,
          403,
        ),
      );
    }
    next();
  };
};

// Protect routes for dashboard
exports.protectView = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];

    // Set token from cookie (Disable this if working only with JSON token)
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return res.redirect('/dashboard/login');
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return res.render('dashboard/pages/errors/401');
  }
});

// Grant access to specific roles to view pages
exports.authorizeView = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.render('dashboard/pages/errors/403');
    }
    next();
  };
};