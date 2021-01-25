const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');
const Handlebars = require('handlebars');
const bodyParser = require('body-parser');
const {body, validationResult} = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const mySQLStore = require('express-mysql-session') (session);

// connections
const app = express();
app.set('view engine', 'hbs'); 
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public'))); 
dotenv.config({path: '.env'});

const db = require('./db.js');

// parsers
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
// app.use(validationResult);

const options = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
}

var sessionStore = new mySQLStore(options);

//session + passport integration
app.use(session({
    secret: 'my_secret',
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());


// routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


app.listen(3456, () => {
    console.log('listening on port 3456')
});