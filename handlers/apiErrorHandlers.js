/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/**
 * @file API Error handlers
 * @copyright Phire Studio, 2019
 * @version 1.0.0
 * @module handlers/apiErrorHandlers
 */

/** Dependencies */
const ErrorResponse = require('../utils/errorResponse');

const apiErrorHandlers = (err, req, res, next) => {
  // TODO add next stack
  let error = { ...err };

  error.message = err.message;
  // Log to console for dev
  // console.log(err);

  // Mongoose bad object ID
  if (err.name === 'CastError') {
    const message = 'Resource not found or invalid.';
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error...',
  });
};

module.exports = apiErrorHandlers;
