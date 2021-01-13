const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router.post('/login', (req, res) => {
    res.render('login.hbs');
});

router.post('/register', authController.register);

module.exports = router;