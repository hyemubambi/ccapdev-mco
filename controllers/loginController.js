const User = require('../models/user');
const bcrypt = require('bcrypt');

async function loginController(req, res) {
    try {
        res.render('login', {
            username: '',
            password: '',
            error:'',
            loggedIn: false,
            user: null
        });
    } catch {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function postLogin(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    
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

        req.session.username = username;
        res.redirect(`/userprofile?username=${username}`, {
            loggedIn: true,
            user: user,
        });
    } catch {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}


module.exports = {
    loginController,
    postLogin
};