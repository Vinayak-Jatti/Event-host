# 📐 MVC ARCHITECTURE DOCUMENTATION

## 🏗️ Project Structure Overview

```
event-hosting/
│
├── 📂 config/                   # Configuration files
│   └── database.js             # MySQL connection & initialization
│
├── 📂 controllers/              # Controller Layer (Business Logic)
│   ├── authController.js       # Authentication logic
│   ├── eventController.js      # Event CRUD logic
│   └── dashboardController.js  # Dashboard statistics logic
│
├── 📂 models/                   # Model Layer (Data Access)
│   ├── User.js                 # User model with SQL queries
│   └── Event.js                # Event model with SQL queries
│
├── 📂 routes/                   # Routes Layer (URL Routing)
│   ├── authRoutes.js           # Authentication routes
│   ├── eventRoutes.js          # Event management routes
│   └── dashboardRoutes.js      # Dashboard routes
│
├── 📂 middleware/               # Middleware (Authentication, etc.)
│   └── auth.js                 # Auth middleware (isAuthenticated, etc.)
│
├── 📂 views/                    # View Layer (Presentation)
│   ├── 📂 partials/            # Reusable view components
│   │   ├── navbar.ejs          # Navigation bar
│   │   └── flash.ejs           # Flash messages
│   ├── login.ejs               # Login page
│   ├── signup.ejs              # Signup page
│   ├── dashboard.ejs           # Dashboard view
│   ├── index.ejs               # All events view
│   ├── show.ejs                # Single event view
│   ├── new.ejs                 # Create event form
│   ├── edit.ejs                # Edit event form
│   ├── my-events.ejs           # User's events
│   ├── my-registrations.ejs    # User's registrations
│   └── error.ejs               # Error page
│
├── 📂 public/                   # Static Assets
│   └── styles.css              # CSS styling
│
├── server.js                    # Application Entry Point
├── database_setup.sql           # SQL setup script
├── package.json                 # Dependencies
├── .env                         # Environment variables
└── README.md                    # Documentation
```

## 🎯 MVC Pattern Explanation

### **M - MODEL** (Data Layer)
**Location:** `/models/`

**Purpose:** Handle all database operations and business logic related to data

**Files:**
- `User.js` - User data operations (CRUD, authentication)
- `Event.js` - Event data operations (CRUD, registrations)

**Example:**
```javascript
// models/User.js
class User {
  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }
}
```

**Responsibilities:**
- SQL queries
- Data validation
- Database transactions
- Business logic for data

---

### **V - VIEW** (Presentation Layer)
**Location:** `/views/`

**Purpose:** Display data to users (HTML templates)

**Files:**
- EJS templates for all pages
- Partials for reusable components

**Example:**
```html
<!-- views/index.ejs -->
<% events.forEach(event => { %>
  <div class="event-card">
    <h3><%= event.title %></h3>
  </div>
<% }) %>
```

**Responsibilities:**
- HTML rendering
- Display data from controllers
- User interface
- Form inputs

---

### **C - CONTROLLER** (Logic Layer)
**Location:** `/controllers/`

**Purpose:** Handle requests, process data, and send responses

**Files:**
- `authController.js` - Authentication logic
- `eventController.js` - Event management logic
- `dashboardController.js` - Dashboard logic

**Example:**
```javascript
// controllers/eventController.js
class EventController {
  static async index(req, res) {
    const events = await Event.findAll();  // Model
    res.render('index', { events });       // View
  }
}
```

**Responsibilities:**
- Handle HTTP requests
- Call model methods
- Process data
- Render views
- Error handling

---

## 🔄 Request Flow

```
1. User Request
   ↓
2. Routes (routes/*.js)
   ↓
3. Middleware (middleware/auth.js)
   ↓
4. Controller (controllers/*.js)
   ↓
5. Model (models/*.js)
   ↓
6. Database (MySQL)
   ↓
7. Model returns data
   ↓
8. Controller processes data
   ↓
9. View renders HTML (views/*.ejs)
   ↓
10. Response to User
```

## 📋 Detailed Component Breakdown

### 1. **CONFIG** (`/config/`)
- **database.js**: MySQL connection pool, table creation, initialization

### 2. **MODELS** (`/models/`)

**User.js**
```javascript
Methods:
- create(name, email, password)
- findByEmail(email)
- findById(id)
- comparePassword(candidatePassword, hashedPassword)
- getCreatedEvents(userId)
- getRegisteredEvents(userId)
- isRegisteredForEvent(userId, eventId)
```

**Event.js**
```javascript
Methods:
- create(eventData)
- findAll()
- findById(id)
- update(id, eventData)
- delete(id)
- registerUser(eventId, userId)
- unregisterUser(eventId, userId)
- getRegisteredUsers(eventId)
- findByCreator(creatorId)
- getUpcomingCount(creatorId)
- getTotalCount(creatorId)
```

### 3. **CONTROLLERS** (`/controllers/`)

**authController.js**
```javascript
Methods:
- showSignup(req, res)         # GET /signup
- signup(req, res)             # POST /signup
- showLogin(req, res)          # GET /login
- login(req, res)              # POST /login
- logout(req, res)             # GET /logout
```

**eventController.js**
```javascript
Methods:
- index(req, res)              # GET /
- showCreateForm(req, res)     # GET /events/new
- create(req, res)             # POST /events
- show(req, res)               # GET /events/:id
- showEditForm(req, res)       # GET /events/:id/edit
- update(req, res)             # PUT /events/:id
- delete(req, res)             # DELETE /events/:id
- register(req, res)           # POST /events/:id/register
- unregister(req, res)         # POST /events/:id/unregister
- myEvents(req, res)           # GET /my-events
- myRegistrations(req, res)    # GET /my-registrations
```

**dashboardController.js**
```javascript
Methods:
- index(req, res)              # GET /dashboard
```

### 4. **ROUTES** (`/routes/`)

**authRoutes.js**
- Handles all authentication-related routes
- Uses `isGuest` middleware

**eventRoutes.js**
- Handles all event-related routes
- Uses `isAuthenticated` middleware

**dashboardRoutes.js**
- Handles dashboard route
- Uses `isAuthenticated` middleware

### 5. **MIDDLEWARE** (`/middleware/`)

**auth.js**
```javascript
Functions:
- isAuthenticated    # Protect routes (must be logged in)
- isGuest            # Redirect if already logged in
- setUser            # Make user available in all views
```

### 6. **VIEWS** (`/views/`)

**Pages:**
- `login.ejs` - Login form
- `signup.ejs` - Registration form
- `index.ejs` - All events list
- `show.ejs` - Single event details
- `new.ejs` - Create event form
- `edit.ejs` - Edit event form
- `my-events.ejs` - User's created events
- `my-registrations.ejs` - User's registered events
- `dashboard.ejs` - Statistics dashboard
- `error.ejs` - Error page

**Partials:**
- `navbar.ejs` - Navigation bar (included in all pages)
- `flash.ejs` - Flash messages (included in all pages)

## 🛣️ Complete Route Map

### Authentication Routes
| Method | Path | Controller | Action | Middleware |
|--------|------|------------|--------|------------|
| GET | `/signup` | AuthController | showSignup | isGuest |
| POST | `/signup` | AuthController | signup | isGuest |
| GET | `/login` | AuthController | showLogin | isGuest |
| POST | `/login` | AuthController | login | isGuest |
| GET | `/logout` | AuthController | logout | - |

### Event Routes
| Method | Path | Controller | Action | Middleware |
|--------|------|------------|--------|------------|
| GET | `/` | EventController | index | isAuthenticated |
| GET | `/events/new` | EventController | showCreateForm | isAuthenticated |
| POST | `/events` | EventController | create | isAuthenticated |
| GET | `/events/:id` | EventController | show | isAuthenticated |
| GET | `/events/:id/edit` | EventController | showEditForm | isAuthenticated |
| PUT | `/events/:id` | EventController | update | isAuthenticated |
| DELETE | `/events/:id` | EventController | delete | isAuthenticated |
| POST | `/events/:id/register` | EventController | register | isAuthenticated |
| POST | `/events/:id/unregister` | EventController | unregister | isAuthenticated |
| GET | `/my-events` | EventController | myEvents | isAuthenticated |
| GET | `/my-registrations` | EventController | myRegistrations | isAuthenticated |

### Dashboard Routes
| Method | Path | Controller | Action | Middleware |
|--------|------|------------|--------|------------|
| GET | `/dashboard` | DashboardController | index | isAuthenticated |

## 🔍 Code Flow Examples

### Example 1: User Login Flow
```
1. User visits /login
   ↓
2. authRoutes.js → GET /login → isGuest middleware
   ↓
3. authController.showLogin()
   ↓
4. Renders views/login.ejs
   ↓
5. User submits form (POST /login)
   ↓
6. authRoutes.js → POST /login → isGuest middleware
   ↓
7. authController.login()
   ↓
8. User.findByEmail() [Model - Database query]
   ↓
9. User.comparePassword() [Model - Verify password]
   ↓
10. Create session, redirect to /
```

### Example 2: Create Event Flow
```
1. User clicks "Create Event"
   ↓
2. eventRoutes.js → GET /events/new → isAuthenticated middleware
   ↓
3. eventController.showCreateForm()
   ↓
4. Renders views/new.ejs
   ↓
5. User submits form (POST /events)
   ↓
6. eventRoutes.js → POST /events → isAuthenticated middleware
   ↓
7. eventController.create()
   ↓
8. Validate input
   ↓
9. Event.create(eventData) [Model - Insert into database]
   ↓
10. Flash success message, redirect to /
```

### Example 3: View All Events Flow
```
1. User visits homepage (/)
   ↓
2. eventRoutes.js → GET / → isAuthenticated middleware
   ↓
3. eventController.index()
   ↓
4. Event.findAll() [Model - SQL JOIN query]
   ↓
5. Returns events with creator info
   ↓
6. Pass events to view
   ↓
7. Renders views/index.ejs with events data
   ↓
8. User sees all events in grid layout
```

## ✨ Benefits of MVC Architecture

### 1. **Separation of Concerns**
- Models handle data
- Views handle display
- Controllers handle logic
- Each layer has one responsibility

### 2. **Maintainability**
- Easy to find and fix bugs
- Clear structure
- Each file has specific purpose

### 3. **Scalability**
- Easy to add new features
- Can modify one layer without affecting others
- Team can work on different layers simultaneously

### 4. **Testability**
- Can test each layer independently
- Models can be tested without views
- Controllers can be tested with mock models

### 5. **Reusability**
- Models can be reused in different controllers
- Views can be reused with different data
- Controllers can use multiple models

## 🎯 Key Principles

1. **Models** never render HTML
2. **Views** never access database directly
3. **Controllers** coordinate between models and views
4. **Routes** only define URL patterns and map to controllers
5. **Middleware** handles cross-cutting concerns (auth, logging)

## 📚 For Your College Presentation

**Highlight these points:**

1. **Clean Architecture** - MVC pattern with clear separation
2. **RESTful Routes** - Following REST conventions
3. **Middleware Pattern** - Authentication, session management
4. **Database Abstraction** - Models handle all SQL
5. **DRY Principle** - Don't Repeat Yourself (reusable code)
6. **Error Handling** - Centralized error management
7. **Security** - Middleware-based protection

This MVC structure demonstrates professional-level code organization!
