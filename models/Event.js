const db = require('../config/database');

class Event {
  // Create new event
  static async create(eventData) {
    try {
      const { title, description, date, location, organizer, category, capacity, creator_id } = eventData;
      
      const [result] = await db.query(
        'INSERT INTO events (title, description, date, location, organizer, category, capacity, creator_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [title, description, date, location, organizer, category, capacity, creator_id]
      );

      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Get all events with creator info
  static async findAll() {
    try {
      const [rows] = await db.query(`
        SELECT e.*, u.name as creator_name, u.email as creator_email
        FROM events e
        LEFT JOIN users u ON e.creator_id = u.id
        ORDER BY e.date ASC
      `);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Find event by ID with creator info
  static async findById(id) {
    try {
      const [rows] = await db.query(`
        SELECT e.*, u.name as creator_name, u.email as creator_email
        FROM events e
        LEFT JOIN users u ON e.creator_id = u.id
        WHERE e.id = ?
      `, [id]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Update event
  static async update(id, eventData) {
    try {
      const { title, description, date, location, organizer, category, capacity } = eventData;
      
      const [result] = await db.query(
        'UPDATE events SET title = ?, description = ?, date = ?, location = ?, organizer = ?, category = ?, capacity = ? WHERE id = ?',
        [title, description, date, location, organizer, category, capacity, id]
      );

      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Delete event
  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM events WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Register user for event
  static async registerUser(eventId, userId) {
    try {
      // Start transaction
      const connection = await db.getConnection();
      await connection.beginTransaction();

      try {
        // Insert registration
        await connection.query(
          'INSERT INTO event_registrations (user_id, event_id) VALUES (?, ?)',
          [userId, eventId]
        );

        // Increment registrations count
        await connection.query(
          'UPDATE events SET registrations = registrations + 1 WHERE id = ?',
          [eventId]
        );

        await connection.commit();
        connection.release();
        return true;
      } catch (error) {
        await connection.rollback();
        connection.release();
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  // Unregister user from event
  static async unregisterUser(eventId, userId) {
    try {
      // Start transaction
      const connection = await db.getConnection();
      await connection.beginTransaction();

      try {
        // Delete registration
        await connection.query(
          'DELETE FROM event_registrations WHERE user_id = ? AND event_id = ?',
          [userId, eventId]
        );

        // Decrement registrations count
        await connection.query(
          'UPDATE events SET registrations = registrations - 1 WHERE id = ?',
          [eventId]
        );

        await connection.commit();
        connection.release();
        return true;
      } catch (error) {
        await connection.rollback();
        connection.release();
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  // Get registered users for an event
  static async getRegisteredUsers(eventId) {
    try {
      const [rows] = await db.query(`
        SELECT u.id, u.name, u.email
        FROM users u
        INNER JOIN event_registrations er ON u.id = er.user_id
        WHERE er.event_id = ?
        ORDER BY er.registered_at DESC
      `, [eventId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get events by creator
  static async findByCreator(creatorId) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM events WHERE creator_id = ? ORDER BY date ASC',
        [creatorId]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get upcoming events count for creator
  static async getUpcomingCount(creatorId) {
    try {
      const [rows] = await db.query(
        'SELECT COUNT(*) as count FROM events WHERE creator_id = ? AND date >= CURDATE()',
        [creatorId]
      );
      return rows[0].count;
    } catch (error) {
      throw error;
    }
  }

  // Get total events count for creator
  static async getTotalCount(creatorId) {
    try {
      const [rows] = await db.query(
        'SELECT COUNT(*) as count FROM events WHERE creator_id = ?',
        [creatorId]
      );
      return rows[0].count;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Event;
