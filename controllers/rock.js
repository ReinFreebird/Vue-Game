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
const Rock = require('../models/Rock');

// @desc      Get all rock
// @route     GET /api/v1/rock
// @access    Public/Rock
exports.getRocks = asyncHandler(async (req, res) => {
  res.status(200).json(res.queryResults);
});


// @desc      Create rock
// @route     POST /api/v1/rock
// @access    Public/Rock
exports.createRock = asyncHandler(async (req, res) => {
  const rock = await Rock.create(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});