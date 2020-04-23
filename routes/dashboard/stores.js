/**
 * @file Dashboard Stores Router
 * @copyright Phire Studio, 2020
 * @version 1.0.0
 * @module routes/dashboard/stores
 */

// Dependencies
const express = require('express');
const router = express.Router({ mergeParams: true });
const { protectView, authorizeView } = require('../../handlers/authHandlers');

router.use(protectView);
router.use(authorizeView('publisher'));

router
  .route('/')
  .get((req, res) => res.render('dashboard/pages/stores/index', { user: req.user }));

module.exports = router;