const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');
const Handlebars = require('handlebars');
const bodyParser = require('body-parser');

// connections
const app = express();
app.set('view engine', 'hbs'); 
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public'))); 
dotenv.config({path: '.env'});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

db.connect( (error) => {
    if(error) {
        console.log(error);
    }
    else {
        console.log('database is connected');
    }
})

// parsers
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


// routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


app.listen(3456, () => {
    console.log('listening on port 3456')
});