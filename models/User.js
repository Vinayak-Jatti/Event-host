const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  // Create new user
  static async create(name, email, password) {
    try {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const [result] = await db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
      );

      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Find user by email
  static async findByEmail(email) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Find user by ID
  static async findById(id) {
    try {
      const [rows] = await db.query(
        'SELECT id, name, email, created_at FROM users WHERE id = ?',
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Compare password
  static async comparePassword(candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  // Get user's created events
  static async getCreatedEvents(userId) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM events WHERE creator_id = ? ORDER BY date ASC',
        [userId]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get user's registered events
  static async getRegisteredEvents(userId) {
    try {
      const [rows] = await db.query(`
        SELECT e.*, u.name as creator_name, u.email as creator_email
        FROM events e
        INNER JOIN event_registrations er ON e.id = er.event_id
        INNER JOIN users u ON e.creator_id = u.id
        WHERE er.user_id = ?
        ORDER BY e.date ASC
      `, [userId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Check if user is registered for an event
  static async isRegisteredForEvent(userId, eventId) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM event_registrations WHERE user_id = ? AND event_id = ?',
        [userId, eventId]
      );
      return rows.length > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
