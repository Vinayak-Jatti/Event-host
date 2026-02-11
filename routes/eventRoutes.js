const express = require('express');
const router = express.Router();
const EventController = require('../controllers/eventController');
const { isAuthenticated } = require('../middleware/auth');

// All routes require authentication
router.use(isAuthenticated);

// Event CRUD routes
router.get('/', EventController.index);
router.get('/events/new', EventController.showCreateForm);
router.post('/events', EventController.create);
router.get('/events/:id', EventController.show);
router.get('/events/:id/edit', EventController.showEditForm);
router.put('/events/:id', EventController.update);
router.delete('/events/:id', EventController.delete);

// Event registration routes
router.post('/events/:id/register', EventController.register);
router.post('/events/:id/unregister', EventController.unregister);

// User-specific event routes
router.get('/my-events', EventController.myEvents);
router.get('/my-registrations', EventController.myRegistrations);

module.exports = router;
