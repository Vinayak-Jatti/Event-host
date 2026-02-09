const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const path = require('path');
require('dotenv').config();

// Initialize database
require('./config/database');

// Import models
const User = require('./models/User');
const Event = require('./models/Event');

// Import middleware
const { isAuthenticated, isGuest, setUser } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Session Configuration
app.use(session({
  secret: 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(flash());
app.use(setUser);

// ============ AUTHENTICATION ROUTES ============

// Signup Page
app.get('/signup', isGuest, (req, res) => {
  res.render('signup');
});

// Signup POST
app.post('/signup', isGuest, async (req, res) => {
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
});

// Login Page
app.get('/login', isGuest, (req, res) => {
  res.render('login');
});

// Login POST
app.post('/login', isGuest, async (req, res) => {
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
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/login');
  });
});

// ============ EVENT ROUTES (Protected) ============

// Home - Display all events
app.get('/', isAuthenticated, async (req, res) => {
  try {
    const events = await Event.findAll();
    res.render('index', { events });
  } catch (error) {
    console.error('Error fetching events:', error);
    req.flash('error', 'Error loading events');
    res.redirect('/');
  }
});

// My Events - Events created by user
app.get('/my-events', isAuthenticated, async (req, res) => {
  try {
    const events = await Event.findByCreator(req.session.userId);
    res.render('my-events', { events });
  } catch (error) {
    console.error('Error fetching events:', error);
    req.flash('error', 'Error loading your events');
    res.redirect('/');
  }
});

// My Registrations
app.get('/my-registrations', isAuthenticated, async (req, res) => {
  try {
    const events = await User.getRegisteredEvents(req.session.userId);
    res.render('my-registrations', { events });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    req.flash('error', 'Error loading your registrations');
    res.redirect('/');
  }
});

// Dashboard - Statistics
app.get('/dashboard', isAuthenticated, async (req, res) => {
  try {
    const totalEvents = await Event.getTotalCount(req.session.userId);
    const upcomingEvents = await Event.getUpcomingCount(req.session.userId);
    const registeredEvents = await User.getRegisteredEvents(req.session.userId);
    const myEvents = await Event.findByCreator(req.session.userId);
    
    const stats = {
      totalEvents,
      upcomingEvents,
      totalRegistrations: registeredEvents.length,
      myEvents: myEvents.slice(0, 5) // Latest 5 events
    };
    
    res.render('dashboard', { stats });
  } catch (error) {
    console.error('Error loading dashboard:', error);
    req.flash('error', 'Error loading dashboard');
    res.redirect('/');
  }
});

// New Event Form
app.get('/events/new', isAuthenticated, (req, res) => {
  res.render('new');
});

// Create Event
app.post('/events', isAuthenticated, async (req, res) => {
  try {
    const { title, description, date, location, organizer, category, capacity } = req.body;
    
    if (!title || !description || !date || !location || !organizer || !category || !capacity) {
      req.flash('error', 'All fields are required');
      return res.redirect('/events/new');
    }

    if (capacity < 1) {
      req.flash('error', 'Capacity must be at least 1');
      return res.redirect('/events/new');
    }

    const eventData = {
      title,
      description,
      date,
      location,
      organizer,
      category,
      capacity: parseInt(capacity),
      creator_id: req.session.userId
    };

    await Event.create(eventData);

    req.flash('success', 'Event created successfully!');
    res.redirect('/');
  } catch (error) {
    console.error('Error creating event:', error);
    req.flash('error', 'Error creating event');
    res.redirect('/events/new');
  }
});

// View Single Event
app.get('/events/:id', isAuthenticated, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      req.flash('error', 'Event not found');
      return res.redirect('/');
    }

    const registeredUsers = await Event.getRegisteredUsers(req.params.id);
    const isRegistered = await User.isRegisteredForEvent(req.session.userId, req.params.id);
    const isCreator = event.creator_id === req.session.userId;
    
    res.render('show', { event, registeredUsers, isRegistered, isCreator });
  } catch (error) {
    console.error('Error fetching event:', error);
    req.flash('error', 'Error loading event details');
    res.redirect('/');
  }
});

// Edit Event Form
app.get('/events/:id/edit', isAuthenticated, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      req.flash('error', 'Event not found');
      return res.redirect('/');
    }

    // Check if user is the creator
    if (event.creator_id !== req.session.userId) {
      req.flash('error', 'You can only edit your own events');
      return res.redirect('/');
    }

    res.render('edit', { event });
  } catch (error) {
    console.error('Error fetching event:', error);
    req.flash('error', 'Error loading event');
    res.redirect('/');
  }
});

// Update Event
app.put('/events/:id', isAuthenticated, async (req, res) => {
  try {
    const { title, description, date, location, organizer, category, capacity } = req.body;
    
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      req.flash('error', 'Event not found');
      return res.redirect('/');
    }

    // Check if user is the creator
    if (event.creator_id !== req.session.userId) {
      req.flash('error', 'You can only edit your own events');
      return res.redirect('/');
    }

    if (!title || !description || !date || !location || !organizer || !category || !capacity) {
      req.flash('error', 'All fields are required');
      return res.redirect(`/events/${req.params.id}/edit`);
    }

    if (parseInt(capacity) < event.registrations) {
      req.flash('error', `Capacity cannot be less than current registrations (${event.registrations})`);
      return res.redirect(`/events/${req.params.id}/edit`);
    }

    const eventData = {
      title,
      description,
      date,
      location,
      organizer,
      category,
      capacity: parseInt(capacity)
    };

    await Event.update(req.params.id, eventData);

    req.flash('success', 'Event updated successfully!');
    res.redirect(`/events/${req.params.id}`);
  } catch (error) {
    console.error('Error updating event:', error);
    req.flash('error', 'Error updating event');
    res.redirect('/');
  }
});

// Delete Event
app.delete('/events/:id', isAuthenticated, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      req.flash('error', 'Event not found');
      return res.redirect('/');
    }

    // Check if user is the creator
    if (event.creator_id !== req.session.userId) {
      req.flash('error', 'You can only delete your own events');
      return res.redirect('/');
    }

    await Event.delete(req.params.id);
    req.flash('success', 'Event deleted successfully!');
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting event:', error);
    req.flash('error', 'Error deleting event');
    res.redirect('/');
  }
});

// Register for Event
app.post('/events/:id/register', isAuthenticated, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      req.flash('error', 'Event not found');
      return res.redirect('/');
    }

    // Check if already registered
    const isRegistered = await User.isRegisteredForEvent(req.session.userId, req.params.id);
    if (isRegistered) {
      req.flash('error', 'You are already registered for this event');
      return res.redirect(`/events/${req.params.id}`);
    }

    if (event.registrations >= event.capacity) {
      req.flash('error', 'Event is full');
      return res.redirect(`/events/${req.params.id}`);
    }

    await Event.registerUser(req.params.id, req.session.userId);

    req.flash('success', 'Successfully registered for the event!');
    res.redirect(`/events/${req.params.id}`);
  } catch (error) {
    console.error('Error registering for event:', error);
    
    // Check for duplicate entry error
    if (error.code === 'ER_DUP_ENTRY') {
      req.flash('error', 'You are already registered for this event');
    } else {
      req.flash('error', 'Error registering for event');
    }
    res.redirect(`/events/${req.params.id}`);
  }
});

// Unregister from Event
app.post('/events/:id/unregister', isAuthenticated, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      req.flash('error', 'Event not found');
      return res.redirect('/');
    }

    // Check if registered
    const isRegistered = await User.isRegisteredForEvent(req.session.userId, req.params.id);
    if (!isRegistered) {
      req.flash('error', 'You are not registered for this event');
      return res.redirect(`/events/${req.params.id}`);
    }

    await Event.unregisterUser(req.params.id, req.session.userId);

    req.flash('success', 'Successfully unregistered from the event');
    res.redirect(`/events/${req.params.id}`);
  } catch (error) {
    console.error('Error unregistering from event:', error);
    req.flash('error', 'Error unregistering from event');
    res.redirect(`/events/${req.params.id}`);
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).render('error', { message: 'Page not found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
