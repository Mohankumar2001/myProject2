const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('hello');
});

router.get('/index', (req, res) => {
    console.log(req.isAuthenticated());
    res.render('index');
});

router.get('/login', (req, res) => {
    console.log('login');
    res.render('login.hbs');
});

router.get('/register', (req, res) => {
    console.log(req.isAuthenticated());
    console.log('register');
    res.render('register.hbs');
});

router.get('/dashboard', (req, res) => {
    console.log(req.isAuthenticated());
    console.log('dashboard');
    res.render('dashboard');
})

router.get('/logout', (req, res) => {
    console.log(req.isAuthenticated());
    console.log('dashboard');
    res.render('logout');
})

module.exports = router;