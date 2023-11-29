const passport = require('passport');
const User = require('../models/user');

async function loginController(req, res) {
    try {
        res.render('login', {
            email: '',
            password: '',
            error:'',
        });
    } catch {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function postLogin(req, res){

    try {
        
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });
        
        req.login(user, function (err) {
            if (err) {
              console.log(err);
              res.render('login', {
                username: req.body.username,
                password: req.body.password,
                error : 'Incorrect username/password'
            });
            } else {
              passport.authenticate("local")(req, res, function () {
                res.redirect(`/userprofile?username=${user.username}`);
              });
            }
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
    
}


module.exports = {
    loginController,
    postLogin
};