const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.register = (req, res) => {
    console.log(req.body);
    const { username, email, password, passwordConfirm} = req.body;
    console.log(username, password, email, passwordConfirm);
    db.query('SELECT * FROM user2 WHERE email = ?', [req.body.email], (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.render('register', { message: 'already there email'})
        }
        else {
            db.query('INSERT INTO user2 SET ?', {username: username, email: email, password: password}, (error, results) => {
                if(error) {
                    console.log(error);
                }
                else {
                    return res.render('register', { message: 'registered'})
                }
            } )
        }
    })

}

exports.login = (req, res) => {
    console.log(req.body);
}