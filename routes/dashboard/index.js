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

router.all('*', (req, res) => res.render('dashboard/pages/errors/404'));
module.exports = router;
