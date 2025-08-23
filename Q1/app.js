const express = require('express');
const path = require('path');
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif/;
    const ext = allowed.test(file.originalname.toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error('Only image files are allowed!'));
};

const upload = multer({ storage, fileFilter });

// Registration form
app.get('/register', (req, res) => {
    res.render('register', { errors: [], values: {} });
});

app.post(
    '/register',
    upload.fields([
        { name: 'profile_pic', maxCount: 1 },
        { name: 'other_pics', maxCount: 5 }
    ]),
    [
        body('username').notEmpty().withMessage('Username required'),
        body('email').isEmail().withMessage('Invalid email'),
        body('password').isLength({ min: 6 }).withMessage('Min 6 chars'),
        body('confirm_password')
            .custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match'),
        body('gender').notEmpty().withMessage('Please select gender'),
        body('hobbies').notEmpty().withMessage('Select at least one hobby')
    ],
    (req, res) => {
        const errors = validationResult(req);
        let errorList = errors.array();

        // Custom file validation
        if (!req.files || !req.files['profile_pic']) {
            errorList.push({ msg: 'Profile picture required', param: 'profile_pic' });
        }
        if (
            req.files &&
            req.files['profile_pic'] &&
            req.files['profile_pic'][0].size > 2 * 1024 * 1024
        ) {
            errorList.push({ msg: 'Profile pic must be <2MB', param: 'profile_pic' });
        }

        if (errorList.length > 0) {
            res.render('register', { errors: errorList, values: req.body });
        } else {
            // Valid - show table and download link
            const userData = {
                username: req.body.username,
                email: req.body.email,
                gender: req.body.gender,
                hobbies: Array.isArray(req.body.hobbies) ? req.body.hobbies : [req.body.hobbies],
                profile_pic: req.files['profile_pic'][0].filename,
                other_pics: req.files['other_pics'] ? req.files['other_pics'].map(f => f.filename) : []
            };
            res.render('display', { user: userData });
        }
    }
);

// Download route
app.get('/download/:filename', (req, res) => {
    const file = path.join(__dirname, 'uploads', req.params.filename);
    res.download(file);
});

app.listen(3000, () => console.log('Server running on port 3000'));
