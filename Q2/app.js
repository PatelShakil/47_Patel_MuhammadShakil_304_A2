const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const path = require('path');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Setup session with file store
app.use(session({
    store: new FileStore({
        path: './sessions', // Folder to store session files
        ttl: 3600 // Session lifetime in seconds (optional)
    }),
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Use authentication routes
app.use('/', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
