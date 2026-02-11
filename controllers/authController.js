const User = require('../models/User');

class AuthController {
  // Show signup page
  static showSignup(req, res) {
    res.render('signup');
  }

  // Handle signup
  static async signup(req, res) {
    try {
      const { name, email, password, confirmPassword } = req.body;
      
      // Validation
      if (!name || !email || !password || !confirmPassword) {
        req.flash('error', 'All fields are required');
        return res.redirect('/signup');
      }

      if (password !== confirmPassword) {
        req.flash('error', 'Passwords do not match');
        return res.redirect('/signup');
      }

      if (password.length < 6) {
        req.flash('error', 'Password must be at least 6 characters');
        return res.redirect('/signup');
      }

      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        req.flash('error', 'Email already registered');
        return res.redirect('/signup');
      }

      // Create new user
      await User.create(name, email, password);

      req.flash('success', 'Account created successfully! Please login.');
      res.redirect('/login');
    } catch (error) {
      console.error('Signup error:', error);
      req.flash('error', 'Error creating account');
      res.redirect('/signup');
    }
  }

  // Show login page
  static showLogin(req, res) {
    res.render('login');
  }

  // Handle login
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        req.flash('error', 'Please provide email and password');
        return res.redirect('/login');
      }

      // Find user
      const user = await User.findByEmail(email);
      if (!user) {
        req.flash('error', 'Invalid email or password');
        return res.redirect('/login');
      }

      // Check password
      const isMatch = await User.comparePassword(password, user.password);
      if (!isMatch) {
        req.flash('error', 'Invalid email or password');
        return res.redirect('/login');
      }

      // Create session
      req.session.userId = user.id;
      req.flash('success', `Welcome back, ${user.name}!`);
      res.redirect('/');
    } catch (error) {
      console.error('Login error:', error);
      req.flash('error', 'Error logging in');
      res.redirect('/login');
    }
  }

  // Handle logout
  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Logout error:', err);
      }
      res.redirect('/login');
    });
  }
}

module.exports = AuthController;
