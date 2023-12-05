const User = require('../models/user');
const bcrypt = require('bcrypt');

async function registerController(req, res) {
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

        res.render('register', {
            username: '',
            password: '',
            email: '',
            error:'',
            loggedIn: false,
            user: null
        });
    } catch {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function postRegister(req, res){
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const fName = req.body.fName;
    const lName = req.body.lName;

    try {
        const invalidEmail = await User.findOne({email:email});
        const invalidUsername = await User.findOne({username:username});

        if (invalidEmail || invalidUsername) {
            return res.render('register', {
                username: '',
                password: '',
                email: '',
                error:'Invalid username or password',
                loggedIn: false,
                user: null
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    
        var newUser = new User({
            username: username,
            password: hashedPassword,
            email: email,
            fName: fName,
            lName: lName,
            uCondo: "",
            bio: "",
            pfp: "https://res.cloudinary.com/dzadlrvwt/image/upload/v1701759808/default-pfp_w4gylk.jpg",
            admin: false,
        });

        await newUser.save();
        console.log('New User: ', newUser);
        req.session.username = username;
        req.session.user = newUser;
        res.redirect(`/homepage`);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
    
}


module.exports = {
    registerController,
    postRegister
};