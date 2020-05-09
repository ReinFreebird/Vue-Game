//TODO user not activated after registration, all user must be approved by admin for activation.
//TODO role admin can not be register via API, must be hard coded in database.
/**
 * @file User Controllers
 * @copyright Phire Studio, 2019
 * @version 1.0.0
 * @module controllers/users
 */

// Dependencies
const asyncHandler = require('../handlers/asyncHandlers');
const executor= require('../utils/executor');



/**
  * @desc   Get test
  * @route  /api/v1/test/test
  * @access Public
  */
exports.test = asyncHandler(async (req, res, next) => {
  var result= await executor.runProcess();
  
  res.status(200).json({
    result
  })
});