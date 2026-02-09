-- ================================================
-- EVENT HOSTING PLATFORM - MySQL Database Setup
-- ================================================

-- Create database
CREATE DATABASE IF NOT EXISTS event_hosting_db;
USE event_hosting_db;

-- ================================================
-- TABLE: users
-- Stores user account information
-- ================================================
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ================================================
-- TABLE: events
-- Stores event information
-- ================================================
CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  location VARCHAR(255) NOT NULL,
  organizer VARCHAR(255) NOT NULL,
  category ENUM('Conference', 'Workshop', 'Seminar', 'Cultural', 'Sports', 'Other') NOT NULL,
  capacity INT NOT NULL,
  registrations INT DEFAULT 0,
  creator_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_creator (creator_id),
  INDEX idx_date (date),
  INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ================================================
-- TABLE: event_registrations
-- Junction table for user-event registrations
-- ================================================
CREATE TABLE IF NOT EXISTS event_registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  event_id INT NOT NULL,
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_registration (user_id, event_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_event (event_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ================================================
-- SAMPLE DATA (Optional - for testing)
-- ================================================

-- Insert sample users (passwords are hashed for 'password123')
-- INSERT INTO users (name, email, password) VALUES
-- ('John Doe', 'john@example.com', '$2a$10$abcdefghijklmnopqrstuvwxyz1234567890'),
-- ('Jane Smith', 'jane@example.com', '$2a$10$abcdefghijklmnopqrstuvwxyz1234567890');

-- Note: Use the application's signup feature to create real users with properly hashed passwords

-- ================================================
-- USEFUL QUERIES
-- ================================================

-- View all users
-- SELECT id, name, email, created_at FROM users;

-- View all events with creator info
-- SELECT e.*, u.name as creator_name FROM events e LEFT JOIN users u ON e.creator_id = u.id;

-- View event registrations
-- SELECT 
--   e.title, 
--   u.name as user_name, 
--   er.registered_at 
-- FROM event_registrations er
-- JOIN events e ON er.event_id = e.id
-- JOIN users u ON er.user_id = u.id;

-- Count events per user
-- SELECT u.name, COUNT(e.id) as event_count 
-- FROM users u 
-- LEFT JOIN events e ON u.id = e.creator_id 
-- GROUP BY u.id;

-- Events with registration counts
-- SELECT 
--   e.title, 
--   e.capacity, 
--   e.registrations,
--   (e.capacity - e.registrations) as available_spots
-- FROM events e;
