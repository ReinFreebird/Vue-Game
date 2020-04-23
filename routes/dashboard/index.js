/**
 * @file Dashboard Index Router
 * @copyright Phire Studio, 2020
 * @version 1.0.0
 * @module routes/dashboard/index
 */

// Dependencies
const express = require('express');
const router = express.Router({ mergeParams: true });

const { protectView } = require('../../handlers/authHandlers');

const users = require('./users');
const stores = require('./stores');
const bankaccounts = require('./banksccounts');
const invoices = require('./invoices');
const boms = require('./boms');
const customers = require('./customers');
const items = require('./items');
const quotations = require('./quotations');
const salesorders = require('./salesorders');
const deliveryorders = require('./deliveryorders');
const suppliers = require('./suppliers');
const purchaseorders = require('./purchaseorders');

router.use('/users', users);
router.use('/stores', stores);
router.use('/bankaccounts', bankaccounts);
router.use('/invoices', invoices);
router.use('/boms', boms);
router.use('/customers', customers);
router.use('/items', items);
router.use('/quotations', quotations);
router.use('/salesorders', salesorders);
router.use('/deliveryorders', deliveryorders);
router.use('/suppliers', suppliers);
router.use('/purchaseorders', purchaseorders);
router.get('/login', (req, res) => res.render('dashboard/pages/auth/login'));
router.get('/register', (req, res) => res.render('dashboard/pages/auth/register'));
router.route('/').get(protectView, (req, res) => res.render('dashboard/dashboard', { user: req.user }));
router.all('*', (req, res) => res.render('dashboard/pages/errors/404'));
module.exports = router;
