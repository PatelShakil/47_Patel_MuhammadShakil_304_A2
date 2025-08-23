const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Employee = require('../models/Employee');
const nodemailer = require('nodemailer');

// Middleware to protect routes
function ensureAdmin(req, res, next) {
    if (req.session.isAdmin) {
        return next();
    }
    res.redirect('/admin/login');
}

// Admin login page
router.get('/login', (req, res) => {
    res.render('adminLogin', { error: null });
});

// Admin login POST
router.post('/login', async (req, res) => {
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH; // store bcrypt hash in .env

    const { username, password } = req.body;
    if (username === ADMIN_USERNAME) {
        const match = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
        if (match) {
            req.session.isAdmin = true;
            return res.redirect('/admin/employees');
        }
    }
    res.render('adminLogin', { error: 'Invalid credentials' });
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/admin/login');
    });
});

// List employees
router.get('/employees', ensureAdmin, async (req, res) => {
    const employees = await Employee.find();
    res.render('employeesList', { employees });
});

// New employee form
router.get('/employees/new', ensureAdmin, (req, res) => {
    res.render('employeeNew');
});

// Create new employee
router.post('/employees/new', ensureAdmin, async (req, res) => {
    try {
        const empid = 'EMP' + Date.now();
        const plainPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        const { name, email, baseSalary, hra = 0, deductions = 0 } = req.body;
        const employee = new Employee({
            empid, name, email,
            password: hashedPassword,
            baseSalary: Number(baseSalary),
            hra: Number(hra),
            deductions: Number(deductions)
        });

        employee.calculateSalary();
        await employee.save();

        // Send email
        await sendEmailToEmployee(email, empid, plainPassword);

        res.redirect('/admin/employees');
    } catch (err) {
        res.status(500).send('Error creating employee: ' + err.message);
    }
});

// Edit employee form
router.get('/employees/:id/edit', ensureAdmin, async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
        res.render('employeeEdit', { employee });
    } else {
        res.redirect('/admin/employees');
    }
});

// Update employee
router.post('/employees/:id/edit', ensureAdmin, async (req, res) => {
    const { name, email, baseSalary, hra = 0, deductions = 0 } = req.body;
    const employee = await Employee.findById(req.params.id);
    if (employee) {
        employee.name = name;
        employee.email = email;
        employee.baseSalary = Number(baseSalary);
        employee.hra = Number(hra);
        employee.deductions = Number(deductions);
        employee.calculateSalary();
        await employee.save();
    }
    res.redirect('/admin/employees');
});

// Delete employee
router.post('/employees/:id/delete', ensureAdmin, async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.redirect('/admin/employees');
});

async function sendEmailToEmployee(email, empid, password) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    },);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to Company - Your Employee Account Details',
        html: `<p>Hello,</p>
           <p>Your employee account has been created. Here are your login credentials:</p>
           <p>Employee ID: <b>${empid}</b></p>
           <p>Password: <b>${password}</b></p>
           <p>Please login and change your password at the earliest.</p>
           <p>Regards,<br/>Admin Team</p>`
    };

    await transporter.sendMail(mailOptions);
}

module.exports = router;
