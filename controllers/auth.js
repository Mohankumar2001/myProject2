const db = require('../db');
const { check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const passport = require('passport');


exports.register = (req, res) => {
    console.log(req.body);
    
    // const error = req.validationErrors();
    // if(errors) {
        //     console.log('errors: ${JSON.stringify(errors)}')
        //     res.render('register', { message: 'reg error'});
        // }
//         check('username').isLength({ min: 3 });
//         const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//       console.log("error/./././");
//     return res.status(422).json({ errors: errors.array() })
//   }
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
    const {email, password } = req.body;
    console.log(email, password);
    // res.render('index');
    db.query('SELECT * FROM user2 WHERE email = ?', [email], async (errors, results) => {
        if(await results[0].password != password) {
            res.render('login', {
                message: 'wrong username or password'
            });

        }
        else {
            const id = results[0].id;
            
            const token = jwt.sign({id: id}, 'hello', {
                expiresIn: 900000
            });
            console.log(token)

            const cookieOptions = {
                expires: new Date(
                    Date.now() + 124524
                ),
                httpOnly: true
            }
            
            res.cookie('jwt', token, cookieOptions);
            req.login(id, function (err) {
                res.render('dashboard');
                
            })
            console.log(req.isAuthenticated());
        }
    });
    
passport.serializeUser(function(id, done) {
    done(null, id);
})

passport.deserializeUser(function(id, done) {
    done(null, id);
})
}


exports.logout = (req, res) => {
    req.logout();
    req.session.destroy();
    console.log('logout');
    res.render('login');
}