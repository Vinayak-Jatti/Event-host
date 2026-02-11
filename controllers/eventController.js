const Event = require('../models/Event');
const User = require('../models/User');

class EventController {
  // Display all events
  static async index(req, res) {
    try {
      const events = await Event.findAll();
      res.render('index', { events });
    } catch (error) {
      console.error('Error fetching events:', error);
      req.flash('error', 'Error loading events');
      res.redirect('/');
    }
  }

  // Show create event form
  static showCreateForm(req, res) {
    res.render('new');
  }

  // Create new event
  static async create(req, res) {
    try {
      const { title, description, date, location, organizer, category, capacity } = req.body;
      
      // Validation
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
  }

  // Show single event
  static async show(req, res) {
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
  }

  // Show edit form
  static async showEditForm(req, res) {
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
  }

  // Update event
  static async update(req, res) {
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

      // Validation
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
  }

  // Delete event
  static async delete(req, res) {
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
  }

  // Register for event
  static async register(req, res) {
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
  }

  // Unregister from event
  static async unregister(req, res) {
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
  }

  // Show user's created events
  static async myEvents(req, res) {
    try {
      const events = await Event.findByCreator(req.session.userId);
      res.render('my-events', { events });
    } catch (error) {
      console.error('Error fetching events:', error);
      req.flash('error', 'Error loading your events');
      res.redirect('/');
    }
  }

  // Show user's registered events
  static async myRegistrations(req, res) {
    try {
      const events = await User.getRegisteredEvents(req.session.userId);
      res.render('my-registrations', { events });
    } catch (error) {
      console.error('Error fetching registrations:', error);
      req.flash('error', 'Error loading your registrations');
      res.redirect('/');
    }
  }
}

module.exports = EventController;
