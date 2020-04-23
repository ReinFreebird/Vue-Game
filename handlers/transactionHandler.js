/* eslint-disable arrow-parens */
/**
 * @file Transaction handlers
 * @copyright Phire Studio, 2020
 * @version 1.0.0
 * @module handlers/transactionHandler
 */

const mongoose = require('mongoose');

/** a function that takes another function and wraps it in a promise. */
const transactionHandler = fn => (req, res, next) => {

  const sessionHandler = async (fn) => {
    req.session = await mongoose.startSession();
    req.session.startTransaction();
    try {
      fn(req, res, next);
      await req.session.commitTransaction();
    } catch (error) {
      console.log(error);
      await req.session.abortTransaction();
      throw error;
    } finally {
      req.session.endSession();
    }
  }
  
  Promise.resolve(sessionHandler(fn)).catch(next);
};

module.exports = transactionHandler;
