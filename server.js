const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const path = require('path');
require('dotenv').config();

// Initialize database
require('./config/database');

// Import middleware
const { setUser } = require('./middleware/auth');

// Import routes
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// ============ VIEW ENGINE SETUP ============
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ============ MIDDLEWARE SETUP ============
// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTTP method override (for PUT and DELETE)
app.use(methodOverride('_method'));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Flash messages
app.use(flash());

// Set user in all views
app.use(setUser);

// ============ ROUTES ============
// Authentication routes
app.use('/', authRoutes);

// Dashboard routes
app.use('/', dashboardRoutes);

// Event routes (main application routes)
app.use('/', eventRoutes);

// ============ ERROR HANDLING ============
// 404 Handler
app.use((req, res) => {
  res.status(404).render('error', { message: 'Page not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).render('error', { 
    message: 'Something went wrong! Please try again.' 
  });
});

// ============ START SERVER ============
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🎉 EVENT HOSTING PLATFORM - MVC Architecture');
  console.log('='.repeat(50));
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗄️  Database: MySQL (${process.env.DB_NAME})`);
  console.log('='.repeat(50));
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});
