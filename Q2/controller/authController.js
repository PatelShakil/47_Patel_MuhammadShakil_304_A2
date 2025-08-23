const path = require('path');

exports.getLogin = (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
    } else {
        res.sendFile(path.join(__dirname, '../views/login.html'));
    }
};

exports.postLogin = (req, res) => {
    const { username, password } = req.body;

    // Simple hardcoded user validation for demo (replace with DB logic)
    if (username === 'admin' && password === '123') {
        req.session.loggedIn = true;
        req.session.username = username;
        res.redirect('/dashboard');
    } else {
        res.send('Invalid username or password. <a href="/">Try again</a>');
    }
};

exports.getDashboard = (req, res) => {
    if (req.session.loggedIn) {
        res.sendFile(path.join(__dirname, '../views/dashboard.html'));
    } else {
        res.redirect('/');
    }
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send('Error logging out');
        res.redirect('/');
    });
};
