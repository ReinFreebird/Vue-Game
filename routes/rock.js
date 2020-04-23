/**
 * @file User Router
 * @copyright Phire Studio, 2019
 * @version 1.0.0
 * @module routes/users
 */

// Dependencies
const express = require('express');
const {
  getRocks,
  createRock,
} = require('../controllers/rock');

const Rock = require('../models/Rock');

const router = express.Router({ mergeParams: true });

const queryResults = require('../handlers/queryResultsHandlers');


router
  .route('/')
  .get(queryResults(Rock), getRocks)
  .post(createRock);


module.exports = router;
