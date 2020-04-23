/**
 * @file Dashboard Delivery Orders Router
 * @copyright Phire Studio, 2020
 * @version 1.0.0
 * @module routes/dashboard/deliveryorders
 */

// Dependencies
const express = require('express');
const router = express.Router({ mergeParams: true });
const { protectView, authorizeView } = require('../../handlers/authHandlers');

router.use(protectView);
router.use(authorizeView('admin', 'sales', 'inventory'));

router
  .route('/')
  .get((req, res) => res.render('dashboard/pages/deliveryorders/index', { user: req.user }));

router
  .route('/:id')
  .get((req, res) => res.render('dashboard/pages/deliveryorders/details', { user: req.user}));

router
  .route('/:id/print')
  .get((req, res) => res.render('dashboard/pages/deliveryorders/print', { id: req.params.id }));

module.exports = router;