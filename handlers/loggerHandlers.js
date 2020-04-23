/**
 * @file Logger middleware
 * @copyright Phire Studio, 2019
 * @version 1.0.0
 * @module handlers/logger
 * @deprecated change to morgan package
 */

// @desc  Logs request to console
const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get('host')}${
      req.originalUrl
    }`,
  );
  next();
};

module.exports = logger;
