const User = require('../models/User');

// Middleware to check if user is authenticated
exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  req.flash('error', 'Please login to access this page');
  res.redirect('/login');
};

// Middleware to check if user is already logged in
exports.isGuest = (req, res, next) => {
  if (req.session && req.session.userId) {
    return res.redirect('/');
  }
  next();
};

// Middleware to make user available in all views
exports.setUser = async (req, res, next) => {
  res.locals.currentUser = null;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  
  if (req.session && req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      res.locals.currentUser = user;
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }
  next();
};
