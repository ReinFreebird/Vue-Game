/**
 * @file Dashboard Invoices Router
 * @copyright Phire Studio, 2020
 * @version 1.0.0
 * @module routes/dashboard/invoices
 */

// Dependencies
const express = require('express');
const router = express.Router({ mergeParams: true });
const { protectView, authorizeView } = require('../../handlers/authHandlers');

router.use(protectView);
router.use(authorizeView('finance', 'admin'));

router
  .route('/')
  .get((req, res) => res.render('dashboard/pages/invoices/index', { user: req.user }));

router
  .route('/:id')
  .get((req, res) => res.render('dashboard/pages/invoices/details', { user: req.user, id: req.params.id }));

router
  .route('/:id/print')
  .get((req, res) => res.render('dashboard/pages/invoices/print', { id: req.params.id }));

  module.exports = router;