/**
 * @file Class Error Response
 * @copyright Phire Studio, 2019
 * @version 1.0.0
 * @module utils/errorResponse
 */

class errorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = errorResponse;
