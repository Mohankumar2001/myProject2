const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('hello');
});

router.get('/index', (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    res.render('login.hbs');
});

router.get('/register', (req, res) => {
    res.render('register.hbs');
});

module.exports = router;