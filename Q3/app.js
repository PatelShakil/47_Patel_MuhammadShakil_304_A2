require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const session = require('express-session');
const { RedisStore } = require('connect-redis'); // Destructure RedisStore like this
const { createClient } = require('redis');
const path = require('path');

const app = express();

// Create and connect Redis client
const redisClient = createClient();
redisClient.connect().catch(console.error);

// Use session middleware with Redis store and secret from .env
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.SESSION_SECRET, // use secret from .env
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 30 } // 30 mins
    })
);

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse URL encoded form data
app.use(express.urlencoded({ extended: true }));

// Simple user for demo
const user = { username: 'user1', password: 'pass123' };

// Middleware to protect routes
function isAuthenticated(req, res, next) {
    if (req.session.username) next();
    else res.redirect('/login');
}

// Routes

app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === user.username && password === user.password) {
        req.session.username = username;
        return res.redirect('/dashboard');
    }
    res.render('login', { error: 'Invalid username or password' });
});

app.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('dashboard', { username: req.session.username });
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send('Error logging out');
        res.redirect('/login');
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
