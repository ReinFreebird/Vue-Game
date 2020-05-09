/**
 * @file User Router
 * @copyright Phire Studio, 2019
 * @version 1.0.0
 * @module routes/users
 */

// Dependencies
const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

const User = require('../models/User');

const router = express.Router({ mergeParams: true });

const queryResults = require('../handlers/queryResultsHandlers');
const { protect, authorize } = require('../handlers/authHandlers');

router.use(protect);
router.use(authorize('admin'));

router
  .route('/')
  .get(queryResults(User), getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
