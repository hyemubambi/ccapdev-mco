const User = require('../models/user');
const bcrypt = require('bcrypt');

async function loginController(req, res) {
    try {
        let loggedIn = false;
        let user = null;

        if (req.session && req.session.user) {
            loggedIn = true;
            user = req.session.user;
            return res.render('homepage', {
                loggedIn,
                user
            });
        }

        res.render('login', {
            username: '',
            password: '',
            error:'',
            rememberMe:'',
            loggedIn: false,
            user: null
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function postLogin(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const rememberMe = req.body.rememberMe;
    
    try {
        const user = await User.findOne({ username: username });

        const validPassword = await bcrypt.compare(password, user.password);

        if (!user || !validPassword) {
            return res.render('login', {
                username: '',
                password: '',
                error:'Invalid username or password',
                loggedIn: false,
                user: null
            });
        }

        if (rememberMe) {
            req.session.cookie.maxAge = 1814400000;
        }

        req.session.user = user;
        res.redirect(`homepage`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}


module.exports = {
    loginController,
    postLogin
};