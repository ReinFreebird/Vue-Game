/**
 * @file Dashboard Bank Accounts Router
 * @copyright Phire Studio, 2020
 * @version 1.0.0
 * @module routes/dashboard/bankaccounts
 */

// Dependencies
const express = require('express');
const router = express.Router({ mergeParams: true });
const { protectView } = require('../../handlers/authHandlers');

router.use(protectView);

router
  .route('/')
  .get((req, res) => res.render('dashboard/pages/bankaccounts/index', { user: req.user }));

router
  .route('/approval')
  .get((req, res) => res.render('dashboard/pages/bankaccounts/approval', { user: req.user}));

  module.exports = router;