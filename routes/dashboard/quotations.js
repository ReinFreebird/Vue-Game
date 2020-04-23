/**
 * @file Dashboard Quotations Router
 * @copyright Phire Studio, 2020
 * @version 1.0.0
 * @module routes/dashboard/quotations
 */

// Dependencies
const express = require('express');
const router = express.Router({ mergeParams: true });
const { protectView, authorizeView } = require('../../handlers/authHandlers');

router.use(protectView);
router.use(authorizeView('admin', 'sales'));

router
  .route('/')
  .get((req, res) => res.render('dashboard/pages/quotations/index', { user: req.user }));

router
  .route('/:id')
  .get((req, res) => res.render('dashboard/pages/quotations/details', { user: req.user}));

router
  .route('/:id/edit')
  .get((req, res) => res.render('dashboard/pages/quotations/edit', { user: req.user}));

module.exports = router;