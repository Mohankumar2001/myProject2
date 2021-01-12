const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');

// connections
const app = express();
app.set('view engine', 'hbs'); 
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



app.get('/', (req, res) => {
    res.send('hi');
});

app.get('/index', (req, res) => {
    res.render('index');
})

app.listen(3456, () => {
    console.log('listening on port 3456')
});