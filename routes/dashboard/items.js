/**
 * @file Dashboard Items Router
 * @copyright Phire Studio, 2020
 * @version 1.0.0
 * @module routes/dashboard/items
 */

// Dependencies
const express = require('express');
const router = express.Router({ mergeParams: true });
const { protectView, authorizeView } = require('../../handlers/authHandlers');

router.use(protectView);
router.use(authorizeView('admin', 'sales'));

router
  .route('/')
  .get((req, res) => res.render('dashboard/pages/items/index', { user: req.user }));

module.exports = router;