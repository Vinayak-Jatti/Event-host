const Event = require('../models/Event');
const User = require('../models/User');

class DashboardController {
  // Show user dashboard
  static async index(req, res) {
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
  }
}

module.exports = DashboardController;
