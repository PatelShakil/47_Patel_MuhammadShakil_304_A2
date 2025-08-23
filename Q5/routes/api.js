// routes/api.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
const Leave = require('../models/Leave');

const router = express.Router();

// Auth Middleware
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.employee = decoded.employee;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};

// @route   POST api/login
// @desc    Auth employee & get token
router.post('/login', async (req, res) => {
    const { empid, password } = req.body;
    try {
        let employee = await Employee.findOne({ empid });
                console.log(employee);
                console.log(empid);
                console.log(await Employee.find());
if (!employee) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }


        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            employee: {
                id: employee.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/profile
// @desc    Get employee profile
router.get('/profile', auth, async (req, res) => {
    try {
        const employee = await Employee.findById(req.employee.id).select('-password');
        res.json(employee);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/leave
// @desc    Apply for leave
router.post('/leave', auth, async (req, res) => {
    const { date, reason } = req.body;
    try {
        const newLeave = new Leave({
            employee: req.employee.id,
            date,
            reason
        });
        const leave = await newLeave.save();
        res.json(leave);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/leave
// @desc    Get employee leave history
router.get('/leave', auth, async (req, res) => {
    try {
        const leaves = await Leave.find({ employee: req.employee.id }).sort({ date: -1 });
        res.json(leaves);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
