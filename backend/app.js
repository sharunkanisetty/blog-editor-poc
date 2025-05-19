const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const authRoutes = require('./routes/auth');  // adjust path if needed
const blogRoutes = require('./routes/blogRoutes'); // adjust path if needed

// Enable CORS for your React app origin with credentials
app.use(cors({
  origin: 'http://localhost:3000',  // React app URL
  credentials: true,                 // <-- important for cookies
}));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

// Configure session middleware
app.use(session({
  secret: 'your-secret-key',       // replace with a strong secret in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,                 // set true if HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24   // 1 day, adjust as needed
  }
}));

// Mount your routes
app.use('/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
