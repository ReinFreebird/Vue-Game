/**
 * @file Dashboard Supplier Router
 * @copyright Phire Studio, 2020
 * @version 1.0.0
 * @module routes/dashboard/suppliers
 */

// Dependencies
const express = require('express');
const router = express.Router({ mergeParams: true });
const { protectView, authorizeView } = require('../../handlers/authHandlers');

router.use(protectView);
router.use(authorizeView('admin'));

router
  .route('/')
  .get((req, res) => res.render('dashboard/pages/suppliers/index', { user: req.user }));

  module.exports = router;