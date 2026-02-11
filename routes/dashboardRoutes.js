const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboardController');
const { isAuthenticated } = require('../middleware/auth');

// Dashboard route
router.get('/dashboard', isAuthenticated, DashboardController.index);

module.exports = router;
