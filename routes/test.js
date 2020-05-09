/**
 * @file test Router
 * @copyright Phire Studio, 2019
 * @version 1.0.0
 * @module routes/test
 */

// Dependencies
const express = require('express');
const {
  test
} = require('../controllers/test');


const router = express.Router({ mergeParams: true });

const queryResults = require('../handlers/queryResultsHandlers');



router
  .route('/test')
  .post(test);

module.exports = router;
