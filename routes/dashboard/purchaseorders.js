/**
 * @file Dashboard PurchaseOrders Router
 * @copyright Phire Studio, 2020
 * @version 1.0.0
 * @module routes/dashboard/purchaseorders
 */

// Dependencies
const express = require('express');
const router = express.Router({ mergeParams: true });
const { protectView, authorizeView } = require('../../handlers/authHandlers');

router.use(protectView);
router.use(authorizeView('admin', 'sales'));

router
  .route('/')
  .get((req, res) => res.render('dashboard/pages/purchaseorders/index', { user: req.user }));

router
  .route('/create')
  .get((req, res) => res.render('dashboard/pages/purchaseorders/create', { user: req.user}));

router
  .route('/:id')
  .get((req, res) => res.render('dashboard/pages/purchaseorders/details', { user: req.user, id: req.params.id}));

router
  .route('/:id/edit')
  .get((req, res) => res.render('dashboard/pages/purchaseorders/edit', { user: req.user, id: req.params.id}));

module.exports = router;