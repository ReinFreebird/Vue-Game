/**
 * @file Dashboard BOM Router
 * @copyright Phire Studio, 2020
 * @version 1.0.0
 * @module routes/dashboard/boms
 */

// Dependencies
const express = require('express');
const router = express.Router({ mergeParams: true });
const { protectView, authorizeView } = require('../../handlers/authHandlers');

router.use(protectView);
router.use(authorizeView('production', 'admin'));

router
  .route('/')
  .get((req, res) => res.render('dashboard/pages/boms/index', { user: req.user }));

router
  .route('/create')
  .get((req, res) => res.render('dashboard/pages/boms/create', { user: req.user }));

router
  .route('/:id')
  .get((req, res) => res.render('dashboard/pages/boms/details', { user: req.user, id: req.params.id }));
  
router
  .route('/:id/edit')
  .get((req, res) => res.render('dashboard/pages/boms/edit', { user: req.user, id: req.params.id }));

  module.exports = router;