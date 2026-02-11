# 🎉 Event Hosting Platform - Professional MVC Architecture

A production-ready event management system built with **Clean MVC Architecture**, Node.js, Express.js, MySQL, and EJS. Features complete authentication, authorization, and follows industry best practices.

## 🏗️ Architecture Highlights

### **MVC Design Pattern**
✅ **Model** - Data access layer (MySQL queries)  
✅ **View** - Presentation layer (EJS templates)  
✅ **Controller** - Business logic layer  
✅ **Routes** - URL routing and middleware  
✅ **Config** - Database configuration  

### **Clean Code Structure**
```
📦 Project follows industry-standard MVC pattern
├── 📂 controllers/    # Business logic
├── 📂 models/        # Data access (SQL)
├── 📂 routes/        # URL routing
├── 📂 views/         # HTML templates
├── 📂 middleware/    # Authentication
├── 📂 config/        # Database setup
└── 📂 public/        # Static assets
```

## 🌟 Key Features

### Technical Excellence
- ✅ **MVC Architecture** - Professional code organization
- ✅ **RESTful API** - Standard HTTP methods (GET, POST, PUT, DELETE)
- ✅ **MySQL Database** - Relational database with foreign keys
- ✅ **Authentication** - bcrypt password hashing
- ✅ **Authorization** - Role-based access control
- ✅ **Transactions** - ACID-compliant database operations
- ✅ **Middleware** - Custom authentication & error handling
- ✅ **Session Management** - Secure cookie-based sessions

### Application Features
- ✅ **User Registration** - Secure signup with validation
- ✅ **User Login** - Session-based authentication
- ✅ **Event Management** - Full CRUD operations
- ✅ **Event Registration** - Users can register for events
- ✅ **Dashboard** - Real-time statistics
- ✅ **My Events** - View events you created
- ✅ **My Registrations** - View events you're attending
- ✅ **Attendee List** - Event creators see registered users
- ✅ **Flash Messages** - User feedback system
- ✅ **Responsive Design** - Mobile-friendly UI

## 📁 Project Structure (MVC)

```
event-hosting/
│
├── 📂 config/                      # Configuration Layer
│   └── database.js                # MySQL connection & initialization
│
├── 📂 controllers/                 # Controller Layer (Business Logic)
│   ├── authController.js          # Authentication logic
│   ├── eventController.js         # Event CRUD logic
│   └── dashboardController.js     # Dashboard statistics
│
├── 📂 models/                      # Model Layer (Data Access)
│   ├── User.js                    # User model (SQL queries)
│   └── Event.js                   # Event model (SQL queries)
│
├── 📂 routes/                      # Routes Layer (URL Mapping)
│   ├── authRoutes.js              # /signup, /login, /logout
│   ├── eventRoutes.js             # /events/* routes
│   └── dashboardRoutes.js         # /dashboard route
│
├── 📂 middleware/                  # Middleware Layer
│   └── auth.js                    # isAuthenticated, isGuest, setUser
│
├── 📂 views/                       # View Layer (Presentation)
│   ├── 📂 partials/               # Reusable components
│   │   ├── navbar.ejs             # Navigation bar
│   │   └── flash.ejs              # Flash messages
│   ├── login.ejs                  # Login page
│   ├── signup.ejs                 # Signup page
│   ├── dashboard.ejs              # Dashboard with stats
│   ├── index.ejs                  # All events page
│   ├── show.ejs                   # Single event page
│   ├── new.ejs                    # Create event form
│   ├── edit.ejs                   # Edit event form
│   ├── my-events.ejs              # User's created events
│   ├── my-registrations.ejs       # User's registered events
│   └── error.ejs                  # Error page
│
├── 📂 public/                      # Static Assets
│   └── styles.css                 # CSS styling
│
├── server.js                       # Application entry point
├── database_setup.sql              # SQL schema
├── MVC_ARCHITECTURE.md             # Architecture documentation
├── package.json                    # Dependencies
├── .env                           # Environment variables
└── README.md                      # This file
```

## 🚀 Installation & Setup

### Prerequisites
1. **Node.js** (v14+) - [Download](https://nodejs.org/)
2. **MySQL Server** (v5.7+) - [Download](https://dev.mysql.com/downloads/mysql/)

### Installation Steps

**1. Install MySQL**
```bash
# Mac
brew install mysql
brew services start mysql

# Linux
sudo apt-get install mysql-server
sudo systemctl start mysql

# Windows: Download MySQL Installer
```

**2. Clone/Extract Project**
```bash
cd event-hosting
```

**3. Install Dependencies**
```bash
npm install
```

**4. Configure Environment**
Edit `.env` file:
```env
PORT=3000

# MySQL Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password    # ← SET YOUR PASSWORD
DB_NAME=event_hosting_db
DB_PORT=3306

# Session Configuration
SESSION_SECRET=your-secret-key-change-in-production
```

**5. Start Application**
```bash
npm start
```

**6. Access Application**
```
http://localhost:3000
```

The application automatically creates database and tables on first run!

## 🗄️ Database Schema

### Tables

**users**
```sql
- id (Primary Key)
- name
- email (Unique)
- password (Hashed)
- created_at, updated_at
```

**events**
```sql
- id (Primary Key)
- title, description, date, location
- organizer, category, capacity
- registrations
- creator_id (Foreign Key → users.id)
- created_at, updated_at
```

**event_registrations**
```sql
- id (Primary Key)
- user_id (Foreign Key → users.id)
- event_id (Foreign Key → events.id)
- registered_at
- Unique: (user_id, event_id)
```

## 🎯 MVC Flow Explanation

### Request Flow
```
1. User Request (e.g., GET /events/123)
   ↓
2. Routes (eventRoutes.js) → Maps URL to controller
   ↓
3. Middleware (auth.js) → Checks authentication
   ↓
4. Controller (eventController.js) → Handles request
   ↓
5. Model (Event.js) → Executes SQL query
   ↓
6. Database (MySQL) → Returns data
   ↓
7. Controller → Processes data
   ↓
8. View (show.ejs) → Renders HTML
   ↓
9. Response → Sent to user
```

### Example: Creating an Event
```javascript
// Route: routes/eventRoutes.js
router.post('/events', EventController.create);

// Controller: controllers/eventController.js
static async create(req, res) {
  const eventData = { ...req.body, creator_id: req.session.userId };
  await Event.create(eventData);  // Call model
  res.redirect('/');
}

// Model: models/Event.js
static async create(eventData) {
  const [result] = await db.query(
    'INSERT INTO events (...) VALUES (...)',
    [eventData.title, ...]
  );
  return result.insertId;
}
```

## 🛣️ API Routes

### Authentication Routes
| Method | Path | Controller | Description |
|--------|------|------------|-------------|
| GET | `/signup` | AuthController.showSignup | Signup page |
| POST | `/signup` | AuthController.signup | Create account |
| GET | `/login` | AuthController.showLogin | Login page |
| POST | `/login` | AuthController.login | Authenticate |
| GET | `/logout` | AuthController.logout | End session |

### Event Routes
| Method | Path | Controller | Description |
|--------|------|------------|-------------|
| GET | `/` | EventController.index | All events |
| GET | `/events/new` | EventController.showCreateForm | Create form |
| POST | `/events` | EventController.create | Create event |
| GET | `/events/:id` | EventController.show | Event details |
| GET | `/events/:id/edit` | EventController.showEditForm | Edit form |
| PUT | `/events/:id` | EventController.update | Update event |
| DELETE | `/events/:id` | EventController.delete | Delete event |
| POST | `/events/:id/register` | EventController.register | Register |
| POST | `/events/:id/unregister` | EventController.unregister | Unregister |
| GET | `/my-events` | EventController.myEvents | User's events |
| GET | `/my-registrations` | EventController.myRegistrations | Registrations |

### Dashboard Routes
| Method | Path | Controller | Description |
|--------|------|------------|-------------|
| GET | `/dashboard` | DashboardController.index | Statistics |

## 🔐 Security Features

### Authentication & Authorization
- ✅ **bcrypt Hashing** - 10 salt rounds for password encryption
- ✅ **Session Management** - HTTP-only cookies, 24-hour expiry
- ✅ **Protected Routes** - Middleware-based authentication
- ✅ **Authorization** - Owner-only edit/delete permissions
- ✅ **SQL Injection Prevention** - Parameterized queries
- ✅ **Input Validation** - Server-side validation

### Middleware
```javascript
// middleware/auth.js
isAuthenticated    // Protects routes (must be logged in)
isGuest           // Redirects if already logged in
setUser           // Makes user available in all views
```

## 🎓 Perfect for College Submission

### Why This Architecture Impresses

**1. MVC Design Pattern**
- Industry-standard architecture
- Separation of concerns
- Clean, maintainable code
- Professional organization

**2. Clean Code Principles**
- DRY (Don't Repeat Yourself)
- Single Responsibility Principle
- Modular structure
- Easy to test and maintain

**3. Database Design**
- Proper relationships (foreign keys)
- Many-to-many relationships (junction table)
- Transactions for data consistency
- Indexes for performance

**4. RESTful API**
- Standard HTTP methods
- Logical URL structure
- Proper status codes
- Following REST conventions

**5. Security Best Practices**
- Password hashing
- Session management
- Authorization checks
- SQL injection prevention

## 💻 Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL2** - MySQL driver with promises
- **bcryptjs** - Password hashing
- **express-session** - Session management
- **connect-flash** - Flash messages
- **method-override** - PUT/DELETE support
- **dotenv** - Environment variables

### Frontend
- **EJS** - Templating engine
- **CSS3** - Custom styling
- **Responsive Design** - Mobile-friendly

### Database
- **MySQL** - Relational database
- **Foreign Keys** - Data integrity
- **Transactions** - ACID compliance
- **Connection Pooling** - Performance

## 📊 SQL Queries Examples

### JOIN Query (Events with Creators)
```sql
SELECT e.*, u.name as creator_name, u.email as creator_email
FROM events e
LEFT JOIN users u ON e.creator_id = u.id
ORDER BY e.date ASC;
```

### Many-to-Many Query (User's Registered Events)
```sql
SELECT e.*
FROM events e
INNER JOIN event_registrations er ON e.id = er.event_id
WHERE er.user_id = ?;
```

### Transaction (Registration)
```sql
START TRANSACTION;
INSERT INTO event_registrations (user_id, event_id) VALUES (?, ?);
UPDATE events SET registrations = registrations + 1 WHERE id = ?;
COMMIT;
```

## 🐛 Troubleshooting

### MySQL Connection Error
```bash
# Check MySQL is running
mysql -u root -p

# Verify credentials in .env
DB_PASSWORD=your_actual_password
```

### Database Not Found
```bash
# Create database manually
mysql -u root -p
CREATE DATABASE event_hosting_db;
```

### Port Already in Use
```bash
# Change PORT in .env or kill process
lsof -ti:3000 | xargs kill
```

## 📚 Documentation

- **MVC_ARCHITECTURE.md** - Detailed architecture documentation
- **database_setup.sql** - SQL schema and setup
- **README.md** - This file

## 🌟 Key Advantages of MVC

### 1. Maintainability
- Easy to locate and fix bugs
- Clear file organization
- Each component has single responsibility

### 2. Scalability
- Easy to add new features
- Can scale different layers independently
- Team can work on different parts simultaneously

### 3. Testability
- Each layer can be tested independently
- Mock models for controller testing
- Unit tests for models

### 4. Reusability
- Controllers can use multiple models
- Models can be reused across controllers
- Views can be rendered with different data

### 5. Professional Standards
- Industry-standard pattern
- Used by major frameworks (Laravel, Django, Rails)
- Demonstrates advanced knowledge

## 🎯 For Your Presentation

**Highlight These Points:**

1. **MVC Architecture** - "We implemented clean MVC pattern with separation of concerns"

2. **Controllers** - "Business logic is separated into controller classes"

3. **Models** - "All database operations are encapsulated in model classes"

4. **Routes** - "RESTful routing with proper middleware integration"

5. **MySQL** - "Using relational database with foreign keys and transactions"

6. **Security** - "bcrypt password hashing and session-based authentication"

7. **Code Quality** - "Following DRY principle and single responsibility"

## ✨ Summary

This project demonstrates:
- ✅ **Clean MVC Architecture**
- ✅ **MySQL Database** with relationships
- ✅ **RESTful API** design
- ✅ **Authentication** & Authorization
- ✅ **SQL Queries** (SELECT, INSERT, UPDATE, DELETE, JOIN)
- ✅ **Transactions** & Foreign Keys
- ✅ **Security** best practices
- ✅ **Professional** code organization
- ✅ **Production-ready** quality

**Perfect for college submission! Demonstrates advanced full-stack development skills.** 🚀

---

**Stack:** Node.js + Express.js + MySQL + EJS  
**Architecture:** MVC (Model-View-Controller)  
**Database:** MySQL with Foreign Keys & Transactions  
**Level:** Advanced  
**Status:** Production-Ready 🎓
