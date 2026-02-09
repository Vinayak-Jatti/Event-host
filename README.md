# 🎉 Event Hosting Platform - MySQL Version

A professional event management application built with Node.js, Express.js, MySQL, and EJS templating. Features complete authentication, authorization, and a beautiful user interface.

## 🌟 KEY FEATURES

### Authentication & Security
- ✅ **User Registration** - Secure signup with email validation
- ✅ **User Login** - Session-based authentication
- ✅ **Password Hashing** - bcrypt encryption (10 salt rounds)
- ✅ **Session Management** - 24-hour auto-logout
- ✅ **Protected Routes** - Middleware-based access control
- ✅ **SQL Injection Prevention** - Parameterized queries

### Event Management
- ✅ **Create Events** - Full CRUD operations
- ✅ **Edit/Delete Events** - Creator-only authorization
- ✅ **Event Registration** - Track attendees
- ✅ **Capacity Management** - Automatic spot tracking
- ✅ **Category System** - 6 event categories
- ✅ **Event Ownership** - User-event relationships

### User Dashboard
- ✅ **Statistics** - Events created, upcoming, registrations
- ✅ **My Events** - View your created events
- ✅ **My Registrations** - Track events you're attending
- ✅ **Attendee List** - See who registered (creators only)

### Database Features
- ✅ **MySQL with Transactions** - ACID compliance
- ✅ **Foreign Keys** - Data integrity
- ✅ **Indexes** - Optimized queries
- ✅ **Junction Table** - Many-to-many relationships
- ✅ **Connection Pooling** - Better performance

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL2** - MySQL database driver
- **bcryptjs** - Password hashing
- **express-session** - Session management
- **connect-flash** - Flash messages

### Frontend
- **EJS** - Templating engine
- **Custom CSS** - Responsive design
- **Gradient UI** - Modern aesthetics

### Database
- **MySQL** - Relational database
- **Connection Pooling** - Performance optimization
- **Transactions** - Data consistency

## 📁 Project Structure

```
event-hosting/
├── config/
│   └── database.js        # MySQL connection & table initialization
├── models/
│   ├── User.js            # User model with SQL queries
│   └── Event.js           # Event model with SQL queries
├── middleware/
│   └── auth.js            # Authentication middleware
├── views/
│   ├── partials/
│   │   ├── navbar.ejs     # Navigation bar
│   │   └── flash.ejs      # Flash messages
│   ├── login.ejs          # Login page
│   ├── signup.ejs         # Signup page
│   ├── dashboard.ejs      # User dashboard
│   ├── my-events.ejs      # User's events
│   ├── my-registrations.ejs # User's registrations
│   ├── index.ejs          # All events
│   ├── new.ejs            # Create event
│   ├── show.ejs           # Event details
│   ├── edit.ejs           # Edit event
│   └── error.ejs          # Error page
├── public/
│   └── styles.css         # Complete styling
├── server.js              # Main application
├── database_setup.sql     # SQL setup script
├── package.json           # Dependencies
├── .env                   # Environment variables
└── README.md             # This file
```

## 🚀 Installation & Setup

### Prerequisites

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **MySQL Server** (v5.7 or higher) - [Download](https://dev.mysql.com/downloads/mysql/)

### Step-by-Step Installation

#### 1. Install MySQL

**Windows:**
- Download MySQL Installer
- Install MySQL Server
- Remember your root password

**Mac:**
```bash
brew install mysql
brew services start mysql
```

**Linux:**
```bash
sudo apt-get install mysql-server
sudo systemctl start mysql
```

#### 2. Create Database

**Method 1: Auto-creation (Recommended)**
The application automatically creates tables when it starts. Just make sure MySQL is running.

**Method 2: Manual setup**
```bash
mysql -u root -p
```
Then paste the contents of `database_setup.sql`

Or use the SQL file directly:
```bash
mysql -u root -p < database_setup.sql
```

#### 3. Install Node Dependencies

```bash
cd event-hosting
npm install
```

#### 4. Configure Environment

Edit `.env` file:
```env
PORT=3000

# MySQL Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=event_hosting_db
DB_PORT=3306
```

**Important:** Update `DB_PASSWORD` with your MySQL root password!

#### 5. Start Application

```bash
npm start
```

For development (auto-restart):
```bash
npm run dev
```

#### 6. Access Application

Open browser: **http://localhost:3000**

## 💻 Usage Guide

### First Time Setup

1. **Start MySQL Server**
   ```bash
   # Windows: Use MySQL Workbench or Services
   # Mac: brew services start mysql
   # Linux: sudo systemctl start mysql
   ```

2. **Launch Application**
   ```bash
   npm start
   ```

3. **Create Account**
   - Navigate to http://localhost:3000
   - Click "Sign up here"
   - Fill in your details
   - Password must be 6+ characters

4. **Start Using**
   - Login with your credentials
   - Create events
   - Register for events
   - View dashboard

### Creating Events

1. Click **"+ Create New Event"**
2. Fill in all required fields
3. Choose category
4. Set capacity
5. Submit

### Managing Events

- **Edit:** Only creators can edit
- **Delete:** Only creators can delete (with confirmation)
- **View Attendees:** Creators see registered users

### Event Registration

- **Register:** Click "Register for Event" on details page
- **Unregister:** Click "Unregister" if already registered
- **Check Status:** Green = open, Red = full

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Events Table
```sql
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  location VARCHAR(255) NOT NULL,
  organizer VARCHAR(255) NOT NULL,
  category ENUM(...) NOT NULL,
  capacity INT NOT NULL,
  registrations INT DEFAULT 0,
  creator_id INT NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (creator_id) REFERENCES users(id)
);
```

### Event Registrations Table
```sql
CREATE TABLE event_registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  event_id INT NOT NULL,
  registered_at TIMESTAMP,
  UNIQUE (user_id, event_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (event_id) REFERENCES events(id)
);
```

## 🔐 Security Features

### Password Security
- Bcrypt hashing (10 rounds)
- Salt generation per password
- Never store plain text passwords

### SQL Injection Prevention
- Parameterized queries
- Input validation
- mysql2 library protection

### Session Security
- HTTP-only cookies
- 24-hour expiration
- Secure session management

### Authorization
- Middleware-protected routes
- Owner-only edit/delete
- Registration validation

## 🎯 API Routes

### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/signup` | Signup page | Guest |
| POST | `/signup` | Create account | Guest |
| GET | `/login` | Login page | Guest |
| POST | `/login` | Authenticate | Guest |
| GET | `/logout` | Logout | Any |

### Events
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | All events | Auth |
| GET | `/dashboard` | Statistics | Auth |
| GET | `/my-events` | User's events | Auth |
| GET | `/my-registrations` | Registrations | Auth |
| GET | `/events/new` | Create form | Auth |
| POST | `/events` | Create event | Auth |
| GET | `/events/:id` | Event details | Auth |
| GET | `/events/:id/edit` | Edit form | Auth (Owner) |
| PUT | `/events/:id` | Update event | Auth (Owner) |
| DELETE | `/events/:id` | Delete event | Auth (Owner) |
| POST | `/events/:id/register` | Register | Auth |
| POST | `/events/:id/unregister` | Unregister | Auth |

## 📊 Database Queries

### Sample Queries

**Get all events with creators:**
```sql
SELECT e.*, u.name as creator_name 
FROM events e 
LEFT JOIN users u ON e.creator_id = u.id;
```

**Get user's registrations:**
```sql
SELECT e.* 
FROM events e
INNER JOIN event_registrations er ON e.id = er.event_id
WHERE er.user_id = ?;
```

**Get event attendees:**
```sql
SELECT u.id, u.name, u.email
FROM users u
INNER JOIN event_registrations er ON u.id = er.user_id
WHERE er.event_id = ?;
```

## 🎓 Perfect for College Submission

### Technical Complexity
- ✅ **MySQL Database** - Relational database with proper schema
- ✅ **Authentication System** - Complete signup/login flow
- ✅ **Authorization** - Role-based access control
- ✅ **Transactions** - ACID-compliant operations
- ✅ **Foreign Keys** - Data integrity
- ✅ **Indexes** - Query optimization
- ✅ **Connection Pooling** - Performance

### Code Quality
- ✅ **MVC Pattern** - Separated concerns
- ✅ **SQL Queries** - Parameterized & secure
- ✅ **Error Handling** - Try-catch blocks
- ✅ **Middleware** - Custom authentication
- ✅ **Clean Code** - Well-commented
- ✅ **RESTful Routes** - Best practices

### Features to Highlight
1. **MySQL Integration** - Shows SQL knowledge
2. **Password Hashing** - Security awareness
3. **Transactions** - Database integrity
4. **JOIN Queries** - Complex SQL
5. **Foreign Keys** - Relational design
6. **Session Management** - Stateful web apps
7. **Flash Messages** - User experience
8. **Responsive Design** - Modern UI/UX

## 🐛 Troubleshooting

### MySQL Connection Error
**Problem:** "ER_ACCESS_DENIED_ERROR"
**Solution:**
- Check username/password in `.env`
- Verify MySQL is running
- Create database manually if needed

### Database Not Found
**Problem:** "ER_BAD_DB_ERROR"
**Solution:**
```sql
CREATE DATABASE event_hosting_db;
```

### Tables Not Created
**Problem:** Tables missing
**Solution:**
- Check MySQL user permissions
- Run `database_setup.sql` manually
- Verify `config/database.js` runs

### Port Already in Use
**Problem:** Port 3000 taken
**Solution:**
- Change PORT in `.env`
- Or kill process: `lsof -ti:3000 | xargs kill`

### Session Not Working
**Problem:** Login doesn't persist
**Solution:**
- Clear browser cookies
- Check session secret
- Restart server

## 📝 Environment Variables

```env
PORT=3000

# MySQL Database Configuration
DB_HOST=localhost          # Database host
DB_USER=root              # MySQL username
DB_PASSWORD=              # Your MySQL password (IMPORTANT!)
DB_NAME=event_hosting_db  # Database name
DB_PORT=3306             # MySQL port (default 3306)
```

## 🌟 Why MySQL is Better for This Project

### Advantages Over MongoDB

1. **Structured Data** - Events have fixed schema
2. **Relationships** - Users ↔ Events with foreign keys
3. **ACID Compliance** - Transaction support
4. **Data Integrity** - Constraints & validation
5. **SQL Skills** - More marketable for jobs
6. **Joins** - Complex queries with JOIN
7. **Indexing** - Better query performance
8. **Industry Standard** - Used in most companies

### SQL vs NoSQL for Events

| Feature | MySQL | MongoDB |
|---------|-------|---------|
| Structure | Fixed schema | Flexible |
| Relationships | Foreign keys | Manual refs |
| Transactions | Full ACID | Limited |
| Querying | SQL (powerful) | JSON-based |
| Integrity | Built-in | Manual |
| Learning | SQL standard | Mongo-specific |

## 📚 Dependencies

```json
{
  "express": "^4.18.2",
  "mysql2": "^3.6.5",
  "ejs": "^3.1.9",
  "method-override": "^3.0.0",
  "dotenv": "^16.3.1",
  "bcryptjs": "^2.4.3",
  "express-session": "^1.17.3",
  "connect-flash": "^0.1.1"
}
```

## 🎉 Summary

This application demonstrates:
- ✅ Full-stack development (Node.js + MySQL + EJS)
- ✅ Database design with proper relationships
- ✅ Authentication & authorization
- ✅ SQL queries (SELECT, INSERT, UPDATE, DELETE, JOIN)
- ✅ Transactions for data consistency
- ✅ Security best practices
- ✅ Professional UI/UX
- ✅ Production-ready code

**Perfect for college submission with MySQL database!** 🚀

---

**Stack:** Node.js + Express.js + MySQL + EJS  
**Database:** MySQL with transactions & foreign keys  
**Authentication:** bcrypt password hashing  
**Level:** Advanced  
**Ready for:** College Submission 🎓
