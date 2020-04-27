/**
 * @file rock Router
 * @copyright Phire Studio, 2019
 * @version 1.0.0
 * @module routes/rock
 */

// Dependencies
const express = require('express');
const {
  getRocks,
  getRock,
  createRock,
  getRandomRock,
} = require('../controllers/rock');

const Rock = require('../models/Rock');

const router = express.Router({ mergeParams: true });

const queryResults = require('../handlers/queryResultsHandlers');


router
  .route('/')
  .get(queryResults(Rock), getRocks)
  .post(createRock);

router
  .route('/:id')
  .get(getRock);

router
  .route('/random')
  .get(getRandomRock);

module.exports = router;
