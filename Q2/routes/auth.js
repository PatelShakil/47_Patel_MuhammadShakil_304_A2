const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.get('/', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/dashboard', authController.getDashboard);
router.get('/logout', authController.logout);

module.exports = router;
