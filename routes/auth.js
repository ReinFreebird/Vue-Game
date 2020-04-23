/**
 * @file Auth Router
 * @copyright Phire Studio, 2019
 * @version 1.0.0
 * @module routes/auth
 */

// Dependencies
const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
} = require('../controllers/auth');

// Initiate router
const router = express.Router();

// Securing route
const { protect } = require('../handlers/authHandlers');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
