/* eslint-disable arrow-parens */
/**
 * @file Async handlers
 * @copyright Phire Studio, 2019
 * @version 1.0.0
 * @module handlers/async
 */

/** a function that takes another function and wraps it in a promise. */
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
