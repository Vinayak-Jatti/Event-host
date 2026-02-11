const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { isGuest } = require('../middleware/auth');

// Signup routes
router.get('/signup', isGuest, AuthController.showSignup);
router.post('/signup', isGuest, AuthController.signup);

// Login routes
router.get('/login', isGuest, AuthController.showLogin);
router.post('/login', isGuest, AuthController.login);

// Logout route
router.get('/logout', AuthController.logout);

module.exports = router;
